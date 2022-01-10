import { __ } from '@wordpress/i18n';
import Select from 'react-select';

export function Category( { onChange, category, parent, value } ) {
	let cat = [ { value: '', label: __( 'None', 'helpdeskwp' ) } ];

	{
		category &&
			category.map( ( category ) => {
				cat.push( { value: category.id, label: category.name } );
			} );
	}

	if ( parent === 'filter' ) {
		const local = JSON.parse( localStorage.getItem( 'Category' ) );

		return (
			<div>
				<p>{ __( 'Category', 'helpdeskwp' ) }</p>
				<Select
					defaultValue={ local }
					onChange={ onChange }
					options={ cat }
				/>
			</div>
		);
	}

	if ( parent === 'properties' ) {
		const content = {
			value: value.ticket_category[ 0 ],
			label: value.category,
		};
		return (
			<div>
				<p>{ __( 'Category', 'helpdeskwp' ) }</p>
				<Select
					defaultValue={ content }
					onChange={ onChange }
					options={ cat }
				/>
			</div>
		);
	}
}

export function Priority( { onChange, priority, parent, value } ) {
	let pri = [ { value: '', label: __( 'None', 'helpdeskwp' ) } ];

	{
		priority &&
			priority.map( ( priority ) => {
				pri.push( { value: priority.id, label: priority.name } );
			} );
	}

	if ( parent === 'filter' ) {
		const local = JSON.parse( localStorage.getItem( 'Priority' ) );
		return (
			<div>
				<p>{ __( 'Priority', 'helpdeskwp' ) }</p>
				<Select
					defaultValue={ local }
					onChange={ onChange }
					options={ pri }
				/>
			</div>
		);
	}

	if ( parent === 'properties' ) {
		const content = {
			value: value.ticket_priority[ 0 ],
			label: value.priority,
		};
		return (
			<div>
				<p>{ __( 'Priority', 'helpdeskwp' ) }</p>
				<Select
					defaultValue={ content }
					onChange={ onChange }
					options={ pri }
				/>
			</div>
		);
	}
}

export function Status( { onChange, status, parent, value } ) {
	let sta = [ { value: '', label: __( 'None', 'helpdeskwp' ) } ];

	{
		status &&
			status.map( ( status ) => {
				sta.push( { value: status.id, label: status.name } );
			} );
	}

	if ( parent === 'filter' ) {
		const local = JSON.parse( localStorage.getItem( 'Status' ) );
		return (
			<div>
				<p>{ __( 'Status', 'helpdeskwp' ) }</p>
				<Select
					defaultValue={ local }
					onChange={ onChange }
					options={ sta }
				/>
			</div>
		);
	}

	if ( parent === 'properties' ) {
		const content = {
			value: value.ticket_status[ 0 ],
			label: value.status,
		};
		return (
			<div>
				<p>{ __( 'Status', 'helpdeskwp' ) }</p>
				<Select
					defaultValue={ content }
					onChange={ onChange }
					options={ sta }
				/>
			</div>
		);
	}
}

export function Type( { onChange, type, parent, value } ) {
	let typ = [ { value: '', label: __( 'None', 'helpdeskwp' ) } ];

	{
		type &&
			type.map( ( type ) => {
				typ.push( { value: type.id, label: type.name } );
			} );
	}

	if ( parent === 'filter' ) {
		const local = JSON.parse( localStorage.getItem( 'Type' ) );
		return (
			<div>
				<p>{ __( 'Type', 'helpdeskwp' ) }</p>
				<Select
					defaultValue={ local }
					onChange={ onChange }
					options={ typ }
				/>
			</div>
		);
	}

	if ( parent === 'properties' ) {
		const content = { value: value.ticket_type[ 0 ], label: value.type };
		return (
			<div>
				<p>{ __( 'Type', 'helpdeskwp' ) }</p>
				<Select
					defaultValue={ content }
					onChange={ onChange }
					options={ typ }
				/>
			</div>
		);
	}
}

export function Agent( { onChange, agents, parent, value } ) {
	let agent = [ { value: '', label: __( 'None', 'helpdeskwp' ) } ];

	{
		agents &&
			agents.map( ( agents ) => {
				agent.push( { value: agents.id, label: agents.name } );
			} );
	}

	if ( parent === 'filter' ) {
		const local = JSON.parse( localStorage.getItem( 'Agent' ) );
		return (
			<div>
				<p>{ __( 'Agent', 'helpdeskwp' ) }</p>
				<Select
					defaultValue={ local }
					onChange={ onChange }
					options={ agent }
				/>
			</div>
		);
	}

	if ( parent === 'properties' ) {
		const content = { value: value.ticket_agent[ 0 ], label: value.agent };
		return (
			<div>
				<p>{ __( 'Agent', 'helpdeskwp' ) }</p>
				<Select
					defaultValue={ content }
					onChange={ onChange }
					options={ agent }
				/>
			</div>
		);
	}
}
