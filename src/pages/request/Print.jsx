import { Button, Form } from 'react-bootstrap'
import escudoDiocesis from '../../images/escudoDiocesis.jpeg'
import { useState, useEffect } from 'react'
import './print.css'

export default function RequestPrint({ certificate, type, windowPrint }) {
    const [date, setDate] = useState('')
    const [parroco, setParroco] = useState('')

    useEffect(() => {
        setDate(new Date().toISOString().split('T')[0])
    }, [])

    function edad(birthdate) {
        // Fecha actual
        let fechaActual = new Date()
        let fechaNacimiento = new Date(birthdate)
        // Cálculo de la edad
        let edad = Math.floor(
            (fechaActual - fechaNacimiento) / (365.25 * 24 * 60 * 60 * 1000),
        )
        return edad
    }

    return (
        <>
            <div className="cer">
                <div className="cer_top">
                    <div className="cer_escudo">
                        <img src={escudoDiocesis} alt="Escudo Disocesis" />
                    </div>
                    <div className="cer_titles">
                        <div className="cer_titleAll">
                            DIOCESIS DE DUITAMA - SOGAMOSO
                        </div>
                        <div className="cer_subtitle">
                            Gobierno Eclesiastico
                        </div>
                        <div className="cer_nit">NIT. 891.800.324-7</div>
                        <div className="cer_nameChurch">
                            PARROQUIA DIVINO NIÑO JESUS
                        </div>
                        <div className="cer_nitChurch">NIT. 800.117.796-1</div>
                    </div>
                </div>

                <div className="cer_top2">
                    <div className="cer_name">CERTIFICADO DE {type}</div>
                    <div className="cer_bookInvoiceNumber">
                        LIBRO: {certificate.book} <br />
                    </div>
                    <div className="cer_bookInvoiceNumber">
                        FOLIO: {certificate.invoice} <br />
                    </div>
                    <div className="cer_bookInvoiceNumber">
                        NUMERO: {certificate.number} <br />
                    </div>
                </div>

                {type == 'CONFIRMACION' ? (
                    <>
                        <div className="cer_body">
                            <span>Nombres y apellidos: </span>
                            {certificate.name + ' ' + certificate.lastname}{' '}
                            <br />
                            <span>Edad:{}</span> {edad(certificate.birthdate)}{' '}
                            <br />
                            <span>Nombre de los padres:</span>{' '}
                            {certificate.fatherName +
                                ' y ' +
                                certificate.motherName}{' '}
                            <br />
                            <span>Bautizado en: </span>
                            {certificate.placeBaptism} <br />
                            <span>Fecha de confirmacion: </span>
                            {certificate.confirmationDate} <br />
                            <span>Padrino:</span> {certificate.godfather} <br />
                            <span>Ministro: </span>
                            {certificate.minister} <br />
                            <span> Parroco: </span>
                            {certificate.parson} <br /> <br />
                            <span> ANOTACIONES: </span>
                            {certificate.annotations}
                        </div>
                    </>
                ) : (
                    <></>
                )}

                {type == 'BAUTISMO' ? (
                    <>
                        <div className="cer_body">
                            <span>Nombres y apellidos: </span>
                            {certificate.name + ' ' + certificate.lastname}{' '}
                            <br />
                            <span>Fecha de nacimiento:</span>{' '}
                            {certificate.birthdate} <br />
                            <span>Fecha de bautismo: </span>
                            {certificate.baptismDate} <br />
                            <span>Nombre de los padres:</span>{' '}
                            {certificate.fatherName +
                                ' y ' +
                                certificate.motherName}{' '}
                            <br />
                            <span>Abuelos paternos:</span>{' '}
                            {certificate.paternalGrandfather +
                                ' y ' +
                                certificate.paternalGrandmother}{' '}
                            <br />
                            <span>Abuelos maternos:</span>{' '}
                            {certificate.maternalGrandfather +
                                ' y ' +
                                certificate.maternalGrandmother}{' '}
                            <br />
                            <span>Padrinos:</span>{' '}
                            {certificate.godfather +
                                ' y ' +
                                certificate.godmother}{' '}
                            <br />
                            <span>Ministro: </span>
                            {certificate.minister} <br />
                            <span> Parroco: </span>
                            {certificate.parson} <br /> <br />
                            <span> ANOTACIONES: </span>
                            {certificate.annotations}
                        </div>
                    </>
                ) : (
                    <></>
                )}

                {type == 'MATRIMONIO' ? (
                    <>
                        <div className="cer_body">
                            <span>Fecha del matrimonio: </span>
                            {certificate.marrierdate} <br />
                            <span>Nombres y apellidos del esposo: </span>
                            {certificate.namehusband +
                                ' ' +
                                certificate.lastnamehusband}{' '}
                            <br />
                            <span>Padre del esposo: </span>
                            {certificate.fatherhusband} <br />
                            <span>Madre del esposo: </span>
                            {certificate.motherhusband} <br />
                            <span>Lugar de bautismo del esposo: </span>
                            {certificate.placebatptismhusband} <br />
                            <span>Fecha de bautismo del esposo: </span>
                            {certificate.datebatptismhusband}
                            <br />
                            <span>Nombres y apellidos de la esposa: </span>
                            {certificate.motherwife +
                                ' ' +
                                certificate.lastnamewife}{' '}
                            <br />
                            <span>Padre de la esposa: </span>
                            {certificate.fatherwife} <br />
                            <span>Madre de la esposa: </span>
                            {certificate.motherwife} <br />
                            <span>Lugar de bautismo de la esposa: </span>
                            {certificate.placebatptismwife} <br />
                            <span>Fecha de bautismo de la esposa: </span>
                            {certificate.datebatptismwife}
                            <br />
                            <span>Testigo(s): </span>
                            {certificate.namewitness} <br />
                            <span>Ministro: </span>
                            {certificate.minister} <br />
                            <span> Parroco: </span>
                            {certificate.parson} <br /> <br />
                        </div>
                    </>
                ) : (
                    <></>
                )}

                <div className="cer_date">
                    Expedida en Sogamoso, el dia {date.split('-')[2]} del mes{' '}
                    {date.split('-')[1]} de {date.split('-')[0]} <br />
                </div>

                <Form.Control
                    type="text"
                    placeholder="Ingrese el nombre del parroco"
                    onChange={(e) => {
                        setParroco(e.target.value)
                    }}
                    value={parroco}
                />
                <div className="cer_parroco">
                    {parroco}
                    <br />
                    Párroco
                </div>
            </div>

            <Button variant="danger" onClick={(e) => windowPrint(false)}>
                Cancelar
            </Button>
            <Button
                variant="primary"
                onClick={(e) => {
                    window.print()
                    //windowPrint(false)
                }}
            >
                Imprimir
            </Button>
        </>
    )
}
