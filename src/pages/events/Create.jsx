import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import connectionApi from '../../configuration/axiosConfiguration'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function BaptismalCreate() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: '',
        numberOfPeople: '',
        description: '',
        dateStart: '',
        dateEnd: '',
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        connectionApi
            .post('event/createEvent', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then((response) => {
                if (response.data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Evento creado',
                        text: response.data.message,
                    })
                    navigate('/event/findForDate')
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: response.data?.message,
                        text: response.data?.data?.errors,
                    })
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <Form
            onSubmit={handleSubmit}
            className="row justify-content-center g-3 p-4"
        >
            <Form.Group controlId="title" className="col-md-4">
                <Form.Label>Titulo</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="numberOfPeople" className="col-md-2">
                <Form.Label>Numero de personas</Form.Label>
                <Form.Control
                    type="number"
                    name="numberOfPeople"
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="dateStart" className="col-md-3">
                <Form.Label>Inicio del evento</Form.Label>
                <Form.Control
                    type="datetime-local"
                    name="dateStart"
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="dateEnd" className="col-md-3">
                <Form.Label>Fin del evento</Form.Label>
                <Form.Control
                    type="datetime-local"
                    name="dateEnd"
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="description" className="col-md-12">
                <Form.Label>Descripcion del evento</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit" className="col-md-2">
                Crear
            </Button>
        </Form>
    )
}
