import { useState, useEffect } from 'react'
import { Form, Button, Accordion } from 'react-bootstrap'
import connectionApi from '../../configuration/axiosConfiguration'
import ButtonDelete from '../../components/ButtonDelete'
import ButtonUpdate from '../../components/ButtonUpdate'
import ConfirmationUpdate from './Update'
import Swal from 'sweetalert2'

export default function ConfirmationFind() {
    const [data, setData] = useState([])
    const [edit, setEdit] = useState(false)
    const [dataModify, setDataModify] = useState(null)
    const [reload, setReload] = useState(false)

    useEffect(() => {
        if (reload) {
            findData()
            setReload(false)
        }
    }, [reload])

    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        findData()
    }

    function findData() {
        connectionApi
            .get(
                `confirmation/getConfirmToNameLastname/${formData.name}/${formData.lastname}`,
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
                    setData(response.data.data.confirmation)
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
            {edit ? (
                <ConfirmationUpdate
                    data={dataModify}
                    setEdit={setEdit}
                    setReload={setReload}
                />
            ) : (
                <>
                    <Form
                        onSubmit={handleSubmit}
                        className="row justify-content-center g-3 p-4"
                    >
                        <h2>Buscar acta de confirmacion</h2>
                        <Form.Group controlId="name" className="col-md-6">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="lastname" className="col-md-6">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            className="col-md-11"
                        >
                            Buscar
                        </Button>
                    </Form>

                    {!data.length ? (
                        <h2>No se encontraron datos</h2>
                    ) : (
                        <>
                            <h2>Resultados: </h2>
                            {data.map((item, i) => {
                                return (
                                    <Accordion key={i}>
                                        <Accordion.Item eventKey={i}>
                                            <Accordion.Header>
                                                Nombre:{' '}
                                                {item.name +
                                                    ' ' +
                                                    item.lastname}
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <div>
                                                    <b>Libro: </b>
                                                    {item.book}
                                                </div>
                                                <div>
                                                    <b>Folio: </b>
                                                    {item.invoice}
                                                </div>
                                                <div>
                                                    <b>Numero: </b>
                                                    {item.number}
                                                </div>
                                                <div>
                                                    <b>Nombre(s): </b>
                                                    {item.name}
                                                </div>
                                                <div>
                                                    <b>Apellido(s): </b>
                                                    {item.lastname}
                                                </div>
                                                <div>
                                                    <b>Fecha de nacimiento: </b>
                                                    {item.birthdate}
                                                </div>
                                                <div>
                                                    <b>
                                                        Fecha de confirmacion:{' '}
                                                    </b>
                                                    {item.confirmationDate}
                                                </div>
                                                <div>
                                                    <b>Nombre del padre: </b>
                                                    {item.fatherName}
                                                </div>
                                                <div>
                                                    <b>Nombre de la madre: </b>
                                                    {item.motherName}
                                                </div>
                                                <div>
                                                    <b>
                                                        Lugar de confirmacion:{' '}
                                                    </b>
                                                    {item.placeBaptism}
                                                </div>
                                                <div>
                                                    <b>Padrino: </b>
                                                    {item.godfather}
                                                </div>

                                                <div>
                                                    <b>Ministro: </b>
                                                    {item.minister}
                                                </div>
                                                <div>
                                                    <b>Parroco: </b>
                                                    {item.parson}
                                                </div>
                                                <div>
                                                    <b>Anotaciones: </b>
                                                    {item.annotations}
                                                </div>
                                                <ButtonDelete
                                                    url={
                                                        'confirmation/deleteConfirmation'
                                                    }
                                                    book={item.book}
                                                    invoice={item.invoice}
                                                    number={item.number}
                                                    setReload={setReload}
                                                />
                                                <ButtonUpdate
                                                    changeUpdate={setEdit}
                                                    data={item}
                                                    setDataModify={
                                                        setDataModify
                                                    }
                                                />
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                )
                            })}
                        </>
                    )}
                </>
            )}
        </>
    )
}
