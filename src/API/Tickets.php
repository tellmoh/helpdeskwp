<?php
/**
 * @since   1.0.0
 *
 * @package HelpDeskWP
 */

namespace HelpDeskWP\API;

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

        register_rest_route(
            $this->namespace . '/' . $this->version, '/' . $this->base, array(
            array(
                'methods'             => \WP_REST_Server::EDITABLE,
                'callback'            => array( $this, 'update_ticket' ),
                'permission_callback' => array( $this, 'update_ticket_permissions_check' ),
                'args'                => array(),
            ),
        ));

        register_rest_route(
            $this->namespace . '/' . $this->version, '/' . $this->base . '/(?P<id>[\d]+)', array(
            array(
                'methods'             => \WP_REST_Server::DELETABLE,
                'callback'            => array( $this, 'delete_ticket' ),
                'permission_callback' => array( $this, 'delete_ticket_permissions_check' ),
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
        $image  = $this->save_image( $files );
        $reply  = $this->add_reply( $params['description'], $ticket->data, $image->data );

        $this->set_ticket_default( $ticket->data );

        $res = array(
            'ticket' => $ticket,
            'media'  => $image,
            'reply'  => $reply
        );

        if ( $ticket->data ) {
            return new \WP_REST_Response( $res, 201 );
        }

        return new \WP_Error( 'cant-create-ticket', __( 'Can\'t create a ticket', 'helpdeskwp' ), array( 'status' => 500 ) );
    }

    public function add_ticket( string $title, string $type, string $category ) {
        $current_user = get_current_user_id();

        if ( $title ) {
            $ticket_id = wp_insert_post(
                array(
                    'post_title'  => $title,
                    'post_type'   => 'ticket',
                    'post_status' => 'publish',
                    'post_author' => $current_user
                )
            );

            if ( ! is_wp_error( $ticket_id ) ) {
                if ( $type !== 'undefined' ) {
                    wp_set_object_terms( $ticket_id, $type, 'ticket_type' );
                }

                if ( $category !== 'undefined' ) {
                    wp_set_object_terms( $ticket_id, $category, 'ticket_category' );
                }

                return new \WP_REST_Response( $ticket_id, 201 );
            }
        }

        return new \WP_Error( 'cant-add-ticket', __( 'Can\'t add a new ticket', 'helpdeskwp' ), array( 'status' => 500 ) );
    }

    public function add_reply( string $reply, string $ticket_id, array $images ) {
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

        return new \WP_Error( 'cant-add-reply', __( 'Can\'t add the reply', 'helpdeskwp' ), array( 'status' => 500 ) );
    }

    public function save_image( array $images ) {
        if ( empty( $images ) ) {
            $data = array(
                'msg' => 'empty-image'
            );
            return new \WP_REST_Response( $data, 200 );
        }

        $names     = $images['pictures']['name'];
        $tmp_names = $images['pictures']['tmp_name'];
        $images_id = array();

        if ( $names && $tmp_names ) {
            for ( $i = 0; $i < count( $names ); $i++ ) {
                $file     = file_get_contents( $tmp_names[$i] );
                $filetype = wp_check_filetype( $names[$i], '' );
                $upload   = wp_upload_bits( $names[$i], '', $file );

                if ( ! $upload['error'] ) {
                    $attachment_id = wp_insert_attachment(
                        array(
                            'guid'           => $upload['url'],
                            'post_mime_type' => $filetype['type'],
                            'post_title'     => preg_replace( '/\.[^.]+$/', '', basename( $names[$i] ) ),
                        ),
                        $upload['file'],
                        ''
                    );

                    if ( ! is_wp_error( $attachment_id ) ) {
                        $images_id[] = $attachment_id;
                    }
                }
            }

            if ( $images_id ) {
                return new \WP_REST_Response( $images_id, 201 );
            }
        }

        return new \WP_Error( 'cant-save-image', __( 'Can\'t save the image', 'helpdeskwp' ), array( 'status' => 500 ) );
    }

    public function update_ticket( $request ) {
        $properties = $request->get_param('properties');
        $ticket     = $request->get_param('ticket');

        if ( ! is_array( $properties ) ) {
            return array();
        }

        $updated_ticket = $this->prepare_update_ticket( $ticket, $properties );

        if ( ! is_wp_error( $updated_ticket ) ) {
            return new \WP_REST_Response( $updated_ticket, 201 );
        }

        return new \WP_Error( 'cant-update-ticket', __( 'Can\'t update the ticket', 'helpdeskwp' ), array( 'status' => 500 ) );
    }

    public function delete_ticket( $request ) {
        $ticket_id = $request->get_param( 'id' );

        $result = wp_trash_post( $ticket_id );

        if ( $result ) {
            return new \WP_REST_Response( __( 'The ticket has been deleted', 'helpdeskwp' ), 200 );
        }

        return new \WP_Error( 'cant-delete-ticket', __( 'Can\'t delete the ticket', 'helpdeskwp' ), array( 'status' => 500 ) );
    }

    public function prepare_update_ticket( string $ticket, array $properties ) {
        if ( isset( $properties['category'] ) && ! empty( $properties['category'] ) ) {
            wp_set_object_terms( $ticket, $properties['category'], 'ticket_category' );
        }

        if ( isset( $properties['priority'] ) && ! empty( $properties['priority'] ) ) {
            wp_set_object_terms( $ticket, $properties['priority'], 'ticket_priority' );
        }

        if ( isset( $properties['status'] ) && ! empty( $properties['status'] ) ) {
            wp_set_object_terms( $ticket, $properties['status'], 'ticket_status' );
        }

        if ( isset( $properties['type'] ) && ! empty( $properties['type'] ) ) {
            wp_set_object_terms( $ticket, $properties['type'], 'ticket_type' );
        }

        if ( isset( $properties['agent'] ) && ! empty( $properties['agent'] ) ) {
            wp_set_object_terms( $ticket, $properties['agent'], 'ticket_agent' );
        }
    }

    public function set_ticket_default( string $ticket_id ) {
        wp_set_object_terms( $ticket_id, 'Low', 'ticket_priority' );
        wp_set_object_terms( $ticket_id, 'Open', 'ticket_status' );
    }

    public function create_ticket_permissions_check() {
        return current_user_can( 'edit_posts' );
    }

    public function update_ticket_permissions_check() {
        return current_user_can( 'edit_posts' );
    }

    public function delete_ticket_permissions_check() {
        return current_user_can( 'edit_posts' );
    }
}

function Tickets_API() {
    $tickets = new Tickets;
    $register_routes = $tickets->register_routes();
}
add_action( 'rest_api_init', 'HelpDeskWP\API\Tickets_API' );
