<?php
/**
 * @since   1.0.0
 *
 * @package HelpDeskWP
 */

namespace HelpDeskWP\Admin;

defined( 'ABSPATH' ) || exit;

use HelpDeskWP\Settings;

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
			'capabilities' => array(
				'delete_post'        => 'delete_ticket',
			),
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
            'publicly_queryable' => false,
            'show_ui'            => true,
            'show_in_menu'       => false,
            'capability_type'    => 'post',
            'has_archive'        => true,
            'supports'           => array( 'title', 'editor', 'author', 'thumbnail' ),
        );

        register_post_type( 'Reply', $args );
    }

    public static function documentations() {
        $slug      = Settings::get_setting( 'docsSlug' );
        $docs_slug = $slug ? $slug : 'docs';

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
			'capabilities' => array(
				'edit_post'          => 'edit_documentation',
				'delete_post'        => 'delete_documentation',
				'edit_posts'         => 'edit_documentations',
				'edit_others_posts'  => 'edit_others_documentations',
				'publish_posts'      => 'publish_documentations',
				'read_private_posts' => 'read_private_documentations',
				'create_posts'       => 'edit_documentations',
			),
            'has_archive'        => true,
            'show_in_rest'       => true,
            'supports'           => array( 'title', 'editor', 'author', 'thumbnail' ),
            'rewrite'            => array( 'slug' => $docs_slug )
        );

        register_post_type( 'Documentation', $args );
    }

    public static function canned_responses() {
        $labels = array(
            'name' => __( 'Canned Responses', 'helpdeskwp' ),
        );
        $args = array(
            'labels'             => $labels,
            'public'             => true,
            'publicly_queryable' => false,
            'show_ui'            => true,
            'show_in_menu'       => false,
            'capability_type'    => 'post',
			'capabilities' => array(
				'edit_post'          => 'edit_response',
				'delete_post'        => 'delete_response',
				'edit_posts'         => 'edit_responses',
				'edit_others_posts'  => 'edit_others_responses',
				'publish_posts'      => 'publish_responses',
				'read_private_posts' => 'read_private_responses',
				'create_posts'       => 'edit_responses',
			),
            'show_in_rest'       => true,
            'supports'           => array( 'title', 'editor' ),
        );

        register_post_type( 'Response', $args );
    }
}

add_action( 'init', array( 'HelpDeskWP\Admin\PostType', 'tickets' ) );
add_action( 'init', array( 'HelpDeskWP\Admin\PostType', 'reply' ) );
add_action( 'init', array( 'HelpDeskWP\Admin\PostType', 'documentations' ) );
add_action( 'init', array( 'HelpDeskWP\Admin\PostType', 'canned_responses' ) );
