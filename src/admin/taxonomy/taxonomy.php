<?php
/**
 * @since   1.0.0
 *
 * @package HelpDeskWP
 */

namespace HelpDeskWP\Admin;

defined( 'ABSPATH' ) || exit;

/**
 * Class Taxonomy
 */
class Taxonomy {

    public static function types() {
        $labels = array(
            'name'              => _x( 'Types', 'taxonomy general name', 'helpdeskwp' ),
            'singular_name'     => _x( 'Type', 'taxonomy singular name', 'helpdeskwp' ),
            'search_items'      => __( 'Search Types', 'helpdeskwp' ),
            'all_items'         => __( 'All Types', 'helpdeskwp' ),
            'parent_item'       => __( 'Parent Type', 'helpdeskwp' ),
            'parent_item_colon' => __( 'Parent Type:', 'helpdeskwp' ),
            'edit_item'         => __( 'Edit Type', 'helpdeskwp' ),
            'update_item'       => __( 'Update Type', 'helpdeskwp' ),
            'add_new_item'      => __( 'Add New Type', 'helpdeskwp' ),
            'new_item_name'     => __( 'New Type Name', 'helpdeskwp' ),
            'menu_name'         => __( 'Type', 'helpdeskwp' ),
        );

        $args = array(
            'hierarchical'      => true,
            'labels'            => $labels,
            'show_ui'           => true,
            'show_in_menu'      => false,
            'query_var'         => true,
            'show_in_rest'      => true,
            'rewrite'           => array( 'slug' => 'type' ),
        );

        register_taxonomy( 'ticket_type', array( 'ticket' ), $args );
    }

    public static function category() {
        $labels = array(
            'name'              => _x( 'Categories', 'taxonomy general name', 'helpdeskwp' ),
            'singular_name'     => _x( 'Category', 'taxonomy singular name', 'helpdeskwp' ),
            'search_items'      => __( 'Search Categories', 'helpdeskwp' ),
            'all_items'         => __( 'All Categories', 'helpdeskwp' ),
            'parent_item'       => __( 'Parent Category', 'helpdeskwp' ),
            'parent_item_colon' => __( 'Parent Category:', 'helpdeskwp' ),
            'edit_item'         => __( 'Edit Category', 'helpdeskwp' ),
            'update_item'       => __( 'Update Category', 'helpdeskwp' ),
            'add_new_item'      => __( 'Add New Category', 'helpdeskwp' ),
            'new_item_name'     => __( 'New Category Name', 'helpdeskwp' ),
            'menu_name'         => __( 'Categories', 'helpdeskwp' ),
        );

        $args = array(
            'hierarchical'      => true,
            'labels'            => $labels,
            'show_ui'           => true,
            'show_in_menu'      => false,
            'query_var'         => true,
            'show_in_rest'      => true,
            'rewrite'           => array( 'slug' => 'category' ),
        );

        register_taxonomy( 'ticket_category', array( 'ticket' ), $args );
    }

    public static function priority() {
        $labels = array(
            'name'              => _x( 'Prioritise', 'taxonomy general name', 'helpdeskwp' ),
            'singular_name'     => _x( 'Priority', 'taxonomy singular name', 'helpdeskwp' ),
            'search_items'      => __( 'Search Prioritise', 'helpdeskwp' ),
            'all_items'         => __( 'All Prioritise', 'helpdeskwp' ),
            'parent_item'       => __( 'Parent Priority', 'helpdeskwp' ),
            'parent_item_colon' => __( 'Parent Priority:', 'helpdeskwp' ),
            'edit_item'         => __( 'Edit Priority', 'helpdeskwp' ),
            'update_item'       => __( 'Update Priority', 'helpdeskwp' ),
            'add_new_item'      => __( 'Add New Priority', 'helpdeskwp' ),
            'new_item_name'     => __( 'New Priority Name', 'helpdeskwp' ),
            'menu_name'         => __( 'Prioritise', 'helpdeskwp' ),
        );

        $args = array(
            'hierarchical'      => true,
            'labels'            => $labels,
            'show_ui'           => true,
            'show_in_menu'      => false,
            'query_var'         => true,
            'show_in_rest'      => true,
            'rewrite'           => array( 'slug' => 'priority' ),
        );

        register_taxonomy( 'ticket_priority', array( 'ticket' ), $args );
    }

    public static function status() {
        $labels = array(
            'name'              => _x( 'Status', 'taxonomy general name', 'helpdeskwp' ),
            'singular_name'     => _x( 'Status', 'taxonomy singular name', 'helpdeskwp' ),
            'search_items'      => __( 'Search Status', 'helpdeskwp' ),
            'all_items'         => __( 'All Status', 'helpdeskwp' ),
            'parent_item'       => __( 'Parent Status', 'helpdeskwp' ),
            'parent_item_colon' => __( 'Parent Status:', 'helpdeskwp' ),
            'edit_item'         => __( 'Edit Status', 'helpdeskwp' ),
            'update_item'       => __( 'Update Status', 'helpdeskwp' ),
            'add_new_item'      => __( 'Add New Status', 'helpdeskwp' ),
            'new_item_name'     => __( 'New Status Name', 'helpdeskwp' ),
            'menu_name'         => __( 'Status', 'helpdeskwp' ),
        );

        $args = array(
            'hierarchical'      => true,
            'labels'            => $labels,
            'show_ui'           => true,
            'show_in_menu'      => false,
            'query_var'         => true,
            'show_in_rest'      => true,
            'rewrite'           => array( 'slug' => 'status' ),
        );

        register_taxonomy( 'ticket_status', array( 'ticket' ), $args );
    }

