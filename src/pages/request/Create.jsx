import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import connectionApi from '../../configuration/axiosConfiguration'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function RequestCreate() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        type: '',
        name: '',
        lastname: '',
        birthdate: '',
        fatherName: '',
        motherName: '',
        godfather: '',
        namehusband: '',
        lastnamehusband: '',
        namewife: '',
        lastnamewife: '',
        marrierdate: '',
        motherwife: '',
        motherhusband: '',
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        let url = '/request'

        if (formData.type == 'CONFIRMACION') {
            url += '/createRequest/confirmation'
        } else if (formData.type == 'BAUTISMO') {
            url += '/createRequest/baptism'
        } else if (formData.type == 'MATRIMONIO') {
            url += '/createRequest/marriage'
        }

        connectionApi
            .post(url, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then((response) => {
                if (response.data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Solicitud creada',
                        text: response.data.message,
                    })
                    navigate('/profile')
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
            <Form.Group controlId="type" className="col-md-4">
                <Form.Label>Tipo de acta</Form.Label>
                <Form.Select name="type" onChange={handleChange} required>
                    <option value="">Seleccione una opción</option>
                    <option value="BAUTISMO">Bautismo</option>
                    <option value="CONFIRMACION">Confirmacion</option>
                    <option value="MATRIMONIO">Matrimonio</option>
                </Form.Select>
            </Form.Group>

            {formData.type != 'MATRIMONIO' ? (
                <>
                    <Form.Group controlId="name" className="col-md-4">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="lastname" className="col-md-4">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastname"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="birthdate" className="col-md-4">
                        <Form.Label>Fecha de nacimiento</Form.Label>
                        <Form.Control
                            type="date"
                            name="birthdate"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="fatherName" className="col-md-4">
                        <Form.Label>Nombre del padre</Form.Label>
                        <Form.Control
                            type="text"
                            name="fatherName"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="motherName" className="col-md-4">
                        <Form.Label>Nombre de la madre</Form.Label>
                        <Form.Control
                            type="text"
                            name="motherName"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="godfather" className="col-md-4">
                        <Form.Label>Padrino</Form.Label>
                        <Form.Control
                            type="text"
                            name="godfather"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        className="col-md-9"
                    >
                        Solicitar acta
                    </Button>
                </>
            ) : (
                <>
                    <Form.Group controlId="namehusband" className="col-md-4">
                        <Form.Label>Nombre Esposo</Form.Label>
                        <Form.Control
                            type="text"
                            name="namehusband"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group
                        controlId="lastnamehusband"
                        className="col-md-4"
                    >
                        <Form.Label>Apellido Esposo</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastnamehusband"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="namewife" className="col-md-4">
                        <Form.Label>Nombre Esposa</Form.Label>
                        <Form.Control
                            type="text"
                            name="namewife"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="lastnamewife" className="col-md-4">
                        <Form.Label>Apellido Esposa</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastnamewife"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="marrierdate" className="col-md-4">
                        <Form.Label>Fecha del matrimonio</Form.Label>
                        <Form.Control
                            type="date"
                            name="marrierdate"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="motherwife" className="col-md-4">
                        <Form.Label>Nombre de la madre del esposo</Form.Label>
                        <Form.Control
                            type="text"
                            name="motherwife"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="motherhusband" className="col-md-4">
                        <Form.Label>Nombre de la madre de la esposa</Form.Label>
                        <Form.Control
                            type="text"
                            name="motherhusband"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        className="col-md-9"
                    >
                        Solicitar acta
                    </Button>
                </>
            )}
        </Form>
    )
}
