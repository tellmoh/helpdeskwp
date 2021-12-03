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
                'methods'             => \WP_REST_Server::READABLE,
                'callback'            => array( $this, 'get_options' ),
                'permission_callback' => array( $this, 'options_permissions_check' ),
                'args'                => array(),
            ),
        ));

        register_rest_route(
            $this->namespace . '/' . $this->version, '/' . $this->base, array(
            array(
                'methods'             => \WP_REST_Server::EDITABLE,
                'callback'            => array( $this, 'update_options' ),
                'permission_callback' => array( $this, 'options_permissions_check' ),
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

    public function update_options( $request ) {
        $options = $request->get_params();

        if ( ! is_array( $options ) ) {
            return array();
        }

        update_option( $this->option, $options );
    }

    public function options_permissions_check() {
        return current_user_can( 'manage_options' );
    }
}

function Settings_API() {
    $settings = new Settings;
    $register_routes = $settings->register_routes();
}
add_action( 'rest_api_init', 'Helpdesk\API\Settings_API' );
