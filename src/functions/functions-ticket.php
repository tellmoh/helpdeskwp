<?php
/**
 * Returns the ticket subject.
 *
 * @since 1.3.0
 * @param string $id Ticket ID
 * @return string Ticket subject
 */
function hdw_get_ticket_subject( string $id ) {
    return get_the_title( $id );
}
