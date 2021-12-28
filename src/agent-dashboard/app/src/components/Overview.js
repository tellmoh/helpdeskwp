import TopBar from "./TopBar";

const Overview = () => {
    const data = helpdesk_agent_dashboard

    return (
        <div>
            <TopBar />
            <div className="helpdesk-main">
                <div className="helpdesk-overview hdw-box">
                    <div className="hdw-box-in">
                        Open { data.open_tickets }
                    </div>
                </div>
                <div className="helpdesk-overview hdw-box">
                    <div className="hdw-box-in">
                        Closed { data.close_tickets }
                    </div>
                </div>
                <div className="helpdesk-overview hdw-box">
                    <div className="hdw-box-in">
                        Pending { data.pending_tickets }
                    </div>
                </div>
                <div className="helpdesk-overview hdw-box">
                    <div className="hdw-box-in">
                        Resolved { data.resolved_tickets }
                    </div>
                </div>
                <div className="helpdesk-overview">
                </div>
            </div>
        </div>
    )
}

export default Overview