    public static function agent() {
        $labels = array(
            'name'              => _x( 'Agents', 'taxonomy general name', 'helpdeskwp' ),
            'singular_name'     => _x( 'Agent', 'taxonomy singular name', 'helpdeskwp' ),
            'search_items'      => __( 'Search Agent', 'helpdeskwp' ),
            'all_items'         => __( 'All Agents', 'helpdeskwp' ),
            'parent_item'       => __( 'Parent Agent', 'helpdeskwp' ),
            'parent_item_colon' => __( 'Parent Agent:', 'helpdeskwp' ),
            'edit_item'         => __( 'Edit Agent', 'helpdeskwp' ),
            'update_item'       => __( 'Update Agent', 'helpdeskwp' ),
            'add_new_item'      => __( 'Add New Agent', 'helpdeskwp' ),
            'new_item_name'     => __( 'New Agent Name', 'helpdeskwp' ),
            'menu_name'         => __( 'Agent', 'helpdeskwp' ),
        );

        $args = array(
            'hierarchical'      => true,
            'labels'            => $labels,
            'show_ui'           => true,
            'show_in_menu'      => false,
            'query_var'         => true,
            'show_in_rest'      => true,
            'rewrite'           => array( 'slug' => 'agent' ),
        );

        register_taxonomy( 'ticket_agent', array( 'ticket' ), $args );
    }

    public static function docs_category() {
        $labels = array(
            'name'              => _x( 'Categories', 'taxonomy general name', 'helpdeskwp' ),
            'singular_name'     => _x( 'Category', 'taxonomy singular name', 'helpdeskwp' ),
            'search_items'      => __( 'Search Category', 'helpdeskwp' ),
            'all_items'         => __( 'All Categories', 'helpdeskwp' ),
            'parent_item'       => __( 'Parent Category', 'helpdeskwp' ),
            'parent_item_colon' => __( 'Parent Category:', 'helpdeskwp' ),
            'edit_item'         => __( 'Edit Category', 'helpdeskwp' ),
            'update_item'       => __( 'Update Category', 'helpdeskwp' ),
            'add_new_item'      => __( 'Add New Category', 'helpdeskwp' ),
            'new_item_name'     => __( 'New Category Name', 'helpdeskwp' ),
            'menu_name'         => __( 'Category', 'helpdeskwp' ),
        );

        $args = array(
            'hierarchical'      => true,
            'labels'            => $labels,
            'show_ui'           => true,
            'show_in_menu'      => false,
            'query_var'         => true,
            'show_in_rest'      => true,
            'rewrite'           => array( 'slug' => 'docs-category' ),
        );

        register_taxonomy( 'docs_category', array( 'documentation' ), $args );
    }

    public static function docs_tag() {
        $labels = array(
            'name'              => _x( 'Tags', 'taxonomy general name', 'helpdeskwp' ),
            'singular_name'     => _x( 'Tag', 'taxonomy singular name', 'helpdeskwp' ),
            'search_items'      => __( 'Search Tag', 'helpdeskwp' ),
            'all_items'         => __( 'All Categories', 'helpdeskwp' ),
            'parent_item'       => __( 'Parent Tag', 'helpdeskwp' ),
            'parent_item_colon' => __( 'Parent Tag:', 'helpdeskwp' ),
            'edit_item'         => __( 'Edit Tag', 'helpdeskwp' ),
            'update_item'       => __( 'Update Tag', 'helpdeskwp' ),
            'add_new_item'      => __( 'Add New Tag', 'helpdeskwp' ),
            'new_item_name'     => __( 'New Tag Name', 'helpdeskwp' ),
            'menu_name'         => __( 'Tag', 'helpdeskwp' ),
        );

        $args = array(
            'hierarchical'      => true,
            'labels'            => $labels,
            'show_ui'           => true,
            'show_in_menu'      => false,
            'query_var'         => true,
            'show_in_rest'      => true,
            'rewrite'           => array( 'slug' => 'docs-tag' ),
        );

        register_taxonomy( 'docs_tag', array( 'documentation' ), $args );
    }
}

add_action( 'init', array( 'HelpDeskWP\Admin\Taxonomy', 'category' ) );
add_action( 'init', array( 'HelpDeskWP\Admin\Taxonomy', 'types' ) );
add_action( 'init', array( 'HelpDeskWP\Admin\Taxonomy', 'priority' ) );
add_action( 'init', array( 'HelpDeskWP\Admin\Taxonomy', 'status' ) );
add_action( 'init', array( 'HelpDeskWP\Admin\Taxonomy', 'agent' ) );
add_action( 'init', array( 'HelpDeskWP\Admin\Taxonomy', 'docs_category' ) );
add_action( 'init', array( 'HelpDeskWP\Admin\Taxonomy', 'docs_tag' ) );
