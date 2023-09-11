import { Form, Button, Table } from 'react-bootstrap'
import connectionApi from '../../configuration/axiosConfiguration'
import Swal from 'sweetalert2'
import { useState } from 'react'
import { useEffect } from 'react'
import RequestPrint from './Print'

export default function requestFindForDate() {
    const [date, setDate] = useState('')
    const [data, setData] = useState([])
    const [certificateToPrint, setCertificateToPrint] = useState({})
    const [certificateTypeToPrint, setCertificateTypeToPrint] = useState('')
    const [windowPrint, setWindowPrint] = useState(false)

    useEffect(() => {
        setDate(new Date().toISOString().split('T')[0])
    }, [])

    function getCertificate(certificate, type) {
        let url = ''
        if (type == 'CONFIRMACION') {
            url = `/confirmation/getConfirmationToBookInvoiceNumber/${certificate.book}/${certificate.invoice}/${certificate.number}`
        } else if (type == 'BAUTISMO') {
            url = `/baptism/getBaptismToBookInvoiceNumber/${certificate.book}/${certificate.invoice}/${certificate.number}`
        } else if (type == 'MATRIMONIO') {
            url = `/marriage/getMarriageToBookInvoiceNumber/${certificate.book}/${certificate.invoice}/${certificate.number}`
        }

        connectionApi
            .get(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then((response) => {
                if (response.data.success) {
                    if (type == 'CONFIRMACION') {
                        setCertificateToPrint(response.data.data.confirmation)
                    } else if (type == 'BAUTISMO') {
                        setCertificateToPrint(response.data.data.baptism)
                    } else if (type == 'MATRIMONIO') {
                        setCertificateToPrint(response.data.data.marriage)
                    }
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }

    function findData() {
        connectionApi
            .get(`/request/getRequestsForDay/${date}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then((response) => {
                if (response.data.success) {
                    setData(response.data.data.find)
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
        <>
            {windowPrint ? (
                <RequestPrint
                    certificate={certificateToPrint}
                    type={certificateTypeToPrint}
                    windowPrint={setWindowPrint}
                />
            ) : (
                <>
                    <Form className="row justify-content-center g-3 p-4 d-flex justify-content-center">
                        <Form.Group controlId="date" className="col-md-8">
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Ingrese la fecha"
                                onChange={(e) => setDate(e.target.value)}
                                value={date}
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            onClick={findData}
                            className="col-md-4"
                        >
                            Buscar
                        </Button>
                    </Form>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nombre del usuario</th>
                                <th>Libro</th>
                                <th>Folio</th>
                                <th>Numero</th>
                                <th>Tipo</th>
                                <th>Estatus</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.User.name}</td>
                                    <td>{item.book}</td>
                                    <td>{item.invoice}</td>
                                    <td>{item.number}</td>
                                    <td>{item.type}</td>
                                    <td>
                                        {item.status == 'PENDING'
                                            ? 'Pendiente'
                                            : 'Entregada'}
                                    </td>
                                    <td>
                                        <Button
                                            variant="primary"
                                            onClick={(e) => {
                                                getCertificate(item, item.type)
                                                setCertificateTypeToPrint(
                                                    item.type,
                                                )
                                                setWindowPrint(true)
                                            }}
                                        >
                                            Imprimir
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        </>
    )
}
