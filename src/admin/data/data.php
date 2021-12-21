<?php
/**
 * @since   1.0.0
 *
 * @package HelpDeskWP
 */

namespace HelpDeskWP\Admin;

defined( 'ABSPATH' ) || exit;

/**
 * Class Data
 */
class Data {

    public static function insert_ticket_type_data() {
        wp_create_term( 'Bug', 'ticket_type' );
        wp_create_term( 'Feature Request', 'ticket_type' );
        wp_create_term( 'Refund', 'ticket_type' );
    }

    public static function insert_ticket_status_data() {
        wp_create_term( 'Open', 'ticket_status' );
        wp_create_term( 'Close', 'ticket_status' );
        wp_create_term( 'Pending', 'ticket_status' );
        wp_create_term( 'Resolved', 'ticket_status' );
    }

    public static function insert_ticket_priority_data() {
        wp_create_term( 'Low', 'ticket_priority' );
        wp_create_term( 'Medium', 'ticket_priority' );
        wp_create_term( 'High', 'ticket_priority' );
        wp_create_term( 'Urgent', 'ticket_priority' );
    }
}

add_action( 'admin_init', array( 'HelpDeskWP\Admin\Data', 'insert_ticket_type_data' ) );
add_action( 'admin_init', array( 'HelpDeskWP\Admin\Data', 'insert_ticket_status_data' ) );
add_action( 'admin_init', array( 'HelpDeskWP\Admin\Data', 'insert_ticket_priority_data' ) );
