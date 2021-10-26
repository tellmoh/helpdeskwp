<?php
/**
 * @since   1.0.0
 *
 * @package Helpdesk
 */

namespace Helpdesk;

defined( 'ABSPATH' ) || exit;

/**
 * Class Main
 */
class Main {

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
			self::$instance = new Main();
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
	}

	/**
	 * Load the dependencies.
	 *
	 * @since    1.0.0
     *
	 * @access   private
	 */
	private function load_dependencies() { }
}
