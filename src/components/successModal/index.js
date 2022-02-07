import { Modal, Button } from "react-bootstrap";
import { ReactComponent as CheckIcon } from "../icons/check-solid.svg";

const SuccessModal = (props) => {
	return (
		<Modal
			{...props}
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			style={{ textAlign: "center" }}
		>
			<Modal.Body className="p-5">
				<h5>Success!</h5>
				<CheckIcon className="img-size"/>
				<p>{props.message}</p>
				<Button className="btn-filled " onClick={props.onHide}>
					Okay
				</Button>
			</Modal.Body>
		</Modal>
	);
};

export default SuccessModal;
