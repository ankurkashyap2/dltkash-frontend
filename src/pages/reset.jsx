import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Form, Button, Alert } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { ReactComponent as RightArrow } from "../components/icons/rightarrow.svg";
import { ReactComponent as TickIcon } from "../components/icons/tick.svg";
import { ReactComponent as EyeIcon } from "../components/icons/eye.svg";
import { ReactComponent as EyeHiddenIcon } from "../components/icons/eye-hidden.svg";
import AppLayout from "../layouts/appLayout";
import { resetPassword } from "../redux/user/actions";

import "../styles/login.css";

const Reset = ({ loading, error, resetPassword }) => {
	const navigate = useNavigate();
	let { token } = useParams();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const validationSchema = () => {
		return Yup.object().shape({
			password: Yup.string()
				.required("* Password is required")
				.min(
					8,
					"* Minimum of 8 characters with a capital letter, a number, and a symbol."
				)
				.matches(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/,
					"* Minimum of 8 characters with a capital letter, a number, and a symbol."
				),
			confirmPassword: Yup.string()
				.required("* Please confirm your password")
				.oneOf([Yup.ref("password"), null], "* Password does not match."),
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
			password: "",
			confirmPassword: "",
		};
		return initialValues;
	};

	const handleSubmit = (values) => {
		resetPassword({ password: values.password, token }, navigate);
	};
	return (
		<AppLayout page="Reset Password" loading={loading}>
			<div className="main-content">
				<div className="outer-box">
					<div className="login-box">
						<h3>Reset Password</h3>
						<p>Enter the details below to reset the password</p>
						{error && <Alert variant="danger">{error}!</Alert>}
						<Formik
							initialValues={getInitialValues()}
							validate={validate(validationSchema)}
							onSubmit={handleSubmit}
							enableReinitialize={true}
							render={({ errors, handleChange, handleSubmit, values, touched }) => {
								return (
									<Form className="form-align" noValidate onSubmit={handleSubmit}>
										<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
											<Form.Label className="text-bottom">Password</Form.Label>
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
										<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
											<Form.Label className="text-bottom">Confirm Password</Form.Label>
											<Form.Control
												type={showConfirmPassword ? "text" : "password"}
												placeholder="Confirm Password"
												className="field-size"
												name="confirmPassword"
												required
												onChange={handleChange}
												value={values.confirmPassword}
											/>
											{showConfirmPassword ? (
												<EyeIcon
													className="eye-icon"
													onClick={() => setShowConfirmPassword(false)}
												/>
											) : (
												<EyeHiddenIcon
													className="eye-icon"
													onClick={() => setShowConfirmPassword(true)}
												/>
											)}
											{!!touched.confirmPassword && !!errors.confirmPassword && (
												<p className="error-text">{errors.confirmPassword}</p>
											)}
											<Button className="btn-outlined" href="/login">
												<RightArrow className="icon-login" />
												Login
											</Button>
											<Button className="btn-position btn-filled" type="submit">
												<TickIcon className="icon-login" />
												Reset Password
											</Button>
										</Form.Group>
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
		error: state.user.error,
		loading: state.user.loading,
	};
};

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ resetPassword }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Reset);
