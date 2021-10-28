<?php
/**
 * @since   1.0.0
 *
 * @package Helpdesk
 */

namespace Helpdesk\Admin;

defined( 'ABSPATH' ) || exit;

/**
 * Class PostType
 */
class PostType {

    public static function tickets() {
        $labels = array(
            'name'          => __( 'Tickets', 'helpdesk' ),
            'singular_name' => __( 'Ticket', 'helpdesk' ),
            'menu_name'     => __( 'Tickets', 'helpdesk' ),
        );
        $args = array(
            'labels'             => $labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'rewrite'            => array( 'slug' => 'ticket' ),
            'capability_type'    => 'post',
            'has_archive'        => true,
            'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'comments' ),
            'show_in_rest'       => true
        );

        register_post_type( 'Ticket', $args );
    }
}

add_action( 'init', array( 'Helpdesk\Admin\PostType', 'tickets' ) );
