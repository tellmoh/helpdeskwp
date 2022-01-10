import { __ } from '@wordpress/i18n';
import Select from 'react-select';

export function Category( { onChange, category, value } ) {
	let cat = [];

	{
		category &&
			category.map( ( category ) => {
				cat.push( { value: category.id, label: category.name } );
			} );
	}

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

export function Status( { onChange, status, value } ) {
	let sta = [];

	{
		status &&
			status.map( ( status ) => {
				sta.push( { value: status.id, label: status.name } );
			} );
	}

	const content = { value: value.ticket_status[ 0 ], label: value.status };
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

export function Type( { onChange, type, value } ) {
	let typ = [];

	{
		type &&
			type.map( ( type ) => {
				typ.push( { value: type.id, label: type.name } );
			} );
	}

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
