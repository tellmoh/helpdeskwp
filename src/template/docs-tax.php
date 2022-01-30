<?php
/**
 * Docs tax archive page.
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
    <main class="helpdesk-docs-archive">
        <div class="helpdesk-docs-tax-items">
                <?php

                do_action( 'helpdesk_before_docs_tax' );

                if ( have_posts() ) {
                    while ( have_posts() ) {
                        the_post();

                        do_action( 'helpdesk_docs_tax_content' );
                    }
                }

                do_action( 'helpdesk_after_docs_tax' );
            ?>
        </div>
    </main>
<?php

get_footer();
