import { __ } from '@wordpress/i18n';
import { Link } from "react-router-dom";

const TopBar = () => {
    return (
        <div className="helpdesk-top-bar">
            <div className="helpdesk-name">
                <h2>{ __( 'Help Desk WP', 'helpdeskwp' ) }</h2>
            </div>
            <div className="helpdesk-menu" style={{ marginLeft: '30px' }}>
                <ul style={{ margin: 0 }}>
                    <li><a href="#"></a>
                        <Link to="/">
                            { __( 'Tickets', 'helpdeskwp' ) }
                        </Link>
                    </li>
                    <li>
                        <Link to="/settings">
                            { __( 'Settings', 'helpdeskwp' ) }
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default TopBar
