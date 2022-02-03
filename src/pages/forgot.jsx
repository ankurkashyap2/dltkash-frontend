import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Form, Button, Alert } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { ReactComponent as RightArrow } from "../components/icons/rightarrow.svg";
import { ReactComponent as TickIcon } from "../components/icons/tick.svg";
import AppLayout from "../layouts/appLayout";
import { forgotPassword } from "../redux/user/actions";
import "../styles/login.css";

const Forgot = ({ loading, error, forgotPassword }) => {
	const navigate = useNavigate();
	const validationSchema = () => {
		return Yup.object().shape({
			email: Yup.string()
				.required("* Email is required")
				.email("* Please enter valid format"),
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
		};
		return initialValues;
	};

	const handleSubmit = (values) => {
		forgotPassword({ ...values }, navigate);
	};
	return (
		<AppLayout page="Forgot Password" loading={loading}>
			<div class="main-content">
				<div className="outer-box">
					<div className="login-box">
						<h3>Forgot Password</h3>
						<p>Enter the details below to retrieve the password</p>
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
											<Form.Label className="text-bottom">Email Address</Form.Label>
											<Form.Control
												type="text"
												placeholder="Enter Email Address"
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
										<Button className="btn-outlined" href="/login">
											<RightArrow className="icon-login" />
											Login
										</Button>
										<Button type="submit" className="btn-position btn-filled">
											<TickIcon className="icon-login" />
											Submit
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
		error: state.user.error,
		loading: state.user.loading,
	};
};

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ forgotPassword }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Forgot);
