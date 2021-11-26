import Select from 'react-select';

export function Input({ name, type, onChange, value }) {
	return <input name={name} type={type} onChange={onChange} value={value} required />
}

export function Textarea({ name, onChange }) {
	return <textarea name={name} onChange={onChange} rows="5"></textarea>
}

export function SelectOptions({ options, onChange }) {
	return (
		<Select
			// defaultValue={local}
			onChange={onChange}
			options={options}
		/>
  	)
}
