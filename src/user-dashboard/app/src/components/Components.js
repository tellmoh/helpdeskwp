export function Input({ name, type, onChange }) {
	return <input name={name} type={type} onChange={onChange} />
}

export function Textarea({ name, onChange }) {
	return <textarea name={name} onChange={onChange} rows="5"></textarea>
}

export function Select({ options, name, onChange }) {
	return (
		<select name={name} onChange={onChange}>
			{options.map((value, index) => (
				<option key={index} value={value}>{value}</option>
			))}
		</select>
  	)
}
