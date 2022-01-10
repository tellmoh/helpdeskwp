import { useState, useEffect } from 'react';
import TopBar from './TopBar';
import axios from 'axios';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

const Overview = () => {
	const [ time, setTime ] = useState( null );
	const obj = helpdesk_agent_dashboard;

	const fetchTimes = async () => {
		const url = `${ helpdesk_agent_dashboard.url }helpdesk/v1/settings/overview`;

		const config = {
			headers: {
				'X-WP-Nonce': helpdesk_agent_dashboard.nonce,
				'Content-Type': 'application/json',
			},
		};

		let data;
		await axios.get( url, config ).then( ( res ) => {
			data = res.data;
		} );

		return data;
	};

	const getTime = async () => {
		const time = await fetchTimes();
		setTime( time );
	};

	useEffect( () => {
		getTime();
	}, [] );

	ChartJS.register(
		CategoryScale,
		LinearScale,
		PointElement,
		LineElement,
		Title,
		Tooltip,
		Legend
	);

	const options = {
		responsive: true,
		interaction: {
			mode: 'index',
			intersect: false,
		},
		plugins: {
			title: {
				display: true,
				text: 'Today',
			},
		},
		scales: {
			y: {
				ticks: {
					display: false,
				},
			},
		},
	};

	const labels = [
		'00',
		'01',
		'02',
		'03',
		'04',
		'05',
		'06',
		'07',
		'08',
		'09',
		'10',
		'11',
		'12',
		'13',
		'14',
		'15',
		'16',
		'17',
		'18',
		'19',
		'20',
		'21',
		'22',
		'23',
	];

	const data = {
		labels,
		datasets: [
			{
				label: 'Ticket',
				data: time,
				borderColor: '#0051af',
				backgroundColor: '#0051af',
				fill: false,
			},
		],
	};

	return (
		<div className="helpdesk-main overview-wrap">
			<div className="helpdesk-overview hdw-box">
				<div className="hdw-box-in">Open { obj.open_tickets }</div>
			</div>
			<div className="helpdesk-overview hdw-box">
				<div className="hdw-box-in">Closed { obj.close_tickets }</div>
			</div>
			<div className="helpdesk-overview hdw-box">
				<div className="hdw-box-in">
					Pending { obj.pending_tickets }
				</div>
			</div>
			<div className="helpdesk-overview hdw-box">
				<div className="hdw-box-in">
					Resolved { obj.resolved_tickets }
				</div>
			</div>
			<div className="helpdesk-overview">
				{ time && <Line options={ options } data={ data } /> }
			</div>
		</div>
	);
};

export default Overview;
