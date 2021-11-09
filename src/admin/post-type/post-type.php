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
            'name' => __( 'Tickets', 'helpdesk' ),
        );
        $args = array(
            'labels'             => $labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => false,
            'capability_type'    => 'post',
            'has_archive'        => true,
            'supports'           => array( 'title', 'editor', 'author', 'thumbnail' ),
            'show_in_rest'       => true
        );

        register_post_type( 'Ticket', $args );
    }

    public static function reply() {
        $labels = array(
            'name' => __( 'Reply', 'helpdesk' ),
        );
        $args = array(
            'labels'             => $labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => false,
            'capability_type'    => 'post',
            'has_archive'        => true,
            'supports'           => array( 'title', 'editor', 'author', 'thumbnail' ),
            'show_in_rest'       => true
        );

        register_post_type( 'Reply', $args );
    }
}

add_action( 'init', array( 'Helpdesk\Admin\PostType', 'tickets' ) );
add_action( 'init', array( 'Helpdesk\Admin\PostType', 'reply' ) );
