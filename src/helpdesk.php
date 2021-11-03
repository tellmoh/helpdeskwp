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
	private function load_dependencies() {
        require_once HELPDESK_PATH . 'src/API/Tickets.php';
        require_once HELPDESK_PATH . 'src/form/form.php';
        require_once HELPDESK_PATH . 'src/dashboard/dashboard.php';
        require_once HELPDESK_PATH . 'src/admin/post-type/post-type.php';
        require_once HELPDESK_PATH . 'src/admin/taxonomy/taxonomy.php';
    }
}
