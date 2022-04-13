<?php
/**
 * Get the user ID from their ticket.
 *
 * @since 1.3.0
 * @param string $id Ticket ID
 * @return string User ID
 */
function hdw_get_user_id_from_ticket( string $id ) {
    return get_post_field( 'post_author', $id );
}

/**
 * Get the agent ID from their ticket.
 *
 * @since 1.3.0
 * @param string $id Ticket ID
 * @return string Agent ID
 */
function hdw_get_agent_id_from_ticket( string $id ) {
    return get_post_meta( $id, 'ticket_agent', true );
}

/**
 * Get the agent name from their ID.
 *
 * @since 1.3.0
 * @param string $id Agent ID
 * @return string Agent name
 */
function hdw_get_agent_name_from_id( string $id ) {
    $user = get_userdata( $id );
    $name = '';

    if ( $user ) {
        $name = $user->display_name;
    }

    return $name;
}
