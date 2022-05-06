<?php
/**
 * @since   1.3.0
 *
 * @package HelpDeskWP
 */

namespace HelpDeskWP;

defined( 'ABSPATH' ) || exit;

/**
 * Class SendMail
 */
class SendMail {

	/**
	 * Ticket ID
	 *
	 * @var string
	 */
	private $ticket_id;

	/**
	 * Reply
	 *
	 * @var string
	 */
	private $reply;

	/**
	 * Constructor
	 *
	 * @since 1.3.0
	 *
	 * @param string $ticket_id
	 * @param string $reply
	 */
	public function __construct( $ticket_id, $reply ) {
		$this->ticket_id = $ticket_id;
		$this->reply     = $reply;
	}

	/**
     * Get email from address from ticket meta.
     *
     * @since 1.3.0
     */
	private function get_from_address() {
		return get_post_meta( $this->ticket_id, 'imported_from', true );
	}

	/**
     * Send email reply.
     *
     * @since 1.3.0
     */
	public function send() {
		$from			= $this->get_from_address();
		$user_id        = hdw_get_user_id_from_ticket( $this->ticket_id );
        $user           = get_userdata( $user_id );
        $recipient_name = $user->display_name;
        $recipient      = $user->user_email;
        $headers        = array('Content-Type: text/html; charset=UTF-8');
        $subject        = hdw_get_ticket_subject( $this->ticket_id );
        $agent_id       = hdw_get_agent_id_from_ticket( $this->ticket_id );
		$agent_name 	= hdw_get_agent_name_from_id( $agent_id );
        $reply          = wp_strip_all_tags( $this->reply );

        if ( function_exists( 'hdw_send_mail' ) && $from ) {

            hdw_send_mail( $reply, $from, $agent_name, $recipient, $recipient_name, $subject );
        } else {
            wp_mail( $recipient, $subject, $reply, $headers );
        }
	}
}
