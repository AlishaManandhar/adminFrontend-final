import react, {useState} from "react";
import { Link } from "react-router-dom";
import ModalDelete from "./ModalDelete";
function Actions(props)
{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <td>
            <Link to={props.editLink}><i className="bi bi-pencil-square pe-3"></i></Link>
            <i  className="bi bi-trash-fill text-danger" onClick={handleShow}></i>
            <ModalDelete open={handleShow} close={handleClose} show={show} onDelete={props.onDelete} id={props.id} title={props.title} content={props.content} confirm={props.confirm}/>
            </td>
            
        </>
    )
}

export default Actions