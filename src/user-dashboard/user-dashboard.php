<?php
/**
 * @since   1.0.0
 *
 * @package Helpdesk
 */

namespace Helpdesk;

defined( 'ABSPATH' ) || exit;

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
		$this->load_dependencies();
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
		add_shortcode( 'helpdesk_user_dashboard', array( $this, 'user_dashboard' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
	}

	/**
	 * Shortcode output
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public function user_dashboard() {
		return '<div id="helpdesk-user-dashboard"></div>';
	}

	/**
	 * enqueue scripts
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public function enqueue_scripts() {

		global $post;

		if ( has_shortcode( $post->post_content, 'helpdesk_user_dashboard' ) ) {
			wp_enqueue_script(
				'user-dashboard',
				HELPDESK_URL . 'src/user-dashboard/app/build/index.js',
				array( 'wp-element' ),
				HELPDESK,
				true
			);

			wp_localize_script(
				'user-dashboard',
				'user_dashboard',
				array(
					'url'   => esc_url_raw( rest_url() ),
					'nonce' => wp_create_nonce( 'wp_rest' ),
				)
			);

			wp_enqueue_style(
				'user-dashboard',
				HELPDESK_URL . 'src/user-dashboard/app/build/index.css',
				array(),
				HELPDESK,
				'all'
			);
		}
	}
}

UserDashboard::instance();
