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
            <form class="helpdeskwp-register-form">
                <div class="helpdesk-reegister-name">
                    <label for="help-first">First Name</label>
                    <input type="text" name="first-name" id="help-first" required>
                </div>
                <div class="helpdesk-register-last-name">
                    <label for="help-last">Last Name</label>
                    <input type="text" name="last-name" id="help-last" required>
                </div>
                <div class="helpdesk-register-email">
                    <label for="help-email">Email</label>
                    <input type="email" name="email" id="help-email" required>
                </div>
                <div class="helpdesk-register-username">
                    <label for="help-username">Username</label>
                    <input type="text" name="username" id="help-username" required>
                </div>
                <div class="helpdesk-register-password">
                    <label for="help-password">Password</label>
                    <input type="password" name="password" id="help-password" required>
                </div>
                <div class="helpdesk-register-submit">
                    <input type="submit" value="Sign up">
                </div>
            </form>
            <div id="helpdesk-err-msg"></div>
        </div>
        <?php
    }

    /**
	 * Register ajax
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
    public static function helpdesk_register() {

        check_ajax_referer( 'wp_rest', 'nonce' );

        $first_name = sanitize_text_field( $_POST['firstName'] );
        $last_name  = sanitize_text_field( $_POST['lastName'] );
        $email      = sanitize_text_field( $_POST['email'] );
        $username   = sanitize_text_field( $_POST['username'] );
        $password   = sanitize_text_field( $_POST['password'] );

        $check_email    = get_user_by( 'email', $email );
        $check_username = get_user_by( 'login', $username );

        if ( $check_email || $check_username ) {
            return wp_send_json( 'The email or username has already been taken please use another email or username.', 500 );
        }

        $userdata = array(
            'user_pass'             => $password,
            'user_login'            => $username,
            'user_email'            => $email,
            'display_name'          => $first_name . ' ' .  $last_name,
            'first_name'            => $first_name,
            'last_name'             => $last_name,
            'show_admin_bar_front'  => 'false',
            'role'                  => 'contributor',
        );

        $user_id = wp_insert_user( $userdata ) ;

        if ( ! is_wp_error( $user_id ) ) {
            $user = get_user_by( 'id', $user_id );
            if( $user ) {
                wp_set_current_user( $user_id, $user->user_login );
                wp_set_auth_cookie( $user_id );
                do_action( 'wp_login', $user->user_login, $user );
            }
        }

        wp_die();
    }
}

add_action( 'wp_ajax_helpdesk_register', array( 'Helpdesk\Register', 'helpdesk_register' ) );
add_action( 'wp_ajax_nopriv_helpdesk_register', array( 'Helpdesk\Register', 'helpdesk_register' ) );
