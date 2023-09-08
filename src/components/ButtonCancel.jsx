import { Button } from 'react-bootstrap'

export default function Button({ txt, variant, update, url, id }) {
    const handleClick = () => {
        connectionApi
            .get(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then((response) => {
                if (response.data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: response.data?.message,
                    })
                    update(true)
                } else {
                    setData([])
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
        <Button variant={variant} onClick={handleClick}>
            {txt}
        </Button>
    )
}
