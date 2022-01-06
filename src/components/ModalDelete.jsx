
import { Link } from "react-router-dom";
import {Modal,Button} from "react-bootstrap"

function ModalDelete(props) {
    const onDelete = async () => {
      props.close()
      await props.onDelete(props.id)

    }
    return (
        <>
       
        <Modal show={props.show} onHide={props.close} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.content}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.close}>
              Close
            </Button>
            <Button variant="danger" onClick={onDelete}>
              {props.confirm}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
}

export default ModalDelete