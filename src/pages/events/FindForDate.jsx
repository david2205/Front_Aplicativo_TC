import { useEffect, useState } from 'react'
import { Form, Button, Accordion } from 'react-bootstrap'
import connectionApi from '../../configuration/axiosConfiguration'
import Swal from 'sweetalert2'

import ButtonRequest from '../../components/ButtonRequest'
import ButtonDelete from '../../components/ButtonDelete'

export default function ConfirmationFind() {
    const [update, setUpdate] = useState(false)
    const [description, setDescription] = useState('')
    useEffect(() => {
        if (update) {
            findData()
            setUpdate(false)
        }
    }, [update])

    const [data, setData] = useState([])

    const [date, setDate] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        findData()
    }

    function findData() {
        connectionApi
            .get(`/event/getEvents/${date}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then((response) => {
                if (response.data.success) {
                    setData(response.data.data)
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
            <Form
                onSubmit={handleSubmit}
                className="row justify-content-center g-3 p-4"
            >
                <h2>Buscar Eventos</h2>
                <Form.Group controlId="date" className="col-md-12">
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control
                        type="date"
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="col-md-11">
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
                                        {item.title}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div>
                                            <b>Fecha de inicio </b>
                                            {item.dateStart.split('T')[0] +
                                                ' Hora: ' +
                                                item.dateStart
                                                    .split('T')[1]
                                                    .split('.')[0]}
                                        </div>
                                        <div>
                                            <b>Fecha de fin </b>
                                            {item.dateEnd.split('T')[0] +
                                                ' Hora: ' +
                                                item.dateEnd
                                                    .split('T')[1]
                                                    .split('.')[0]}
                                        </div>
                                        <div>
                                            <b>Cupos </b>
                                            {item.numberOfPeople - item.Users}
                                        </div>
                                        <div>
                                            <b>Descripción: </b>
                                            {item.description0}
                                        </div>
                                        {!item.registered ? (
                                            <div>
                                                {item.numberOfPeople == 1 ? (
                                                    <input
                                                        type="text"
                                                        placeholder="Intención"
                                                        value={description}
                                                        onChange={(e) =>
                                                            setDescription(
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                ) : (
                                                    <></>
                                                )}
                                                <br />
                                                <br />
                                                <ButtonRequest
                                                    update={setUpdate}
                                                    id={item.id}
                                                    description={description}
                                                    setDescription={
                                                        setDescription
                                                    }
                                                />
                                            </div>
                                        ) : (
                                            <div>
                                                <ButtonDelete
                                                    update={setUpdate}
                                                    id={item.id}
                                                />
                                            </div>
                                        )}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        )
                    })}
                </>
            )}
        </>
    )
}
