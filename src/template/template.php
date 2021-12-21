<?php
/**
 * @since   1.0.0
 *
 * @package Helpdesk
 */

namespace Helpdesk;

defined( 'ABSPATH' ) || exit;

use Helpdesk\UserDashboard;

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
            $template = HELPDESK_PATH  . 'src/template/portal.php';
        }

        return $template;
    }
}

add_action( 'template_include', array( 'Helpdesk\Template', 'custom_template' ) );
