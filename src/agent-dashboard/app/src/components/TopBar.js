import { Link } from "react-router-dom";

const TopBar = () => {
    return (
        <div className="helpdesk-top-bar">
            <div className="helpdesk-name">
                <h2>Help Desk WP</h2>
            </div>
            <div className="helpdesk-menu" style={{ marginLeft: '30px' }}>
                <ul style={{ margin: 0 }}>
                    <li><a href="#"></a>
                        <Link to="/">
                            Tickets
                        </Link>
                    </li>
                    <li>
                        <Link to="/settings">
                            Settings
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default TopBar
