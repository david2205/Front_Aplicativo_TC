import { useState, useEffect } from 'react'
import { Form, Button, Accordion } from 'react-bootstrap'
import connectionApi from '../../configuration/axiosConfiguration'
import ButtonDelete from '../../components/ButtonDelete'
import ButtonUpdate from '../../components/ButtonUpdate'
import MarriageUpdate from './Update'
import Swal from 'sweetalert2'

export default function marriageFind() {
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
                `marriage/getMarriageToNameLastname/${formData.name}/${formData.lastname}`,
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
                    setData(response.data.data.marriage)
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
                <MarriageUpdate
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
                        <h2>Buscar acta de Matrimonio</h2>
                        <Form.Group controlId="name" className="col-md-6">
                            <Form.Label>Nombre Esposo</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="lastname" className="col-md-6">
                            <Form.Label>Apellido Esposo</Form.Label>
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
                                                {item.namehusband +
                                                    ' ' +
                                                    item.lastnamehusband}
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
                                                    <b>Nombre(s) esposo: </b>
                                                    {item.namehusband}
                                                </div>
                                                <div>
                                                    <b>Apellido(s) esposo: </b>
                                                    {item.lastnamehusband}
                                                </div>
                                                <div>
                                                    <b>Fecha de matrimonio: </b>
                                                    {item.marrierdate}
                                                </div>
                                                <div>
                                                    <b>Padre Esposo: </b>
                                                    {item.fatherhusband}
                                                </div>
                                                <div>
                                                    <b>Madre Esposo: </b>
                                                    {item.motherhusband}
                                                </div>
                                                <div>
                                                    <b>Lugar Bautismo: </b>
                                                    {item.placebatptismhusband}
                                                </div>
                                                <div>
                                                    <b>Fecha bautismo: </b>
                                                    {item.datebatptismhusband}
                                                </div>
                                                <div>
                                                    <b>Nombre de la esposa: </b>
                                                    {item.namewife}
                                                </div>
                                                <div>
                                                    <b>
                                                        apellido de la esposa:{' '}
                                                    </b>
                                                    {item.lastnamewife}
                                                </div>
                                                <div>
                                                    <b>Padre de la esposa: </b>
                                                    {item.fatherwife}
                                                </div>
                                                <div>
                                                    <b>Madre de la esposa: </b>
                                                    {item.motherwife}
                                                </div>
                                                <div>
                                                    <b>Lugar de bautismo: </b>
                                                    {item.placebatptismwife}
                                                </div>
                                                <div>
                                                    <b>Fecha de bautismo: </b>
                                                    {item.datebatptismwife}
                                                </div>
                                                <div>
                                                    <b>Testigo: </b>
                                                    {item.namewitness}
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
                                                        'marriage/deleteMarriage'
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
