<?php
/**
 * @since   1.0.0
 *
 * @package Helpdesk
 */

namespace Helpdesk\API;

defined( 'ABSPATH' ) || exit;

/**
 * Class Settings API
 */
class Settings {

    protected $namespace = 'helpdesk';
    protected $base      = 'settings';
    protected $version   = 'v1';
    protected $option    = 'helpdeskwp_settings';

    public function register_routes() {
        register_rest_route(
            $this->namespace . '/' . $this->version, '/' . $this->base, array(
            array(
                'methods'             => \WP_REST_Server::EDITABLE,
                'callback'            => array( $this, 'create_item' ),
                'permission_callback' => array( $this, 'create_item_permissions_check' ),
                'args'                => array(),
            ),
        ));

        register_rest_route(
            $this->namespace . '/' . $this->version, '/' . $this->base, array(
            array(
                'methods'             => \WP_REST_Server::READABLE,
                'callback'            => array( $this, 'get_options' ),
                'permission_callback' => array( $this, 'options_permissions_check' ),
                'args'                => array(),
            ),
        ));

        register_rest_route(
            $this->namespace . '/' . $this->version, '/' . $this->base . '/(?P<id>[\d]+)', array(
            array(
                'methods'             => \WP_REST_Server::DELETABLE,
                'callback'            => array( $this, 'delete_item' ),
                'permission_callback' => array( $this, 'delete_item_permissions_check' ),
                'args'                => array(),
            ),
        ));
    }

    public function get_options() {
        $options = get_option( $this->option );

        if ( $options ) {
            return $options;
        }

        return array();
    }

    public function create_item( $request ) {
        $params = $request->get_params();
        $type   = $request->get_param( 'type' );

        if ( ! is_array( $params ) ) {
            return array();
        }

        if ( 'saveSettings' === $type ) {
            return $this->update_options( $params );
        }

        if ( 'addTerm' === $type ) {
            return $this->add_term( $params );
        }

        return new \WP_Error( 'cant-create-item', __( 'Can\'t create an item', 'helpdeskwp' ), array( 'status' => 500 ) );
    }

    public function add_term( $params ) {

        $term             = array();
        $term['name']     = sanitize_text_field( $params['termName'] );
        $term['taxonomy'] = sanitize_text_field( $params['taxonomy'] );

        if ( ! empty( $term['name'] ) && ! empty( $term['taxonomy'] ) ) {

            require_once( ABSPATH . 'wp-admin/includes/taxonomy.php' );

            wp_create_term( $term['name'], $term['taxonomy'] );
        }
    }

    public function update_options( $params ) {

        $options             = array();
        $options['pageID']   = sanitize_text_field( $params['pageID'] );
        $options['pageName'] = sanitize_text_field( $params['pageName'] );

        if ( ! empty( $options['pageID'] ) && ! empty( $options['pageName'] ) ) {
            update_option( $this->option, $options );
        }
    }

    public function delete_item( $request ) {
        $term_id  = $request->get_param( 'id' );
        $taxonomy = $request->get_param( 'taxonomy' );

        $result = wp_delete_term( $term_id, $taxonomy );

        if ( $result ) {
            return new \WP_REST_Response( __( 'The term has been deleted', 'helpdeskwp' ), 200 );
        }

        return new \WP_Error( 'cant-delete-term', __( 'Can\'t delete the term', 'helpdeskwp' ), array( 'status' => 500 ) );
    }

    public function options_permissions_check() {
        return current_user_can( 'manage_options' );
    }

    public function create_item_permissions_check() {
        return current_user_can( 'manage_options' );
    }

    public function delete_item_permissions_check() {
        return current_user_can( 'manage_options' );
    }
}

function Settings_API() {
    $settings = new Settings;
    $register_routes = $settings->register_routes();
}
add_action( 'rest_api_init', 'Helpdesk\API\Settings_API' );
