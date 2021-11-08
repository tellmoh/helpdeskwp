<?php
/**
 * @since   1.0.0
 *
 * @package Helpdesk
 */

namespace Helpdesk\Admin;

defined( 'ABSPATH' ) || exit;

/**
 * Class Roles
 */
class Roles {

    public static function roles() {
        add_role(
			'support_agent_role',
			'Support Agent',
			array(
				'read'         => true,
				'edit_posts'   => true,
				'upload_files' => true,
			)
		);
    }
}

add_action( 'init', array( 'Helpdesk\Admin\Roles', 'roles' ) );
