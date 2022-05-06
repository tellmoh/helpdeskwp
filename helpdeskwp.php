<?php
/*
Plugin Name: Help Desk WP
Plugin URI:  https://helpdeskwp.github.io/
Description: Help Desk and customer support
Version:     1.2.0
Author:      helpdeskwp
Text Domain: helpdeskwp
License:     GPL v2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
*/

defined( 'ABSPATH' ) || exit;

define( 'HELPDESKWP', '1.2.0' );

define( 'HELPDESK_WP_PATH', plugin_dir_path( __FILE__ ) );

define( 'HELPDESK_WP_URL', plugin_dir_url( __FILE__ ) );

require HELPDESK_WP_PATH . 'src/helpdeskwp.php';

/**
 * Get an instance of the Main class.
 *
 * @since 1.0.0
 */
if ( ! function_exists( 'helpdeskwp' ) ) {
	function helpdeskwp() {
		HelpDeskWP\Main::instance();
	}
	helpdeskwp();

	/**
	 * Add custom support agent role.
	 *
	 * @since 1.3.0
	 */
	function hdw_agent_role() {
		add_role( 'hdw_support_agent', 'Support Agent', array( 'read' => true, 'helpdesk' => true ) );
	}
	register_activation_hook( __FILE__, 'hdw_agent_role' );
}
