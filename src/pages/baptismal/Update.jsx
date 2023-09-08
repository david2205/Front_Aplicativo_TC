import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import connectionApi from '../../configuration/axiosConfiguration'
import Swal from 'sweetalert2'

export default function BaptismalUpdate({ data, setEdit, setReload }) {
    const [formData, setFormData] = useState({
        book: '',
        invoice: '',
        number: '',
        name: '',
        lastname: '',
        birthdate: '',
        baptismDate: '',
        fatherName: '',
        motherName: '',
        maternalGrandfather: '',
        maternalGrandmother: '',
        paternalGrandfather: '',
        paternalGrandmother: '',
        godfather: '',
        godmother: '',
        minister: '',
        parson: '',
        annotations: '',
    })

    useEffect(() => {
        setFormData((prevState) => Object.assign({}, prevState, data))
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        connectionApi
            .put('baptism/updateBaptism', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then((response) => {
                if (response.data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Acta actualizada',
                        text: response.data.message,
                    })
                    setEdit(false)
                    setReload(true)
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
            <h2>Actualizar</h2>
            <Form.Group controlId="book" className="col-md-4">
                <Form.Label>Libro</Form.Label>
                <Form.Control
                    type="number"
                    name="book"
                    onChange={handleChange}
                    value={formData.book}
                    required
                    disabled
                />
            </Form.Group>

            <Form.Group controlId="invoice" className="col-md-4">
                <Form.Label>Folder</Form.Label>
                <Form.Control
                    type="number"
                    name="invoice"
                    onChange={handleChange}
                    value={formData.invoice}
                    required
                    disabled
                />
            </Form.Group>

            <Form.Group controlId="number" className="col-md-4">
                <Form.Label>Numero</Form.Label>
                <Form.Control
                    type="number"
                    name="number"
                    onChange={handleChange}
                    value={formData.number}
                    required
                    disabled
                />
            </Form.Group>

            <Form.Group controlId="name" className="col-md-4">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
                    required
                />
            </Form.Group>

            <Form.Group controlId="lastname" className="col-md-4">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                    type="text"
                    name="lastname"
                    onChange={handleChange}
                    value={formData.lastname}
                    required
                />
            </Form.Group>

            <Form.Group controlId="birthdate" className="col-md-2">
                <Form.Label>Fecha de nacimiento</Form.Label>
                <Form.Control
                    type="date"
                    name="birthdate"
                    onChange={handleChange}
                    value={formData.birthdate}
                    required
                />
            </Form.Group>

            <Form.Group controlId="baptismDate" className="col-md-2">
                <Form.Label>Fecha de bautismo</Form.Label>
                <Form.Control
                    type="date"
                    name="baptismDate"
                    onChange={handleChange}
                    value={formData.baptismDate}
                    required
                />
            </Form.Group>

            <Form.Group controlId="fatherName" className="col-md-6">
                <Form.Label>Nombre del padre</Form.Label>
                <Form.Control
                    type="text"
                    name="fatherName"
                    onChange={handleChange}
                    value={formData.fatherName}
                    required
                />
            </Form.Group>

            <Form.Group controlId="motherName" className="col-md-6">
                <Form.Label>Nombre de la madre</Form.Label>
                <Form.Control
                    type="text"
                    name="motherName"
                    onChange={handleChange}
                    value={formData.motherName}
                    required
                />
            </Form.Group>

            <Form.Group controlId="maternalGrandfather" className="col-md-6">
                <Form.Label>Abuela materna</Form.Label>
                <Form.Control
                    type="text"
                    name="maternalGrandfather"
                    onChange={handleChange}
                    value={formData.maternalGrandfather}
                    required
                />
            </Form.Group>

            <Form.Group controlId="maternalGrandmother" className="col-md-6">
                <Form.Label>Abuelo materno</Form.Label>
                <Form.Control
                    type="text"
                    name="maternalGrandmother"
                    onChange={handleChange}
                    value={formData.maternalGrandmother}
                    required
                />
            </Form.Group>

            <Form.Group controlId="paternalGrandfather" className="col-md-6">
                <Form.Label>Abuelo paterno</Form.Label>
                <Form.Control
                    type="text"
                    name="paternalGrandfather"
                    onChange={handleChange}
                    value={formData.paternalGrandfather}
                    required
                />
            </Form.Group>
            <Form.Group controlId="paternalGrandmother" className="col-md-6">
                <Form.Label>Abuela paterna</Form.Label>
                <Form.Control
                    type="text"
                    name="paternalGrandmother"
                    onChange={handleChange}
                    value={formData.paternalGrandmother}
                    required
                />
            </Form.Group>

            <Form.Group controlId="godfather" className="col-md-6">
                <Form.Label>Paddrino</Form.Label>
                <Form.Control
                    type="text"
                    name="godfather"
                    onChange={handleChange}
                    value={formData.godfather}
                    required
                />
            </Form.Group>

            <Form.Group controlId="godmother" className="col-md-6">
                <Form.Label>Madrina</Form.Label>
                <Form.Control
                    type="text"
                    name="godmother"
                    onChange={handleChange}
                    value={formData.godmother}
                    required
                />
            </Form.Group>

            <Form.Group controlId="minister" className="col-md-6">
                <Form.Label>Ministro</Form.Label>
                <Form.Control
                    type="text"
                    name="minister"
                    onChange={handleChange}
                    value={formData.minister}
                    required
                />
            </Form.Group>

            <Form.Group controlId="parson" className="col-md-6">
                <Form.Label>Parroco</Form.Label>
                <Form.Control
                    type="text"
                    name="parson"
                    onChange={handleChange}
                    value={formData.parson}
                    required
                />
            </Form.Group>

            <Form.Group controlId="annotations" className="col-md-12">
                <Form.Label>Anotaciones</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="annotations"
                    onChange={handleChange}
                    value={formData.annotations}
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit" className="col-md-2">
                Actualizar
            </Button>
        </Form>
    )
}
