<?php
/**
 * @since   1.0.0
 *
 * @package Helpdesk
 */

namespace Helpdesk\Admin;

defined( 'ABSPATH' ) || exit;

/**
 * Class Taxonomy
 */
class Taxonomy {

    public static function types() {
        $labels = array(
            'name'              => _x( 'Types', 'taxonomy general name', 'helpdesk' ),
            'singular_name'     => _x( 'Type', 'taxonomy singular name', 'helpdesk' ),
            'search_items'      => __( 'Search Types', 'helpdesk' ),
            'all_items'         => __( 'All Types', 'helpdesk' ),
            'parent_item'       => __( 'Parent Type', 'helpdesk' ),
            'parent_item_colon' => __( 'Parent Type:', 'helpdesk' ),
            'edit_item'         => __( 'Edit Type', 'helpdesk' ),
            'update_item'       => __( 'Update Type', 'helpdesk' ),
            'add_new_item'      => __( 'Add New Type', 'helpdesk' ),
            'new_item_name'     => __( 'New Type Name', 'helpdesk' ),
            'menu_name'         => __( 'Type', 'helpdesk' ),
        );

        $args = array(
            'hierarchical'      => true,
            'labels'            => $labels,
            'show_ui'           => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'show_in_rest'      => true,
            'rewrite'           => array( 'slug' => 'type' ),
        );

        register_taxonomy( 'ticket_type', array( 'ticket' ), $args );
    }
}

add_action( 'init', array( 'Helpdesk\Admin\Taxonomy', 'types' ) );
