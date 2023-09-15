import { useState } from "react"
import "../styles/login.css"
import connectionApi from "../configuration/axiosConfiguration"
import { Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { decodeToken } from "react-jwt"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const { setUser } = useContext(UserContext)

    function handleSubmit(e) {
        e.preventDefault()

        if (!email || !password) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Todos los campos son obligatorios"
            })
            return
        }

        connectionApi
            .post("/user/login", {
                email,
                password
            })
            .then((response) => {
                if (response.data.success) {
                    localStorage.setItem("token", response.data.data.token)
                    setUser(decodeToken(response.data.data.token))

                    navigate("/profile")
                    Swal.fire({
                        icon: "success",
                        title: "Bienvenido",
                        text: "Has iniciado sesion correctamente"
                    })
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: response.data.message
                    })
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <>
            <Form
                onSubmit={handleSubmit}
                className="row justify-content-center g-3 p-4 d-flex justify-content-center"
            >
                <h2>Autenticarse</h2>
                <Form.Group controlId="email" className="col-md-6">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="password" className="col-md-6">
                    <Form.Label>Contraseña:</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit" className="col-md-3">Iniciar sesion</Button>
            </Form>
        </>
    )
}
