import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ReactComponent as RightArrow } from "../components/icons/rightarrow.svg";
import { ReactComponent as TickIcon } from "../components/icons/tick.svg";
import Navbar from "../components/navbar";
import "../styles/login.css";

const Forgot = () => {
	return (
		<>
			<Navbar page="Forgot Password" />
			<div class="main-content">
				<div className="outer-box">
					<div className="login-box">
						<h3>Forgot Password</h3>
						<p>Enter the details below to retriev the password</p>
						<form noValidate autoComplete="off" className="form-align">
							<Form className="form-align">
								<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
									<Form.Label className="text-bottom">
										Username or Email Address
									</Form.Label>
									<Form.Control
										type="email"
										placeholder="Enter Username or Email Address"
										className="field-size"
									/>
									<Button className="btn-outlined" href="/login">
										<RightArrow className="icon-login" />
										Login
									</Button>
									<Button className="btn-position btn-filled">
										<TickIcon className="icon-login" />
										Submit
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

export default Forgot;
