<?php
/**
 * @since   1.0.0
 *
 * @package HelpDeskWP
 */

namespace HelpDeskWP;

defined( 'ABSPATH' ) || exit;

/**
 * Class Login
 */
class Login {
    /**
	 * Login form view
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
    public static function view() {
        ?>
        <div class="helpdeskwp-login">
            <?php wp_login_form(); ?>
        </div>
        <?php
    }
}
