<?php
/**
 * @since   1.0.0
 *
 * @package Helpdesk
 */

namespace Helpdesk;

defined( 'ABSPATH' ) || exit;

/**
 * Class Register
 */
class Register {
    /**
	 * Register form view
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
    public static function view() {
        ?>
        <div class="helpdeskwp-register">
            <form>
                <div class="helpdesk-reegister-name">
                    <label for="help-first">First Name</label>
                    <input type="text" name="first-name" id="help-first">
                </div>
                <div class="helpdesk-register-last-name">
                    <label for="help-last">Last Name</label>
                    <input type="text" name="last-name" id="help-last">
                </div>
                <div class="helpdesk-register-email">
                    <label for="help-email">Email</label>
                    <input type="email" name="email" id="help-email">
                </div>
                <div class="helpdesk-register-username">
                    <label for="help-username">Username</label>
                    <input type="text" name="username" id="help-username">
                </div>
                <div class="helpdesk-register-password">
                    <label for="help-password">Password</label>
                    <input type="password" name="password" id="help-password">
                </div>
                <div class="helpdesk-register-submit">
                    <input type="submit" value="Sign up">
                </div>
            </form>
        </div>
        <?php
    }
}
