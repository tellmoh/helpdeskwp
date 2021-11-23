<?php
/*
Plugin Name: Helpdesk
Description: Helpdesk and ticketing system
Version:     1.0.0
Author:      mhmdmu
Text Domain: helpdesk
License:     GNU Affero General Public License v3.0
License URI: https://www.gnu.org/licenses/agpl-3.0.en.html
*/

defined( 'ABSPATH' ) || exit;

define( 'HELPDESK', '1.0.0' );

define( 'HELPDESK_PATH', plugin_dir_path( __FILE__ ) . '/' );

define( 'HELPDESK_URL', plugin_dir_url( __FILE__ ) . '/' );

define( 'HELPDESK_ASSETS_URL', plugin_dir_url( __FILE__ ) . 'assets/' );

require HELPDESK_PATH . 'src/helpdesk.php';

/**
 * Get an instance of the Main class.
 *
 * @since 1.0.0
 */
if ( ! function_exists( 'helpdesk' ) ) {
	function helpdesk() {
		Helpdesk\Main::instance();
	}
	helpdesk();
}
