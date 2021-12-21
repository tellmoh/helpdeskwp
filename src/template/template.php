<?php
/**
 * @since   1.0.0
 *
 * @package HelpDeskWP
 */

namespace HelpDeskWP;

defined( 'ABSPATH' ) || exit;

use HelpDeskWP\UserDashboard;

/**
 * Class Template
 */
class Template {
    /**
	 * Loads custom template for support portal page.
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
    public static function custom_template( $template ) {
        if ( UserDashboard::portal_page() && is_page( UserDashboard::portal_page() ) ) {
            $template = HELPDESK_WP_PATH  . 'src/template/portal.php';
        }

        return $template;
    }
}

add_action( 'template_include', array( 'HelpDeskWP\Template', 'custom_template' ) );
