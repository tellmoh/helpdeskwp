<?php
/**
 * @since   1.3.0
 *
 * @package HelpDeskWP
 */

namespace HelpDeskWP;

defined( 'ABSPATH' ) || exit;

/**
 * Class Settings
 */
class Settings {

    /**
	 * Returns the settings
	 *
	 * @since 1.3.0
	 *
	 * @access public
	 */
	public static function get_setting( string $option ) {
		return isset( get_option( 'helpdeskwp_settings' )[$option] ) ? get_option( 'helpdeskwp_settings' )[$option] : array();
	}
}
