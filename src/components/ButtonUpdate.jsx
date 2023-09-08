import { Button } from "react-bootstrap"

export default function ButtonUpdate({changeUpdate, data, setDataModify}){
    const handleClick = () => {
        changeUpdate(true)
        setDataModify(data)
    }

    return (
        <Button variant="warning" onClick={handleClick}>
            Editar
        </Button>
    )
}