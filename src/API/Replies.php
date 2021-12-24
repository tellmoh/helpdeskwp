<?php
/**
 * @since   1.0.0
 *
 * @package HelpDeskWP
 */

namespace HelpDeskWP\API;

defined( 'ABSPATH' ) || exit;

/**
 * Class Replies API
 */
class Replies extends Tickets {

    protected $namespace = 'helpdesk';
    protected $base      = 'replies';
    protected $version   = 'v1';

    public function register_routes() {
        register_rest_route(
            $this->namespace . '/' . $this->version, '/' . $this->base, array(
            array(
                'methods'             => \WP_REST_Server::READABLE,
                'callback'            => array( $this, 'get_replies' ),
                'permission_callback' => array( $this, 'get_replies_permissions_check' ),
                'args'                => array(),
            ),
        ));

        register_rest_route(
            $this->namespace . '/' . $this->version, '/' . $this->base, array(
            array(
                'methods'             => \WP_REST_Server::CREATABLE,
                'callback'            => array( $this, 'create_replies' ),
                'permission_callback' => array( $this, 'create_replies_permissions_check' ),
                'args'                => array(),
            ),
        ));

        register_rest_route(
            $this->namespace . '/' . $this->version, '/' . $this->base . '/(?P<id>[\d]+)', array(
            array(
                'methods'             => \WP_REST_Server::DELETABLE,
                'callback'            => array( $this, 'delete_replies' ),
                'permission_callback' => array( $this, 'delete_replies_permissions_check' ),
                'args'                => array(),
            ),
        ));
    }

    public function create_replies( $request ) {
        $params = $request->get_params();
        $files  = $request->get_file_params();

        if ( ! is_array( $params ) ) {
            return array();
        }

        $image  = $this->save_image( $files );
        $ticket = $this->add_reply( $params['reply'], $params['parent'], $image->data );

        if ( $ticket ) {
            $this->send_email( $params['parent'] );
        }

        $res = array(
            'ticket' => $ticket,
            'media'  => $image,
        );

        if ( $ticket->data ) {
            return new \WP_REST_Response( $res, 201 );
        }

        return new \WP_Error( 'cant-create-reply', __( 'Can\'t create the reply', 'helpdeskwp' ), array( 'status' => 500 ) );
    }

    public function delete_replies( $request ) {
        $reply_id = $request->get_param( 'id' );

        $result = wp_trash_post( $reply_id );

        if ( $result ) {
            return new \WP_REST_Response( __( 'The reply has been deleted', 'helpdeskwp' ), 200 );
        }

        return new \WP_Error( 'cant-delete-reply', __( 'Can\'t delete the reply', 'helpdeskwp' ), array( 'status' => 500 ) );
    }

    public function get_replies( $request ) {
        $params = $request->get_params();

        if ( ! is_array( $params ) ) {
            return array();
        }

        $query_result = $this->prepare_items_query( $params['parent'] );
        $replies = $this->prepare_item_for_response( $query_result );

        $response = rest_ensure_response( $replies );

        return $response;
    }

    public function send_email( string $ticket ) {
        $user_id   = get_post_field( 'post_author', $ticket );
        $user      = get_userdata( $user_id );
        $name      = $user->display_name;
        $email     = $user->user_email;
        $site_name = get_bloginfo( 'name' );
        $message   = __( 'You have received a new reply.', 'helpdeskwp' );
        $headers   = 'From: ' . $site_name . '';
        $title     = get_the_title( $ticket );
        $subject   = $title ? $title : '';

		wp_mail( $email, $subject, $message, $headers );
    }

    public function prepare_item_for_response( $query = array() ) {
        $replies = array();

        foreach ( $query as $post ) {
            $reply = array();

            $reply['id'] = $post->ID;
            $reply['date'] = $post->post_date;
            $reply['reply'] = $post->post_content;
            $reply['author'] = $this->prepare_author_for_response( $post->post_author );
            $reply['images'] = $this->get_image_link( $post->ID );

			$replies[] = $reply;
		}

        return $replies;
    }

    public function get_image_link( string $post_id ) {
        $images     = get_post_meta( $post_id, 'reply_images', '' );
        $thumbnails = array();

        if ( isset( $images[0]['msg'] ) && 'empty-image' == $images[0]['msg'] ) {
            return '';
        }

        if ( $images[0] ) {
            foreach ( $images[0] as $image ) {
                $thumbnails[] = wp_get_attachment_image_src( $image, 'thumbnail' )[0];
            }
        }

        if ( $thumbnails ) {
            return $thumbnails;
        }
    }

    public function prepare_items_query( $post_id = '' ) {
        $query_args = array(
            'post_type'  => 'reply',
            'post_parent' => $post_id,
            'post_status' => 'publish',
            'posts_per_page' => -1
        );

        $posts_query  = new \WP_Query();
		$query_result = $posts_query->query( $query_args );

        return $query_result;
    }

    public function prepare_author_for_response( $author ) {
        $user = get_user_by( 'id', $author );

        if ( $user ) {
            return $user->display_name;
        }

        return '';
    }

    public function get_replies_permissions_check() {
        return current_user_can( 'edit_posts' );
    }

    public function create_replies_permissions_check() {
        return current_user_can( 'edit_posts' );
    }

    public function delete_replies_permissions_check() {
        return current_user_can( 'edit_posts' );
    }
}

function Replies_API() {
    $replies = new Replies;
    $register_routes = $replies->register_routes();
}
add_action( 'rest_api_init', 'HelpDeskWP\API\Replies_API' );
