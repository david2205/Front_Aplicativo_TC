import React from 'react'
import { Navigate } from 'react-router-dom'
import { decodeToken, isExpired } from 'react-jwt'
import Swal from 'sweetalert2'
import { UserContext } from './context/UserContext'
import { useContext } from 'react'

const PrivateRoute = ({ component: Component, role }) => {
    let allowed = false
    const { setUser } = useContext(UserContext)
    let token = localStorage.getItem('token')

    if (token) {
        const isExpiredT = isExpired(token)
        const decodedToken = decodeToken(token)

        if (isExpiredT) {
            token = null
            localStorage.removeItem('token')
            setUser(null)
        } else {
            if (role) {
                if (role.find((r) => r == decodedToken?.role)) {
                    allowed = true
                }
            }
        }
    }

    if (!allowed) {
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Su sesión ha expirado, por favor vuelva a iniciar sesión',
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No tienes permisos para acceder a esta ruta',
            })
        }
    }

    return <>{allowed ? <Component /> : <Navigate to="/login" />}</>
}

export default PrivateRoute
