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
        $params = $request->get_json_params();

        if ( ! is_array( $params ) ) {
            return array();
        }

        $ticket_id = $this->add_ticket( $params['title'], $params['type'], $params['category'] );

        if ( $ticket_id ) {
            return new \WP_REST_Response( $ticket_id, 201 );
        }

        return new \WP_Error( 'cant-create-ticket', __( 'Can\'t create a ticket', 'helpdesk' ), array( 'status' => 500 ) );
    }

    public function create_ticket_permissions_check() {
        return current_user_can( 'edit_posts' );
    }

    public function add_ticket( string $title, string $type, string $category ) {
        $ticket_id = wp_insert_post(
            array(
                'post_title'  => $title,
                'post_type'   => 'ticket',
                'post_status' => 'publish',
                'post_author' => 1
            )
        );

        wp_set_object_terms( $ticket_id, $type, 'ticket_type' );
        wp_set_object_terms( $ticket_id, $category, 'category' );

        if ( $ticket_id ) {
            return $ticket_id;
        }

        return new \WP_Error( 'cant-add-ticket', __( 'Can\'t add a new ticket', 'helpdesk' ), array( 'status' => 500 ) );
    }
}

function Tickets_API() {
    $tickets = new Tickets;
    $register_routes = $tickets->register_routes();
}
add_action( 'rest_api_init', 'Helpdesk\API\Tickets_API' );
