<?php
/**
 * @since   1.0.0
 *
 * @package Helpdesk
 */

namespace Helpdesk;

defined( 'ABSPATH' ) || exit;

/**
 * Class Form
 */
class Form {

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
			self::$instance = new Form();
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
		add_shortcode( 'helpdesk_form', array( $this, 'helpdesk_form' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
	}

	/**
	 * Load the dependencies.
	 *
	 * @since 1.0.0
	 *
	 * @access private
	 */
	private function load_dependencies() { }

	/**
	 * Shortcode output
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public function helpdesk_form() {
		return '<div id="helpdesk-form"></div>';
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

		if ( has_shortcode( $post->post_content, 'helpdesk_form' ) ) {
			wp_enqueue_script(
				'helpdesk-form',
				HELPDESK_URL . 'src/form/app/build/index.js',
				array( 'wp-element' ),
				HELPDESK,
				true
			);

			wp_localize_script(
				'helpdesk-form',
				'helpdesk_form',
				array(
					'url'   => esc_url_raw( rest_url() ),
					'nonce' => wp_create_nonce( 'wp_rest' ),
				)
			);

			wp_enqueue_style(
				'helpdesk-form',
				HELPDESK_URL . 'src/form/app/build/index.css',
				array(),
				HELPDESK,
				'all'
			);
		}
	}
}

Form::instance();
