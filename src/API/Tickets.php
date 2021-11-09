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

    protected $namespace = 'helpdesk';
    protected $base      = 'tickets';
    protected $version   = 'v1';

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

        $ticket = $this->add_ticket( $params['title'], $params['type'], $params['category'] );
        $image  = $this->save_image( $files, $ticket->data );
        $reply  = $this->add_reply( $params['description'], $ticket->data, $image->data );

        $res = array(
            'ticket'  => $ticket,
            'media'   => $image,
            'reply' => $reply
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

    public function add_reply( string $reply, string $ticket_id, string $images ) {
        $current_user = get_current_user_id();

        $reply_id = wp_insert_post(
            array(
                'post_title'   => $ticket_id,
                'post_content' => $reply,
                'post_type'    => 'reply',
                'post_status'  => 'publish',
                'post_parent'  => $ticket_id,
                'post_author'  => $current_user,
                'meta_input'   => array(
                    'reply_images' => $images,
                ),
            )
        );

        if ( ! is_wp_error( $reply_id ) ) {
            return new \WP_REST_Response( $reply_id, 201 );
        }

        return new \WP_Error( 'cant-add-reply', __( 'Can\'t add the reply', 'helpdesk' ), array( 'status' => 500 ) );
    }

    public function save_image( array $image, string $ticket_id ) {
        $file     = file_get_contents( $image['media']['tmp_name'] );
        $filetype = wp_check_filetype( $image['media']['name'], '' );
        $upload   = wp_upload_bits( $image['media']['name'], '', $file );

        if ( ! $upload['error'] ) {
            $attachment_id = wp_insert_attachment(
                array(
                    'guid'           => $upload['url'],
                    'post_mime_type' => $filetype['type'],
                ),
                $upload['file'],
                $ticket_id
            );

            if ( ! is_wp_error( $attachment_id ) ) {
                return new \WP_REST_Response( $attachment_id, 201 );
            }
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
