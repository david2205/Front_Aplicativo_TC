import { Button } from 'react-bootstrap'
import connectionApi from '../configuration/axiosConfiguration'
import Swal from 'sweetalert2'

export default function ButtonDelete({ id, update }) {
    const handleClick = () => {
        connectionApi
            .put(
                '/event/cancelRequest',
                { id },
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
                    update(true)
                    Swal.fire({
                        icon: 'success',
                        title: 'Solicitud cancelada',
                        text: response.data.message,
                    })
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
        <Button variant="danger" onClick={handleClick}>
            Cancelar
        </Button>
    )
}
