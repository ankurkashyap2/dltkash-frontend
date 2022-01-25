import React, { useEffect } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useNavigate } from "react-router-dom";
import { userRegister } from "../../redux/user/actions";
import { ReactComponent as RightArrow } from "../icons/rightarrow.svg";
import { ReactComponent as TickIcon } from "../icons/tick.svg";
import "../../styles/register.css";

const PersonalDetailsForm = ({
	setActiveTab,
	entityDetails,
	userRegister,
	error,
}) => {
	const navigate = useNavigate();

	const validationSchema = () => {
		return Yup.object().shape({
			userName: Yup.string().required("*User Name is required"),
			phoneNo: Yup.string().required("* Mobile Number is required"),
			email: Yup.string()
				.required("* Email is required")
				.email("* Please enter valid format"),
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
			userName: "",
			phoneNo: "",
			email: "",
			password: "",
		};
		return initialValues;
	};

	const handleSubmit = (values) => {
		userRegister(
			{
				...entityDetails,
				...values,
				isFirstExchangeAdmin: true,
			},
			navigate
		);
	};

	return (
		<>
			{error && <Alert variant="danger">{error}!</Alert>}
			<Formik
				initialValues={getInitialValues()}
				validate={validate(validationSchema)}
				onSubmit={handleSubmit}
				enableReinitialize={true}
				render={({ errors, handleChange, handleSubmit, values, touched }) => {
					return (
						<Form className="form-align" noValidate onSubmit={handleSubmit}>
							<Row>
								<Form.Group as={Col} md="12" sm="12" controlId="formGridEmail">
									<Form.Label className="text-bottom">User Name</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter User Name"
										className="field-size mb-3"
										name="userName"
										required
										onChange={handleChange}
										value={values.userName}
										isInvalid={!!errors.userName && !!touched.userName}
										// isValid={touched.userName && !errors.userName}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.userName}
									</Form.Control.Feedback>
								</Form.Group>
								{/* <Form.Group as={Col} controlId="formGridEmail">
									<div class="box box-primary">
										<div class="box-body box-profile">
											<div>
												<div class="avatar-upload">
													<div class="avatar-edit">
														<form action="" method="post" id="form-image">
															<input type="file" id="imageUpload" accept=".png, .jpg, .jpeg" />
															<label for="imageUpload"></label>
														</form>
													</div>
													<div class="avatar-preview">
														<img
															src="/assets/images/avatar.png"
															class="profile-user-img img-responsive img-circle"
															alt="User profile"
															id="imagePreview"
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
								</Form.Group> */}
							</Row>
							<Row>
								<Form.Group as={Col} md="6" sm="12" controlId="formGridEmail">
									<Form.Label className="text-bottom">Mobile Number</Form.Label>
									<Form.Control
										type="phone"
										placeholder="Enter Mobile Number"
										className="field-size"
										name="phoneNo"
										required
										onChange={handleChange}
										value={values.phoneNo}
										isInvalid={!!touched.phoneNo && !!errors.phoneNo}
										// isValid={touched.phoneNo && !errors.phoneNo}
									/>
									<a href="#" className="text-verify-1">
										Verify
									</a>
									<Form.Control.Feedback type="invalid">
										{errors.phoneNo}
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group as={Col} md="6" sm="12" controlId="formGridEmail">
									<Form.Label className="text-bottom">Enter Mobile OTP </Form.Label>
									<a href="#" className="text-forgot-pwd">
										Resend OTP
									</a>
									<Form.Control
										type="text"
										placeholder="Enter Mobile OTP "
										className="field-size"
									/>
								</Form.Group>
							</Row>
							<Row>
								<Form.Group as={Col} md="6" sm="12" controlId="formGridEmail">
									<Form.Label className="text-bottom">Email Address</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter Email Address"
										className="field-size mb-3"
										name="email"
										required
										onChange={handleChange}
										value={values.email}
										isInvalid={!!touched.email && !!errors.email}
										// isValid={touched.email && !errors.email}
									/>
									<a href="#" className="text-verify">
										Verify
									</a>
									<Form.Control.Feedback type="invalid">
										{errors.email}
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group as={Col} as={Col} md="6" sm="12" controlId="formGridEmail">
									<Form.Label className="text-bottom">Enter Email OTP </Form.Label>
									<a href="#" className="text-forgot-pwd">
										Resend OTP
									</a>
									<Form.Control
										type="text"
										placeholder="Enter OTP"
										className="field-size mb-3"
									/>
								</Form.Group>
							</Row>
							<Row>
								<Form.Group as={Col} md="6" sm="12" controlId="formGridPassword">
									<Form.Label className="text-bottom">Password</Form.Label>
									<Form.Control
										type="password"
										placeholder="Enter Password"
										className="field-size mb-3"
										name="password"
										required
										onChange={handleChange}
										value={values.password}
										isInvalid={!!touched.password && !!errors.password}
										// isValid={touched.password && !errors.password}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.password}
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group as={Col} md="6" sm="12" controlId="formGridPassword">
									<Form.Label className="text-bottom">Confirm Password</Form.Label>
									<Form.Control
										type="password"
										placeholder="Confirm Password"
										className="field-size mb-3"
										name="confirmPassword"
										required
										onChange={handleChange}
										value={values.confirmPassword}
										isInvalid={!!touched.confirmPassword && !!errors.confirmPassword}
										// isValid={touched.confirmPassword && !errors.confirmPassword}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.confirmPassword}
									</Form.Control.Feedback>
								</Form.Group>
							</Row>
							<Button className="btn-outlined" onClick={() => setActiveTab("entity")}>
								<RightArrow className="icon-login" />
								Prev Step
							</Button>
							<Button className="btn-position btn-filled w-custom" type="submit">
								<TickIcon className="icon-login" />
								Register
							</Button>
						</Form>
					);
				}}
			/>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		profile: state.user.profile,
		token: state.user.token,
		error: state.user.error,
	};
};

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ userRegister }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PersonalDetailsForm);
