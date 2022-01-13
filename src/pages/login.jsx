import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ReactComponent as RightArrow } from "../components/icons/rightarrow.svg";
import { ReactComponent as TickIcon } from "../components/icons/tick.svg";
import Navbar from "../components/navbar";
import "../styles/login.css";

const Login = () => {
	return (
		<>
			<Navbar page="Login" />
			<div class="main-content">
				<div className="outer-box">
					<div className="login-box">
						<h3>Login</h3>
						<p>Enter the following details to login</p>
						<Form className="form-align">
							<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
								<Form.Label className="text-bottom">Username</Form.Label>
								<Form.Control
									type="email"
									placeholder="Enter Username"
									className="field-size"
								/>
								<Form.Label className="text-bottom">Password</Form.Label>
								<a href="/forgot-password" className="text-forgot-pwd">
									Forgot Password?
								</a>
								<Form.Control
									type="password"
									placeholder="Enter Password"
									className="field-size"
								/>
								<Button className="btn-outlined">
									<RightArrow className="icon-login" />
									Register
								</Button>
								<Button className="btn-position btn-filled">
									<TickIcon className="icon-login" />
									Login
								</Button>
							</Form.Group>
						</Form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
