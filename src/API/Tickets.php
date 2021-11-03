<?php
/**
 * @since   1.0.0
 *
 * @package Helpdesk
 */

namespace Helpdesk\API;

defined( 'ABSPATH' ) || exit;

/**
 * Class Tickets API
 */
class Tickets {

    private $namespace = 'helpdesk';
    private $base      = 'tickets';
    private $version   = 'v1';

    public function register_routes() {
        register_rest_route(
            $this->namespace . '/' . $this->version, '/' . $this->base, array(
            array(
                'methods'             => \WP_REST_Server::CREATABLE,
                'callback'            => array( $this, 'create_ticket' ),
                'permission_callback' => array( $this, 'create_ticket_permissions_check' ),
                'args'                => array(),
            ),
        ));
    }

    public function create_ticket( $request ) {
        $params = $request->get_params();
        $files  = $request->get_file_params();

        if ( ! is_array( $params ) ) {
            return array();
        }

        $ticket  = $this->add_ticket( $params['title'], $params['type'], $params['category'] );
        $image   = $this->save_image( $files, $ticket->data );
        $comment = $this->add_comment( $params['description'], $ticket->data, $image->data );

        $res = array(
            'ticket'  => $ticket,
            'media'   => $image,
            'comment' => $comment
        );

        if ( $ticket->data ) {
            return new \WP_REST_Response( $res, 201 );
        }

        return new \WP_Error( 'cant-create-ticket', __( 'Can\'t create a ticket', 'helpdesk' ), array( 'status' => 500 ) );
    }

    public function add_ticket( string $title, string $type, string $category ) {
        $current_user = get_current_user_id();

        $ticket_id = wp_insert_post(
            array(
                'post_title'  => $title,
                'post_type'   => 'ticket',
                'post_status' => 'publish',
                'post_author' => $current_user
            )
        );

        if ( ! is_wp_error( $ticket_id ) ) {
            wp_set_object_terms( $ticket_id, $type, 'ticket_type' );
            wp_set_object_terms( $ticket_id, $category, 'ticket_category' );

            return new \WP_REST_Response( $ticket_id, 201 );
        }

        return new \WP_Error( 'cant-add-ticket', __( 'Can\'t add a new ticket', 'helpdesk' ), array( 'status' => 500 ) );
    }

    public function add_comment( string $comment, string $post_id, string $image ) {
        $current_user = wp_get_current_user();

        $data = array(
            'comment_post_ID'      => $post_id,
            'comment_content'      => $comment,
            'user_id'              => $current_user->ID,
            'comment_author'       => $current_user->user_login,
            'comment_author_email' => $current_user->user_email,
            'comment_author_url'   => $current_user->user_url,
            'comment_meta'         => array(
                'media' => $image,
            ),
        );

        $comment = wp_insert_comment( $data );

        if ( ! is_wp_error( $comment ) ) {
            return new \WP_REST_Response( $comment, 201 );
        }

        return new \WP_Error( 'cant-add-comment', __( 'Can\'t add the comment', 'helpdesk' ), array( 'status' => 500 ) );
    }

    public function save_image( array $image, string $ticket_id ) {
        $file     = file_get_contents( $image['media']['tmp_name'] );
        $filetype = wp_check_filetype( $image['media']['name'], '' );
        $upload   = wp_upload_bits( $image['media']['name'], '', $file );

        $attachment = wp_insert_attachment(
            array(
                'guid'           => $upload['url'],
                'post_mime_type' => $filetype['type'],
            ),
            $upload['file'],
            $ticket_id
        );

        if ( ! is_wp_error( $attachment ) ) {
            return new \WP_REST_Response( $attachment, 201 );
        }

        return new \WP_Error( 'cant-save-image', __( 'Can\'t save the image', 'helpdesk' ), array( 'status' => 500 ) );
    }

    public function create_ticket_permissions_check() {
        return current_user_can( 'edit_posts' );
    }
}

function Tickets_API() {
    $tickets = new Tickets;
    $register_routes = $tickets->register_routes();
}
add_action( 'rest_api_init', 'Helpdesk\API\Tickets_API' );
