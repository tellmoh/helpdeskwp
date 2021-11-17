import { useContext, useState } from 'react'
import { TicketContext } from '../contexts/TicketContext'
import {
    Input,
    Select,
    Textarea
} from './Components'


const AddTicket = () => {
    const [title, setTitle] = useState([])
    const [cat, setCat] = useState([])
    const [typ, setType] = useState([])
    const [desc, setDesc] = useState([])
    const [pictures, setPictures] = useState([])

    const {
        createTicket,
        type,
        category,
    } = useContext(TicketContext)

    const types = type.map((type) => {
        return type.name
    })

    const categories = category.map((category) => {
        return category.name
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        let formData = new FormData();
        formData.append("title", title);
        formData.append("category", cat);
        formData.append("type", typ);
        formData.append("description", desc);
        formData.append("media", pictures);

        createTicket(formData)
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleCategoryChange = (e) => {
        setCat(e.target.value)
    }

    const handleTypeChange = (e) => {
        setType(e.target.value)
    }

    const handleDescChange = (e) => {
        setDesc(e.target.value)
    }

    const handlePicturesChange = (e) => {
        setPictures(e.target.files[0])
    }

    return (
        <form className="helpdesk-add-ticket" onSubmit={handleSubmit}>
            <h4>Submit a ticket</h4>

            <p>Subject</p>
            <Input name="title" type="text" onChange={handleTitleChange} />

            <p>Category</p>
            <Select name="category" options={categories} onChange={handleCategoryChange} />

            <p>Type</p>
            <Select name="type" options={types} onChange={handleTypeChange} />

            <p>Description</p>
            <Textarea name="description" onChange={handleDescChange} />

            <p>Media</p>
            <Input type="file" onChange={handlePicturesChange} />

            <Input type="submit" />
        </form>
    )
}

export default AddTicket
