<?php
/**
 * @since   1.2.0
 *
 * @package HelpDeskWP
 */

namespace HelpDeskWP;

defined( 'ABSPATH' ) || exit;

/**
 * Class Category Image Meta
 */
class CategoryImageMeta {

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
			self::$instance = new CategoryImageMeta();
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
        if ( ! is_admin() ) {
            return false;
        }
        add_action( 'docs_category_edit_form_fields', array( $this, 'add_image_html' ), 10, 2 );
        add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
        add_action( 'edited_docs_category', array( $this, 'save_image_meta' ), 10, 2 );
    }

	/**
	 * Edit image HTML.
	 *
	 * @since 1.2.0
	 *
	 * @access public
	 */
	public function add_image_html( $term, $taxonomy ) {

        $image_id = get_term_meta ( $term->term_id, 'cat_image_id', true );
		?>
            <tr class="form-field">
                <th scope="row">
                    <label><?php esc_html_e( 'Image', 'helpdeskwp' ); ?></label>
                </th>
                <td>
                    <input type="hidden" id="cat_image_id" name="cat_image_id" value="<?php esc_attr_e( $image_id ); ?>">
                    <div id="cat-image">
                        <?php if ( $image_id ) { ?>
                            <?php echo wp_get_attachment_image ( $image_id, 'thumbnail' ); ?>
                        <?php } ?>
                    </div>
                    <input type="button" class="button" id="image_upload" name="image_upload" value="<?php esc_html_e( 'Add Image', 'helpdeskwp' ); ?>" />
                    <input type="button" class="button" id="image_remove" name="image_remove" value="<?php esc_html_e( 'Remove Image', 'helpdeskwp' ); ?>" />
                </td>
            </tr>
        <?php
	}

	/**
	 * Save image ID in term meta
	 *
	 * @since 1.2.0
	 *
	 * @access public
	 */
    public function save_image_meta( $term_id, $tt_id ) {
        $image = sanitize_text_field( $_POST[ 'cat_image_id' ] );

        if ( isset( $image ) && '' !== $image ){
            update_term_meta ( $term_id, 'cat_image_id', $image );
        } else {
            update_term_meta ( $term_id, 'cat_image_id', '' );
        }
    }

    /**
	 * enqueue scripts
	 *
	 * @since 1.2.0
	 *
	 * @access public
	 */
    public function enqueue_scripts() {
        wp_enqueue_media();

		wp_enqueue_script(
			'helpdesk-category-image',
			HELPDESK_WP_URL . 'src/docs/image-meta/assets/image.js',
			array( 'jquery' ),
			HELPDESKWP,
			true
		);
    }
}

CategoryImageMeta::instance();
