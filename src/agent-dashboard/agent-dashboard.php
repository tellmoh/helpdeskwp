<?php
/**
 * @since   1.0.0
 *
 * @package Helpdesk
 */

namespace Helpdesk;

defined( 'ABSPATH' ) || exit;

/**
 * Class Agent Dashboard
 */
class AgentDashboard {

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
			self::$instance = new AgentDashboard();
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
        add_action( 'rest_api_init', array( $this, 'register_priority_field' ) );
        add_action( 'rest_api_init', array( $this, 'register_status_field' ) );
        add_action( 'rest_api_init', array( $this, 'register_agent_field' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
	}

	/**
	 * Dashboard output
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public function helpdesk_agent_dashboard() {
		echo '<div id="helpdesk-agent-dashboard"></div>';
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
	 * Register priority field.
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public function register_priority_field() {
		register_rest_field(
			'ticket',
			'priority',
			array(
				'get_callback'    => array( $this, 'get_priority' ),
				'update_callback' => null,
				'schema'          => null,
			)
		);
	}

	/**
	 * Register status field.
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public function register_status_field() {
		register_rest_field(
			'ticket',
			'status',
			array(
				'get_callback'    => array( $this, 'get_status' ),
				'update_callback' => null,
				'schema'          => null,
			)
		);
	}

	/**
	 * Register agent field.
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public function register_agent_field() {
		register_rest_field(
			'ticket',
			'agent',
			array(
				'get_callback'    => array( $this, 'get_agent' ),
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

		$category = '';

		if ( isset( $object['ticket_category'][0] ) ) {
			$category = get_term_by( 'id', $object['ticket_category'][0], 'ticket_category' )->name;
		}

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

		$type = '';

		if ( isset( $object['ticket_type'][0] ) ) {
			$type = get_term_by( 'id', $object['ticket_type'][0], 'ticket_type' )->name;
		}

        if ( $type ) {
            return $type;
        }

        return '';
	}

    /**
	 * Returns the priority.
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public function get_priority( $object ) {

		$priority = '';

		if ( isset( $object['ticket_priority'][0] ) ) {
			$priority = get_term_by( 'id', $object['ticket_priority'][0], 'ticket_priority' )->name;
		}

        if ( $priority ) {
            return $priority;
        }

        return '';
	}

    /**
	 * Returns the status.
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public function get_status( $object ) {

		$status = '';

		if ( isset( $object['ticket_status'][0] ) ) {
			$status = get_term_by( 'id', $object['ticket_status'][0], 'ticket_status' )->name;
		}

        if ( $status ) {
            return $status;
        }

        return '';
	}

    /**
	 * Returns the agent.
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public function get_agent( $object ) {

		$agent = '';

		if ( isset( $object['ticket_agent'][0] ) ) {
			$agent = get_term_by( 'id', $object['ticket_agent'][0], 'ticket_agent' )->name;
		}

        if ( $agent ) {
            return $agent;
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
			array( $this, 'helpdesk_agent_dashboard' ),
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

		add_submenu_page(
			'helpdesk',
			__( 'Priority', 'helpdesk' ),
			__( 'Priority', 'helpdesk' ),
			'manage_options',
			'edit-tags.php?taxonomy=ticket_priority&post_type=ticket',
			array()
		);

		add_submenu_page(
			'helpdesk',
			__( 'Status', 'helpdesk' ),
			__( 'Status', 'helpdesk' ),
			'manage_options',
			'edit-tags.php?taxonomy=ticket_status&post_type=ticket',
			array()
		);

		add_submenu_page(
			'helpdesk',
			__( 'Agent', 'helpdesk' ),
			__( 'Agent', 'helpdesk' ),
			'manage_options',
			'edit-tags.php?taxonomy=ticket_agent&post_type=ticket',
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
				'helpdesk-agent-dashboard',
				HELPDESK_URL . 'src/agent-dashboard/app/build/index.js',
				array( 'wp-element' ),
				HELPDESK,
				true
			);

			wp_localize_script(
				'helpdesk-agent-dashboard',
				'helpdesk_agent_dashboard',
				array(
					'url'   => esc_url_raw( rest_url() ),
					'nonce' => wp_create_nonce( 'wp_rest' ),
				)
			);

			wp_enqueue_style(
				'helpdesk-agent-dashboard',
				HELPDESK_URL . 'src/agent-dashboard/app/build/index.css',
				array(),
				HELPDESK,
				'all'
			);
		}
	}
}

AgentDashboard::instance();
