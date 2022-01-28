import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
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
import AppLayout from "../layouts/appLayout";

const Login = ({ userLogin, error, loading }) => {
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
		<AppLayout page="Login" loading={loading}>
			{/* <Navbar page="Login" /> */}
			<div class="main-content-login">
				<div className="outer-box">
					<div className="login-box">
						<h3>Login</h3>
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
										<Form.Group controlId="exampleForm.ControlInput1">
											<Form.Label className="text-bottom">Email</Form.Label>
											<Form.Control
												type="email"
												placeholder="Enter Email"
												className="field-size mb-3"
												name="email"
												required
												onChange={handleChange}
												value={values.email}
												isInvalid={!!touched.email && !!errors.email}
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
												className="field-size mb-3"
												name="password"
												required
												onChange={handleChange}
												value={values.password}
												isInvalid={!!touched.password && !!errors.password}
											/>
											<i class="fas fa-eye"></i>
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
