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
	 * Loads custom templates.
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
    public static function custom_template( $template ) {
        if ( UserDashboard::portal_page() && is_page( UserDashboard::portal_page() ) ) {
            $template = HELPDESK_WP_PATH  . 'src/template/portal.php';
        }

        if ( is_post_type_archive( 'documentation' ) ) {
            $template = HELPDESK_WP_PATH  . 'src/template/docs-archive.php';
        }

        if ( is_tax( 'docs_category' ) ) {
            $template = HELPDESK_WP_PATH  . 'src/template/docs-tax.php';
        }

        if ( is_singular( 'documentation' ) ) {
            $template = HELPDESK_WP_PATH  . 'src/template/single-docs.php';
        }

        return $template;
    }
}

add_action( 'template_include', array( 'HelpDeskWP\Template', 'custom_template' ) );
