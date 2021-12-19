import { useContext, useState } from 'react'
import { TicketContext } from '../contexts/TicketContext'
import { Outlet, Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextEditor from '../components/editor/Editor';
import {
    Input,
    SelectOptions,
} from '../components/Components'

const InputMedia = styled('input')({
    display: 'none',
});

const AddTicket = () => {
    const [title, setTitle] = useState([])
    const [cat, setCat] = useState([])
    const [typ, setType] = useState([])
    const [desc, setDesc] = useState([])

    const {
        createTicket,
        type,
        category,
    } = useContext(TicketContext)

    let catItems = [];
    category.map((category) => {
        catItems.push({ value: category.id, label: category.name });
    })

    let types = [];
    type.map((type) => {
        types.push({ value: type.id, label: type.name });
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        const pictures = document.getElementById("helpdesk-pictures")
        const fileLength = pictures.files.length
        const files = pictures

        let formData = new FormData();
        formData.append("title", title);
        formData.append("category", cat.label);
        formData.append("type", typ.label);
        formData.append("description", desc);

        for ( let i = 0; i < fileLength; i++ ) {
            formData.append("pictures[]", pictures.files[i]);
        }

        createTicket(formData)
        setTitle([])
        setDesc([])
        document.querySelector(".helpdesk-editor .ProseMirror").innerHTML = '';
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleCategoryChange = (category) => {
        setCat(category)
    }

    const handleTypeChange = (type) => {
        setType(type)
    }

    const handleDescChange = (html) => {
        setDesc(html)
    }

    return (
        <>
            <Link to="/">
                <span className="helpdesk-back primary">Back</span>
            </Link>
            <form className="helpdesk-add-ticket" onSubmit={handleSubmit}>
                <h4>Submit a ticket</h4>

                <p>Subject</p>
                <Input name="title" type="text" onChange={handleTitleChange} value={title} inputClass={'form-ticket-title'} />

                <div className="form-ticket-select">
                    <div className="helpdesk-w-50" style={{ paddingRight: '10px' }}>
                        <p>Category</p>
                        <SelectOptions options={catItems} onChange={handleCategoryChange} />
                    </div>

                    <div className="helpdesk-w-50" style={{ paddingLeft: '10px' }}>
                        <p>Type</p>
                        <SelectOptions options={types} onChange={handleTypeChange} />
                    </div>
                </div>

                <p>Description</p>
                <TextEditor onChange={handleDescChange} />

                <div className="helpdesk-w-50" style={{ paddingRight: '10px' }}>
                    <p>Image</p>
                    <label htmlFor="helpdesk-pictures">
                        <InputMedia accept="image/*" id="helpdesk-pictures" type="file" multiple />
                        <Button variant="contained" component="span" className="helpdesk-upload">Upload</Button>
                    </label>
                </div>

                <div className="helpdesk-w-50" style={{ paddingRight: '10px' }}>
                    <div className="helpdesk-submit">
                        <Input type="submit" />
                    </div>
                </div>
            </form>
            <Outlet />
        </>
    )
}

export default AddTicket
