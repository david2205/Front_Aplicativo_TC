import { useState } from 'react'
import { Button } from 'react-bootstrap'
import connectionApi from '../configuration/axiosConfiguration'
import Swal from 'sweetalert2'

export default function ButtonRequest({
    update,
    id,
    description,
    setDescription,
}) {
    const handleClick = () => {
        connectionApi
            .post(
                '/event/requestEvent',
                { id, description },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token',
                        )}`,
                    },
                },
            )
            .then((response) => {
                if (response.data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: response.data?.message,
                    })
                    setDescription('')
                    update(true)
                } else {
                    Swal.fire({
                        icon: 'question',
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
        <Button variant="primary" onClick={handleClick}>
            Solicitar
        </Button>
    )
}
