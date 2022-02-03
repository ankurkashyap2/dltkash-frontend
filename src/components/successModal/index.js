import { Modal, Button } from "react-bootstrap";
import { ReactComponent as CheckIcon } from "../icons/check-solid.svg";

const SuccessModal = (props) => {
	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Body>
				<h5>Success!</h5>
				<CheckIcon />
				<p>{props.message}</p>
				<Button onClick={props.onHide}>Okay</Button>
			</Modal.Body>
		</Modal>
	);
};

export default SuccessModal;
