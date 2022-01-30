<?php
/**
 * @since   1.2.0
 *
 * @package HelpDeskWP
 */

namespace HelpDeskWP;

defined( 'ABSPATH' ) || exit;

/**
 * Class Docs
 */
class Docs {

    /**
	 * Instance
	 *
	 * @var string
	 */
	private static $instance = null;

	/**
	 * Instance of the class.
	 *
	 * @since 1.2.0
	 *
	 * @access public
	 */
	public static function instance() {
		if ( self::$instance == null ) {
			self::$instance = new Docs();
		}
		return self::$instance;
	}

	/**
	 * Constructor
	 *
	 * @since 1.2.0
	 *
	 * @access private
	 */
	private function __construct() {
        add_action( 'helpdesk_docs_search', array( $this, 'search' ) );
        add_action( 'helpdesk_docs_categories', array( $this, 'categories' ) );
        add_action( 'helpdesk_before_archive_docs', array( $this, 'before_archive_docs' ) );
        add_action( 'helpdesk_after_archive_docs', array( $this, 'after_archive_docs' ) );
        add_action( 'helpdesk_docs_tax_content', array( $this, 'tax_archive' ) );
        add_action( 'helpdesk_docs_breadcrumbs', array( $this, 'breadcrumbs' ) );
        add_action( 'helpdesk_single_docs_content', array( $this, 'docs_content' ) );
        add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
    }

	/**
	 * Docs output
	 *
	 * @since 1.2.0
	 *
	 * @access public
	 */
    public function docs_output() {
        do_action( 'helpdesk_docs_categories' );
    }

    /**
	 * Search output
	 *
	 * @since 1.2.0
	 *
	 * @access public
	 */
    public function search_output() {
        do_action( 'helpdesk_docs_search' );
    }

    /**
	 * Docs query
	 *
	 * @since 1.2.0
	 *
	 * @access public
	 */
    public function docs_query( string $slug ) {
        $query = new \WP_Query( array(
            'post_type'      => 'documentation',
            'posts_per_page' => '5',
            'tax_query'      => array(
                array(
                   'taxonomy' => 'docs_category',
                   'field'    => 'slug',
                   'terms'    => $slug,
               ),
            )
        ) );

        while ( $query->have_posts() ) :
            $query->the_post();
            ?>
                <h3>
                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                </h3>
            <?php
        endwhile;

        wp_reset_postdata();
    }

    /**
	 * Docs search
	 *
	 * @since 1.2.0
	 *
	 * @access public
	 */
    public function search() {
        ?>
            <div class="helpdesk-search">
                <form>
                    <span class="helpdesk-search-icon">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" role="img"
                            xmlns="http://www.w3.org/2000/svg" width="15" viewBox="0 0 512 512">
                            <path fill="#6176a3"
                                d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z">
                            </path>
                        </svg>
                    </span>
                    <input type="text" placeholder="<?php esc_html_e( 'Search', 'helpdeskwp' ); ?>">
                    <div class="helpdesk-search-result"></div>
                </form>
            </div>
        <?php
    }

    /**
	 * Docs categories
	 *
	 * @since 1.2.0
	 *
	 * @access public
	 */
    public function categories() {
        $terms = get_terms(array(
            'taxonomy'   => 'docs_category',
            'hide_empty' => true,
        ));

        if ( $terms ) {
            ?>
                <div class="helpdesk-cat-items">
            <?php
            foreach ( $terms as $term ) {
                $term_id         = $term->term_id;
                $term_image_meta = get_term_meta( $term_id, 'cat_image_id', true );
                $term_link       = get_term_link( $term );

                ?>
                    <div class="helpdesk-cat-item">
                <?php

                if ( $term_image_meta ) {
                    echo wp_get_attachment_image ( $term_image_meta, 'thumbnail' );
                }

                ?>
                    <h2 class="helpdesk-cat-title">
                        <?php echo esc_html( $term->name ); ?>
                    </h2>
                <?php

                $this->docs_query( $term->slug );

                ?>
                        <div class="helpdesk-view-docs">
                            <a href="<?php echo esc_url( $term_link ); ?>" target="_blank">
                                <?php esc_html_e( 'View all', 'helpdeskwp' ); ?>
                                <svg role="img" xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 512 512">
                                    <path fill="#7e848b"
                                        d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z">
                                    </path>
                                </svg>
                            </a>
                        </div>
                    </div>
                <?php
            }
            ?>
                </div>
            <?php
        }
    }

    /**
	 * Before archive docs
	 *
	 * @since 1.2.0
	 *
	 * @access public
	 */
    public function before_archive_docs() {
        ?>
            <div class="helpdesk-docs-archive">
        <?php
    }

    /**
	 * After archive docs
	 *
	 * @since 1.2.0
	 *
	 * @access public
	 */
    public function after_archive_docs() {
        ?>
            </div>
        <?php
    }

    /**
	 * Tax archive
	 *
	 * @since 1.2.0
	 *
	 * @access public
	 */
    public function tax_archive() {
        ?>
            <div class="helpdesk-docs-tax-item">
                <h3>
                    <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
                        <?php the_title(); ?>
                    </a>
                </h3>
            </div>
        <?php
    }

    /**
	 * Breadcrumbs
	 *
	 * @since 1.2.0
	 *
	 * @access public
	 */
    public function breadcrumbs() {
        ?>
            <div class="helpdesk-breadcrumbs">
                <a href="<?php echo esc_url( get_post_type_archive_link( 'documentation' ) ); ?>">
                    <span><?php esc_html_e( 'Docs', 'helpdeskwp' )?></span>
                </a>
                <span>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" role="img"  width="6px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="#393f4c" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg>
                </span>
                <span><?php the_title(); ?></span>
            </div>
        <?php
    }

    /**
	 * Docs content
	 *
	 * @since 1.2.0
	 *
	 * @access public
	 */
    public function docs_content() {
        ?>
            <h1 class="docs-title"><?php the_title(); ?></h1>

            <div class="docs-date">
                <span>Date:</span>
                <?php the_date(); ?>
            </div>

            <div class="docs-content">
                <?php the_content(); ?>
            </div>
        <?php
    }

    /**
	 * is docs
	 *
	 * @since 1.2.0
	 *
	 * @access public
	 */
    public function is_docs() {
        return ( is_post_type_archive( 'documentation' ) || is_tax( 'docs_category' ) || is_singular( 'documentation' ) );
    }

    /**
	 * enqueue scripts
	 *
	 * @since 1.2.0
	 *
	 * @access public
	 */
    public function enqueue_scripts() {
        if ( ! $this->is_docs() ) {
            return false;
        }

        wp_enqueue_style(
            'helpdesk-docs-archive',
            HELPDESK_WP_URL . 'src/assets/dist/css/archive.css',
            array(),
            HELPDESKWP,
            'all'
        );

        wp_enqueue_style(
            'helpdesk-docs-single',
            HELPDESK_WP_URL . 'src/assets/dist/css/single.css',
            array(),
            HELPDESKWP,
            'all'
        );

        wp_enqueue_script(
            'helpdesk-docs',
            HELPDESK_WP_URL . 'src/assets/dist/js/docs.js',
            array( 'jquery' ),
            HELPDESKWP,
            true
        );

        wp_localize_script(
            'helpdesk-docs',
            'helpdesk_docs',
            array(
                'url'   => esc_url_raw( rest_url() ),
                'nonce' => wp_create_nonce( 'wp_rest' )
            )
        );
    }
}

Docs::instance();
