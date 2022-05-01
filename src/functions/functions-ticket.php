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

/**
 * Create new ticket.
 *
 * @since 1.3.0
 *
 * @param string $title Ticket title
 * @param string $type Ticket type
 * @param string $category Ticket category
 * @param string $user Ticket user
 *
 * @return string Ticket ID
 */
function hdw_create_ticket( string $title, string $type, string $category, string $user ) {
    $ticket_id = wp_insert_post(
        array(
            'post_title'  => $title,
            'post_type'   => 'ticket',
            'post_status' => 'publish',
            'post_author' => $user
        )
    );

    if ( ! is_wp_error( $ticket_id ) ) {
        if ( $type !== 'undefined' ) {
            wp_set_object_terms( $ticket_id, $type, 'ticket_type' );
        }

        if ( $category !== 'undefined' ) {
            wp_set_object_terms( $ticket_id, $category, 'ticket_category' );
        }
    }

    return $ticket_id;
}

/**
 * Create new reply.
 *
 * @since 1.3.0
 *
 * @param string $reply Reply content
 * @param string $ticket_id Ticket ID
 * @param string $user
 * @param array  $images Image atachments
 * @param string $type Reply type
 *
 * @return string Reply ID
 */
function hdw_add_reply( string $reply, string $ticket_id, string $user, array $images = array(), string $type = '' ) {
    $reply_id = wp_insert_post(
        array(
            'post_title'   => $ticket_id,
            'post_content' => $reply,
            'post_type'    => 'reply',
            'post_status'  => 'publish',
            'post_parent'  => $ticket_id,
            'post_author'  => $user,
            'meta_input'   => array(
                'reply_images' => $images,
                'reply_type'   => $type,
            ),
        )
    );

    if ( $reply_id ) {
        return $reply_id;
    }
}
