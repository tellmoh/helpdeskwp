import { useContext } from 'react'
import { TicketContext } from '../contexts/TicketContext'
import { Form, Input, Select, Textarea } from './Components'

const AddTicket = () => {

    const { createTicket, type, category } = useContext(TicketContext)
    const onSubmit = (data) => createTicket(data);

    const types = type.map((type) => {
        return type.name
    })

    const categories = category.map((category) => {
        return category.name
    })

    return (
        <Form className="helpdesk-add-ticket" onSubmit={onSubmit}>
            <h4>Submit a ticket</h4>

            <span>Subject</span>
            <Input name="title" type="text" />

            <span>Category</span>
            <Select name="category" options={categories} />

            <span>Type</span>
            <Select name="type" options={types} />

            <span>Description</span>
            <Textarea name="description" />

            <button>Submit</button>
        </Form>
    )
}

export default AddTicket
