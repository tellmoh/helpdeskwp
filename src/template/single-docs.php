<?php
/**
 * The template for displaying all single docs.
 *
 * @package Help Desk WP
 *
 * @since 1.2.0
 *
 * @version 1.0.0
 */

defined( 'ABSPATH' ) || exit;

get_header();
?>

<main class="helpdesk-docs-single">
        <?php

        do_action( 'helpdesk_docs_breadcrumbs' );

        if ( have_posts() ) {
            while ( have_posts() ) {
                the_post();

                do_action( 'helpdesk_single_docs_content' );
            }
        }
    ?>
</main>

<?php
get_footer();
