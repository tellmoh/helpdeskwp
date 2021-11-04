<?php
/**
 * @since   1.0.0
 *
 * @package Helpdesk
 */

namespace Helpdesk;

defined( 'ABSPATH' ) || exit;

/**
 * Class Dashboard
 */
class Dashboard {

    /**
	 * Instance
	 *
	 * @var string
	 */
	private static $instance = null;

	/**
	 * Instance of the class.
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public static function instance() {
		if ( self::$instance == null ) {
			self::$instance = new Dashboard();
		}
		return self::$instance;
	}

	/**
	 * Constructor
	 *
	 * @since 1.0.0
	 *
	 * @access private
	 */
	private function __construct() {
		$this->load_dependencies();
		$this->hooks();
	}

	/**
	 * Init hooks
	 *
	 * @since 1.0.0
	 *
	 * @access private
	 */
	private function hooks() {
        add_action( 'admin_menu', array( $this, 'dashboard_menu' ) );
        add_action( 'rest_api_init', array( $this, 'register_user_field' ) );
        add_action( 'rest_api_init', array( $this, 'register_category_field' ) );
        add_action( 'rest_api_init', array( $this, 'register_type_field' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
	}

	/**
	 * Load the dependencies.
	 *
	 * @since 1.0.0
	 *
	 * @access private
	 */
	private function load_dependencies() { }

	/**
	 * Dashboard output
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public function helpdesk_dashboard() {
		echo '<div id="helpdesk-dashboard"></div>';
	}

    /**
	 * Register user field.
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public function register_user_field() {
		register_rest_field(
			'ticket',
			'user',
			array(
				'get_callback'    => array( $this, 'get_user' ),
				'update_callback' => null,
				'schema'          => null,
			)
		);
	}

    /**
	 * Register category field.
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public function register_category_field() {
		register_rest_field(
			'ticket',
			'category',
			array(
				'get_callback'    => array( $this, 'get_category' ),
				'update_callback' => null,
				'schema'          => null,
			)
		);
	}

    /**
	 * Register type field.
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public function register_type_field() {
		register_rest_field(
			'ticket',
			'type',
			array(
				'get_callback'    => array( $this, 'get_type' ),
				'update_callback' => null,
				'schema'          => null,
			)
		);
	}

    /**
	 * Returns the category.
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public function get_category( $object ) {

        $category = get_term_by( 'id', $object['ticket_category'][0], 'ticket_category' )->name;

        if ( $category ) {
            return $category;
        }

        return '';
	}

    /**
	 * Returns the type.
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public function get_type( $object ) {

        $type = get_term_by( 'id', $object['ticket_type'][0], 'ticket_type' )->name;

        if ( $type ) {
            return $type;
        }

        return '';
	}

    /**
	 * Returns the user.
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public function get_user( $object ) {

        $author = get_the_author_meta( 'display_name', $object['author'] );

		return $author;
	}

    /**
	 * Dashboard menu
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
    public function dashboard_menu() {
        add_menu_page(
			__( 'Helpdesk Dashboard', 'helpdesk' ),
			'Tickets',
			'manage_options',
			'helpdesk',
			array( $this, 'helpdesk_dashboard' ),
			'dashicons-tickets-alt',
			10
		);

		add_submenu_page(
			'helpdesk',
			__( 'Category', 'helpdesk' ),
			__( 'Category', 'helpdesk' ),
			'manage_options',
			'edit-tags.php?taxonomy=ticket_category&post_type=ticket',
			array()
		);

        add_submenu_page(
			'helpdesk',
			__( 'Type', 'helpdesk' ),
			__( 'Type', 'helpdesk' ),
			'manage_options',
			'edit-tags.php?taxonomy=ticket_type&post_type=ticket',
			array()
		);
    }

	/**
	 * enqueue scripts
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public function enqueue_scripts() {

		if ( isset( $_GET['page'] ) && $_GET['page'] === 'helpdesk'  ) {
			wp_enqueue_script(
				'helpdesk-dashboard',
				HELPDESK_URL . 'src/dashboard/app/build/index.js',
				array( 'wp-element' ),
				HELPDESK,
				true
			);

			wp_localize_script(
				'helpdesk-dashboard',
				'helpdesk_dashboard',
				array(
					'url'   => esc_url_raw( rest_url() ),
					'nonce' => wp_create_nonce( 'wp_rest' ),
				)
			);

			wp_enqueue_style(
				'helpdesk-dashboard',
				HELPDESK_URL . 'src/dashboard/app/build/index.css',
				array(),
				HELPDESK,
				'all'
			);
		}
	}
}

Dashboard::instance();
