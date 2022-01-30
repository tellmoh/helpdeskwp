<?php
/**
 * @since   1.0.0
 *
 * @package HelpDeskWP
 */

namespace HelpDeskWP;

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
		require_once HELPDESK_WP_PATH . 'src/API/Tickets.php';
        require_once HELPDESK_WP_PATH . 'src/API/Replies.php';
        require_once HELPDESK_WP_PATH . 'src/API/Settings.php';
        require_once HELPDESK_WP_PATH . 'src/user-dashboard/login.php';
        require_once HELPDESK_WP_PATH . 'src/user-dashboard/register.php';
        require_once HELPDESK_WP_PATH . 'src/user-dashboard/user-dashboard.php';
        require_once HELPDESK_WP_PATH . 'src/agent-dashboard/agent-dashboard.php';
        require_once HELPDESK_WP_PATH . 'src/agent-dashboard/overview.php';
        require_once HELPDESK_WP_PATH . 'src/admin/post-type/post-type.php';
        require_once HELPDESK_WP_PATH . 'src/admin/taxonomy/taxonomy.php';
        require_once HELPDESK_WP_PATH . 'src/admin/data/data.php';
        require_once HELPDESK_WP_PATH . 'src/docs/docs.php';
        require_once HELPDESK_WP_PATH . 'src/docs/image-meta/category-image-meta.php';
        require_once HELPDESK_WP_PATH . 'src/template/template.php';
    }
}
