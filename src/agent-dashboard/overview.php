<?php
/**
 * @since   1.0.1
 *
 * @package HelpDeskWP
 */

namespace HelpDeskWP;

defined( 'ABSPATH' ) || exit;

/**
 * Class OverView
 */
class OverView {

    /**
	 * Instance
	 *
	 * @var string
	 */
	private static $instance = null;

	/**
	 * Instance of the class.
	 *
	 * @since 1.0.1
	 *
	 * @access public
	 */
	public static function instance() {
		if ( self::$instance == null ) {
			self::$instance = new OverView();
		}
		return self::$instance;
	}

	/**
	 * Constructor
	 *
	 * @since 1.0.1
	 *
	 * @access private
	 */
	private function __construct() {}

	/**
	 * Returns the tickets time
	 *
	 * @since 1.0.1
	 *
	 * @access public
	 */
	public function time() {
		$tickets = get_posts(array(
			'post_type'      => 'ticket',
			'posts_per_page' => '-1'
		));
		$now = date_i18n( 'Y-m-d' );

		$times = array(
			'00' => 0,
			'01' => 0,
			'02' => 0,
			'03' => 0,
			'04' => 0,
			'05' => 0,
			'06' => 0,
			'07' => 0,
			'08' => 0,
			'09' => 0,
			'10' => 0,
			'11' => 0,
			'12' => 0,
			'13' => 0,
			'14' => 0,
			'15' => 0,
			'16' => 0,
			'17' => 0,
			'18' => 0,
			'19' => 0,
			'20' => 0,
			'21' => 0,
			'22' => 0,
			'23' => 0,
		);

        if ( $tickets ) {
            foreach ( $tickets as $ticket ) {
                $post_date = $ticket->post_date;
                $date      = explode( ' ', $post_date );
                $time      = explode( ':', $date[1] );

                if ( $date[0] === $now ) {
                    switch ( $time[0] ) {
                        case '00': {
                            ++$times['00'];
                            break;
                        }

                        case '01': {
                            ++$times['01'];
                            break;
                        }

                        case '02': {
                            ++$times['02'];
                            break;
                        }

                        case '03': {
                            ++$times['03'];
                            break;
                        }

                        case '04': {
                            ++$times['04'];
                            break;
                        }

                        case '05': {
                            ++$times['05'];
                            break;
                        }

                        case '06': {
                            ++$times['06'];
                            break;
                        }

                        case '07': {
                            ++$times['07'];
                            break;
                        }

                        case '08': {
                            ++$times['08'];
                            break;
                        }

                        case '09': {
                            ++$times['09'];
                            break;
                        }

                        case '10': {
                            ++$times['10'];
                            break;
                        }

                        case '11': {
                            ++$times['11'];
                            break;
                        }

                        case '12': {
                            ++$times['12'];
                            break;
                        }

                        case '13': {
                            ++$times['13'];
                            break;
                        }

                        case '14': {
                            ++$times['14'];
                            break;
                        }

                        case '15': {
                            ++$times['15'];
                            break;
                        }

                        case '16': {
                            ++$times['16'];
                            break;
                        }

                        case '17': {
                            ++$times['17'];
                            break;
                        }

                        case '18': {
                            ++$times['18'];
                            break;
                        }

                        case '19': {
                            ++$times['19'];
                            break;
                        }

                        case '20': {
                            ++$times['20'];
                            break;
                        }

                        case '21': {
                            ++$times['21'];
                            break;
                        }

                        case '22': {
                            ++$times['22'];
                            break;
                        }

                        case '23': {
                            ++$times['23'];
                            break;
                        }

                        default:
                            break;
                    }
                }
            }
        }

        return $times;
	}
}
