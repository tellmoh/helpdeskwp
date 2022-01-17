<?php
/**
 * @since   1.0.0
 *
 * @package HelpDeskWP
 */

namespace HelpDeskWP\Admin;

defined( 'ABSPATH' ) || exit;

/**
 * Class PostType
 */
class PostType {

    public static function tickets() {
        $labels = array(
            'name' => __( 'Tickets', 'helpdeskwp' ),
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
            'name' => __( 'Reply', 'helpdeskwp' ),
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
        );

        register_post_type( 'Reply', $args );
    }

    public static function documentations() {
        $labels = array(
            'name' => __( 'Documentations', 'helpdeskwp' ),
        );
        $args = array(
            'labels'             => $labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => false,
            'capability_type'    => 'post',
            'has_archive'        => true,
            'show_in_rest'       => true,
            'supports'           => array( 'title', 'editor', 'author', 'thumbnail' ),
            'rewrite'            => array( 'slug' => 'docs' )
        );

        register_post_type( 'Documentation', $args );
    }
}

add_action( 'init', array( 'HelpDeskWP\Admin\PostType', 'tickets' ) );
add_action( 'init', array( 'HelpDeskWP\Admin\PostType', 'reply' ) );
add_action( 'init', array( 'HelpDeskWP\Admin\PostType', 'documentations' ) );
