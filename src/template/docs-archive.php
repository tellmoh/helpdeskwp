<?php
/**
 * Docs archive page.
 *
 * @package Help Desk WP
 *
 * @since 1.2.0
 *
 * @version 1.0.0
 */

defined( 'ABSPATH' ) || exit;

get_header();

do_action( 'helpdesk_before_archive_docs' );

do_action( 'helpdesk_docs_search' );

do_action( 'helpdesk_docs_categories' );

do_action( 'helpdesk_after_archive_docs' );

get_footer();
