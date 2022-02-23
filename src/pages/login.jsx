import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../redux/user/actions";
import { ReactComponent as RightArrow } from "../components/icons/rightarrow.svg";
import { ReactComponent as TickIcon } from "../components/icons/tick.svg";
import AppLayout from "../layouts/appLayout";
import { ReactComponent as EyeIcon } from "../components/icons/eye.svg";
import { ReactComponent as EyeHiddenIcon } from "../components/icons/eye-hidden.svg";
import "../styles/login.css";

const Login = ({ userLogin, error, loading }) => {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);

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
		userLogin(
			{ email: values.email.trim(), password: values.password.trim() },
			navigate
		);
	};
	return (
		<AppLayout page="Login" loading={loading}>
			<div className="main-content-login">
				<div className="outer-box">
					<div className="login-box">
						{/* <h3>Login</h3> */}
						<p>Enter the following details to login</p>
						{error && <Alert variant="danger">{error}!</Alert>}
						<Formik
							initialValues={getInitialValues()}
							validate={validate(validationSchema)}
							onSubmit={handleSubmit}
							enableReinitialize={true}
							render={({ errors, handleChange, handleSubmit, values, touched }) => {
								return (
									<Form className="form-align" noValidate onSubmit={handleSubmit}>
										<Form.Group controlId="exampleForm.ControlInput1" className="mb-3">
											<Form.Label className="text-bottom">Email</Form.Label>
											<Form.Control
												type="email"
												placeholder="Enter Email"
												className="field-size"
												name="email"
												required
												onChange={handleChange}
												value={values.email}
											/>
											{!!touched.email && !!errors.email && (
												<p className="error-text">{errors.email}</p>
											)}
										</Form.Group>
										<Form.Group controlId="exampleForm.ControlInput1" className="mb-3">
											<Form.Label className="text-bottom">Password</Form.Label>
											<a href="/forgot-password" className="text-forgot-pwd">
												Forgot Password?
											</a>
											<Form.Control
												type={showPassword ? "text" : "password"}
												placeholder="Enter Password"
												className="field-size"
												name="password"
												required
												onChange={handleChange}
												value={values.password}
											/>
											{showPassword ? (
												<EyeIcon
													className="eye-icon"
													onClick={() => setShowPassword(false)}
												/>
											) : (
												<EyeHiddenIcon
													className="eye-icon"
													onClick={() => setShowPassword(true)}
												/>
											)}
											{!!touched.password && !!errors.password && (
												<p className="error-text">{errors.password}</p>
											)}
										</Form.Group>
										<Button className="btn-outlined" href="/register">
											<RightArrow className="icon-login" />
											Register
										</Button>
										<Button className="btn-position btn-filled" type="submit">
											<TickIcon className="icon-login" />
											Login
										</Button>
									</Form>
								);
							}}
						/>
					</div>
				</div>
			</div>
		</AppLayout>
	);
};

const mapStateToProps = (state) => {
	return {
		profile: state.user.profile,
		token: state.user.token,
		error: state.user.error,
		loading: state.user.loading,
	};
};

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ userLogin }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
