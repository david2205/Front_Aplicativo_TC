import connectionApi from "../configuration/axiosConfiguration"
import { useEffect, useState } from "react"

export default function Profile() {
    const [user, setUser] = useState()

    useEffect(() => {
        connectionApi
            .get("/user/profile", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then((response) => {
                setUser(response.data.data.user)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    return (
        <>
            <h1>Perfil</h1>
            <h5>Nombre(s):</h5>
            {user?.name}
            <h5>Apellido(s):</h5>
            {user?.lastname}
            <h5>Documento:</h5>
            {user?.document}
            <h5>Correo:</h5>
            {user?.email}
            <h5>Contraseña:</h5>
            {user?.password ? "Si" : "No"}
        </>
    )
}
