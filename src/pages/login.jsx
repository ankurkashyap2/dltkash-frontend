import React from "react";
import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../redux/user/actions";
import { ReactComponent as RightArrow } from "../components/icons/rightarrow.svg";
import { ReactComponent as TickIcon } from "../components/icons/tick.svg";
import Navbar from "../components/navbar";
import "../styles/login.css";

const Login = ({ userLogin }) => {
	const navigate = useNavigate();

	const validationSchema = () => {
		return Yup.object().shape({
			email: Yup.string().required("*Email is required"),
			password: Yup.string().required("* Password is required"),
		});
	};

	const validate = (getValidationSchema) => {
		return (values) => {
			const validationSchema = getValidationSchema(values);
			try {
				validationSchema.validateSync(values, { abortEarly: false });
				return {};
			} catch (error) {
				return getErrorsFromValidationError(error);
			}
		};
	};

	const getErrorsFromValidationError = (validationError) => {
		const FIRST_ERROR = 0;
		return validationError.inner.reduce((errors, error) => {
			return {
				...errors,
				[error.path]: error.errors[FIRST_ERROR],
			};
		}, {});
	};

	const getInitialValues = () => {
		const initialValues = {
			email: "",
			password: "",
		};
		return initialValues;
	};

	const handleSubmit = (values) => {
		userLogin({ ...values }, navigate);
	};
	return (
		<>
			<Navbar page="Login" />
			<div class="main-content-login">
				<div className="outer-box">
					<div className="login-box">
						<h3>Login</h3>
						<p>Enter the following details to login</p>
						<Formik
							initialValues={getInitialValues()}
							validate={validate(validationSchema)}
							onSubmit={handleSubmit}
							enableReinitialize={true}
							render={({ errors, handleChange, handleSubmit, values, touched }) => {
								return (
									<Form className="form-align" noValidate onSubmit={handleSubmit}>
										<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
											<Form.Label className="text-bottom">Username</Form.Label>
											<Form.Control
												type="email"
												placeholder="Enter Username"
												className="field-size"
												name="email"
												required
												onChange={handleChange}
												value={values.email}
												isInvalid={!!errors.email}
												isValid={touched.email && !errors.email}
											/>
											<Form.Control.Feedback type="invalid">
												{errors.email}
											</Form.Control.Feedback>

											<Form.Label className="text-bottom">Password</Form.Label>
											<a href="/forgot-password" className="text-forgot-pwd">
												Forgot Password?
											</a>
											<Form.Control
												type="password"
												placeholder="Enter Password"
												className="field-size"
												name="password"
												required
												onChange={handleChange}
												value={values.password}
												isInvalid={!!errors.password}
												isValid={touched.password && !errors.password}
											/>
											<Form.Control.Feedback type="invalid">
												{errors.password}
											</Form.Control.Feedback>
											<Button className="btn-outlined" href="/register">
												<RightArrow className="icon-login" />
												Register
											</Button>
											<Button className="btn-position btn-filled" type="submit">
												<TickIcon className="icon-login" />
												Login
											</Button>
										</Form.Group>
									</Form>
								);
							}}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		profile: state.user.profile,
		token: state.user.token,
	};
};

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ userLogin }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
