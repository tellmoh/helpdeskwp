import React from "react"
import { useForm } from "react-hook-form"

export function Form({ defaultValues, children, onSubmit }) {
	const { handleSubmit, register } = useForm({ defaultValues })

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{Array.isArray(children)
				? children.map((child) => {
					return child.props.name
					? React.createElement(child.type, {
						...{
							...child.props,
								register,
								key: child.props.name
							}
						})
					: child
				})
			: children}
		</form>
	)
}

export function Input({ register, name, type, ...rest }) {
	return <input {...register(name)} {...rest} type={type} />
}

export function Textarea({ register, name, ...rest }) {
	return <textarea {...register(name)} {...rest} rows="5"></textarea>
}

export function Select({ register, options, name, ...rest }) {
	return (
		<select {...register(name)} {...rest}>
			{options.map((value) => (
				<option value={value}>{value}</option>
			))}
		</select>
  	)
}
