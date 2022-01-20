<?php
/**
 * @since   1.0.0
 *
 * @package HelpDeskWP
 */

namespace HelpDeskWP;

defined( 'ABSPATH' ) || exit;

use HelpDeskWP\Login;
use HelpDeskWP\Register;

/**
 * Class UserDashboard
 */
class UserDashboard {

    /**
	 * Instance
	 *
	 * @var string
	 */
	private static $instance = null;

	/**
	 * Instance of the class.
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public static function instance() {
		if ( self::$instance == null ) {
			self::$instance = new UserDashboard();
		}
		return self::$instance;
	}

	/**
	 * Constructor
	 *
	 * @since 1.0.0
	 *
	 * @access private
	 */
	private function __construct() {
		$this->hooks();
	}

	/**
	 * Init hooks
	 *
	 * @since 1.0.0
	 *
	 * @access private
	 */
	private function hooks() {
		add_shortcode( 'helpdesk_support_portal', array( $this, 'user_dashboard' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
	}

	/**
	 * Returns the settings
	 *
	 * @since 1.0.0
	 *
	 * @access private
	 */
	private static function settings( string $option ) {
		return $setting = isset( get_option( 'helpdeskwp_settings' )[$option] ) ? get_option( 'helpdeskwp_settings' )[$option] : array();
	}

	/**
	 * Returns support portal page ID
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public static function portal_page() {
		return self::settings( 'pageID' );
	}

	/**
	 * Shortcode output
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public function user_dashboard() {
		if ( is_page() ) {
			if ( is_user_logged_in() ) {
				return '<div id="helpdesk-user-dashboard"></div>';
			} else {
				Login::view();
				Register::view();
			}
		}
	}

	/**
	 * Returns the current user ID.
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public function user() {

		if ( is_user_logged_in() ) {
			return get_current_user_id();
		}

		return '';
	}

	/**
	 * enqueue scripts
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public function enqueue_scripts() {

		if ( self::portal_page() && is_page( self::portal_page() ) ) {
			wp_enqueue_script(
				'user-dashboard',
				HELPDESK_WP_URL . 'src/user-dashboard/app/build/index.js',
				array( 'wp-element', 'wp-i18n' ),
				HELPDESKWP,
				true
			);

			wp_localize_script(
				'user-dashboard',
				'user_dashboard',
				array(
					'url'     => esc_url_raw( rest_url() ),
					'ajaxurl' => esc_url_raw( admin_url( 'admin-ajax.php' ) ),
					'nonce'   => wp_create_nonce( 'wp_rest' ),
					'user'    => $this->user(),
				)
			);

			wp_enqueue_style(
				'user-dashboard',
				HELPDESK_WP_URL . 'src/user-dashboard/app/build/index.css',
				array(),
				HELPDESKWP,
				'all'
			);

			wp_enqueue_style(
				'user-dashboard-login',
				HELPDESK_WP_URL . 'src/assets/dist/css/login.css',
				array(),
				HELPDESKWP,
				'all'
			);

			wp_enqueue_script(
				'user-dashboard-login',
				HELPDESK_WP_URL . 'src/assets/dist/js/login.js',
				array( 'jquery' ),
				HELPDESKWP,
				true
			);
		}
	}
}

UserDashboard::instance();
