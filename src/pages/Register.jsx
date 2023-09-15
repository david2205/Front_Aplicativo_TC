import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import connectionApi from "../configuration/axiosConfiguration"

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        document: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate()

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        connectionApi
            .post("/user/register", formData)
            .then((response) => {
                if (response.data.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Usuario registrado",
                        text: response.data.message
                    })
                    navigate("/login")
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
        <Form
            onSubmit={handleSubmit}
            className="row justify-content-center g-3 p-4"
        >
            <Form.Group controlId="name" className="col-md-4">
                <Form.Label>Nombres</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ingrese sus nombres"
                    onChange={handleChange}
                    value={formData.name}
                    name="name"
                    required
                />
            </Form.Group>

            <Form.Group controlId="lastname" className="col-md-4">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ingrese sus apellidos"
                    onChange={handleChange}
                    value={formData.lastname}
                    name="lastname"
                    required
                />
            </Form.Group>

            <Form.Group controlId="document" className="col-md-4">
                <Form.Label>Documento de Identidad</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ingrese su documento"
                    onChange={handleChange}
                    value={formData.document}
                    name="document"
                    required
                />
            </Form.Group>

            <Form.Group controlId="email" className="col-md-4">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Ingrese su correo electrónico"
                    onChange={handleChange}
                    value={formData.email}
                    name="email"
                    required
                />
            </Form.Group>

            <Form.Group controlId="password" className="col-md-4">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Ingrese su contraseña, mínimo 8 caracteres, una mayúscula, un número y un caracter especial"
                    onChange={handleChange}
                    value={formData.password}
                    name="password"
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit" className="col-md-4">
                Registrarse
            </Button>
        </Form>
    )
}
