import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import connectionApi from "../../configuration/axiosConfiguration"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

export default function ConfirmationCreate() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        book: "",
        invoice: "",
        number: "",
        name: "",
        lastname: "",
        birthdate: "",
        confirmationDate: "",
        fatherName: "",
        motherName: "",
        placeBaptism:"",
        godfather:"",
        minister: "",
        parson: "",
        annotations: ""
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        connectionApi
            .post("confirmation/addConfirmation", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then((response) => {
                if (response.data.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Acta creada",
                        text: response.data.message
                    })
                    navigate("/confirmation/find")
                } else {
                    Swal.fire({
                        icon: "error",
                        title: response.data?.message,
                        text: response.data?.data?.errors
                    })
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <Form onSubmit={handleSubmit} className="row justify-content-center g-3 p-4">
            <h2>Crear acta de confirmacion</h2>
            <Form.Group controlId="book" className="col-md-4">
                <Form.Label>Libro</Form.Label>
                <Form.Control
                    type="number"
                    name="book"
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="invoice" className="col-md-4">
                <Form.Label>Folder</Form.Label>
                <Form.Control
                    type="number"
                    name="invoice"
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="number" className="col-md-4">
                <Form.Label>Numero</Form.Label>
                <Form.Control
                    type="number"
                    name="number"
                    onChange={handleChange}
                    required
                />
            </Form.Group>

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

            <Form.Group controlId="birthdate" className="col-md-2">
                <Form.Label>Fecha de nacimiento</Form.Label>
                <Form.Control
                    type="date"
                    name="birthdate"
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="confirmationDate" className="col-md-2">
                <Form.Label>Fecha de confirmacion</Form.Label>
                <Form.Control
                    type="date"
                    name="confirmationDate"
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="fatherName" className="col-md-6">
                <Form.Label>Nombre del padre</Form.Label>
                <Form.Control
                    type="text"
                    name="fatherName"
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="motherName" className="col-md-6">
                <Form.Label>Nombre de la madre</Form.Label>
                <Form.Control
                    type="text"
                    name="motherName"
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="placeBaptism" className="col-md-6">
                <Form.Label>Lugar de bautismo</Form.Label>
                <Form.Control
                    type="text"
                    name="placeBaptism"
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            

            <Form.Group controlId="godfather" className="col-md-6">
                <Form.Label>Padrino</Form.Label>
                <Form.Control
                    type="text"
                    name="godfather"
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="minister" className="col-md-6">
                <Form.Label>Ministro</Form.Label>
                <Form.Control
                    type="text"
                    name="minister"
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="parson" className="col-md-6">
                <Form.Label>Parroco</Form.Label>
                <Form.Control
                    type="text"
                    name="parson"
                    onChange={handleChange}
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
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit" className="col-md-2">
                Crear
            </Button>
        </Form>
    )
}
