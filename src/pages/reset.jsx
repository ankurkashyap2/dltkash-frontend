import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ReactComponent as RightArrow } from "../components/icons/rightarrow.svg";
import { ReactComponent as TickIcon } from "../components/icons/tick.svg";
import Navbar from "../components/navbar";
import "../styles/login.css";

const Reset = () => {
	return (
		<>
			<Navbar page="Reset Password" />
			<div class="main-content">
				<div className="outer-box">
					<div className="login-box">
						<h3>Reset Password</h3>
						<p>Enter the details below to reset the password</p>
						<form noValidate autoComplete="off" className="form-align">
							<Form className="form-align">
								<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
									<Form.Label className="text-bottom">
										Password
									</Form.Label>
									<Form.Control
										type="password"
										placeholder="Enter Password"
										className="field-size mb-3"
									/>
									<Form.Label className="text-bottom">
										Confirm Password
									</Form.Label>
									<Form.Control
										type="password"
										placeholder="Enter Confirm Password "
										className="field-size mb-3"
									/>
									<Button className="btn-outlined" href="/login">
										
										<RightArrow className="icon-login" />
										Login
									</Button>
									<Button className="btn-position btn-filled">
										<TickIcon className="icon-login" />
										Reset Password
									</Button>
								</Form.Group>
							</Form>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Reset;
