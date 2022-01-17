<?php
/**
 * @since   1.0.0
 *
 * @package HelpDeskWP
 */

namespace HelpDeskWP;

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
	 * Count of open tickets
	 *
	 * @var string
	 */
	private $open_tickets;

	/**
	 * Count of close tickets
	 *
	 * @var string
	 */
	private $close_tickets;

	/**
	 * Count of pending tickets
	 *
	 * @var string
	 */
	private $pending_tickets;

	/**
	 * Count of resolved tickets
	 *
	 * @var string
	 */
	private $resolved_tickets;

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
		add_action( 'init', array( $this, 'get_open_tickets' ), 99 );
		add_action( 'init', array( $this, 'get_close_tickets' ), 99 );
		add_action( 'init', array( $this, 'get_pending_tickets' ), 99 );
		add_action( 'init', array( $this, 'get_resolved_tickets' ), 99 );
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
			__( 'Helpdesk Dashboard', 'helpdeskwp' ),
			'Help Desk WP',
			'manage_options',
			'helpdesk',
			array( $this, 'helpdesk_agent_dashboard' ),
			'dashicons-tickets-alt',
			10
		);
    }

	/**
	 * Returns the number of open tickets
	 *
	 * @since 1.0.1
	 *
	 * @access public
	 */
	public function get_open_tickets() {

		$terms = get_term_by( 'slug', 'open', 'ticket_status' );

		$this->open_tickets = isset( $terms->count ) ? $terms->count : '';
	}

	/**
	 * Returns the number of close tickets
	 *
	 * @since 1.0.1
	 *
	 * @access public
	 */
	public function get_close_tickets() {

		$terms = get_term_by( 'slug', 'close', 'ticket_status' );

		$this->close_tickets = isset( $terms->count ) ? $terms->count : '';
	}

	/**
	 * Returns the number of pending tickets
	 *
	 * @since 1.0.1
	 *
	 * @access public
	 */
	public function get_pending_tickets() {

		$terms = get_term_by( 'slug', 'pending', 'ticket_status' );

		$this->pending_tickets = isset( $terms->count ) ? $terms->count : '';
	}

	/**
	 * Returns the number of resolved tickets
	 *
	 * @since 1.0.1
	 *
	 * @access public
	 */
	public function get_resolved_tickets() {

		$terms = get_term_by( 'slug', 'resolved', 'ticket_status' );

		$this->resolved_tickets = isset( $terms->count ) ? $terms->count : '';
	}

	/**
	 * Returns the base edit link of the posts.
	 *
	 * @since 1.2.0
	 *
	 * @access private
	 */
	private function get_posts_edit_link() {
		return admin_url( 'post.php?post=' );
	}

	/**
	 * Returns the base edit link of the categories.
	 *
	 * @since 1.2.0
	 *
	 * @access private
	 */
	private function get_categories_link() {
		return admin_url( 'term.php?taxonomy=docs_category&tag_ID=' );
	}

	/**
	 * Returns the base edit link of the tags.
	 *
	 * @since 1.2.0
	 *
	 * @access private
	 */
	private function get_tags_link() {
		return admin_url( 'term.php?taxonomy=docs_tag&tag_ID=' );
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
				HELPDESK_WP_URL . 'src/agent-dashboard/app/build/index.js',
				array( 'wp-element', 'wp-i18n' ),
				HELPDESKWP,
				true
			);

			wp_localize_script(
				'helpdesk-agent-dashboard',
				'helpdesk_agent_dashboard',
				array(
					'url'              => esc_url_raw( rest_url() ),
					'nonce'            => wp_create_nonce( 'wp_rest' ),
					'posts_edit_link'  => $this->get_posts_edit_link(),
					'cat_edit_link'    => $this->get_categories_link(),
					'tag_edit_link'    => $this->get_tags_link(),
					'open_tickets'     => esc_attr( $this->open_tickets ),
					'close_tickets'    => esc_attr( $this->close_tickets ),
					'pending_tickets'  => esc_attr( $this->pending_tickets ),
					'resolved_tickets' => esc_attr( $this->resolved_tickets ),
				)
			);

			wp_enqueue_style(
				'helpdesk-agent-dashboard',
				HELPDESK_WP_URL . 'src/agent-dashboard/app/build/index.css',
				array(),
				HELPDESKWP,
				'all'
			);
		}
	}
}

AgentDashboard::instance();
