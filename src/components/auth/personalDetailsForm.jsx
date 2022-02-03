import React, { useState } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import {
	userRegister,
	emailVerification,
	otpVerification,
} from "../../redux/user/actions";
import { ReactComponent as RightArrow } from "../icons/rightarrow.svg";
import { ReactComponent as TickIcon } from "../icons/tick.svg";
import { ReactComponent as EyeIcon } from "../icons/eye.svg";
import { ReactComponent as EyeHiddenIcon } from "../icons/eye-hidden.svg";
import "../../styles/register.css";
import SuccessModal from "../successModal";

const PersonalDetailsForm = ({
	setActiveTab,
	entityDetails,
	userRegister,
	emailVerification,
	otpVerification,
	error,
	isOTPSent,
	receivedOTP,
}) => {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [mobileOtp, setMobileOtp] = useState("");
	const [emailOtp, setEmailOtp] = useState("");
	const [successModal, setSuccessModal] = useState("");
	const [otpError, setOtpError] = useState(false);
	const [isEmailVerified, setIsEmailVerified] = useState(false);

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
			confirmPassword: "",
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

	const handleEmailVerification = (values) => {
		emailVerification(values.email);
	};

	const handleOTPVerification = (values, type) => {
		const passphrase = "DLTkash@";
		const bytes = CryptoJS.AES.decrypt(receivedOTP, passphrase);
		const originalText = bytes.toString(CryptoJS.enc.Utf8);
		console.log(originalText === emailOtp);
		if (originalText === emailOtp) {
			setSuccessModal("emailVerified");
			setIsEmailVerified(true);
		} else {
			setOtpError(true);
		}
	};

	return (
		<>
			{(error || otpError) && (
				<Alert variant="danger">{error ? error : "Wrong OTP"}!</Alert>
			)}
			<Formik
				initialValues={getInitialValues()}
				validate={validate(validationSchema)}
				onSubmit={handleSubmit}
				enableReinitialize={true}
				render={({ errors, handleChange, handleSubmit, values, touched }) => {
					return (
						<Form className="form-align" noValidate onSubmit={handleSubmit}>
							<Row>
								<Form.Group
									as={Col}
									md="12"
									sm="12"
									controlId="formGridEmail"
									className="mb-3"
								>
									<Form.Label className="text-bottom">User Name</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter User Name"
										className="field-size"
										name="userName"
										required
										onChange={handleChange}
										value={values.userName}
									/>
									{!!touched.userName && !!errors.userName && (
										<p className="error-text">{errors.userName}</p>
									)}
								</Form.Group>
							</Row>
							<Row>
								<Form.Group
									as={Col}
									md="6"
									sm="12"
									controlId="formGridEmail"
									className="mb-3"
								>
									<Form.Label className="text-bottom">Mobile Number</Form.Label>
									<Form.Control
										type="phone"
										placeholder="Enter Mobile Number"
										className="field-size"
										name="phoneNo"
										required
										onChange={handleChange}
										value={values.phoneNo}
									/>
									<Button
										className="text-verify"
										variant="link"
										// onClick={() => handleEmailVerification(values)}
									>
										Send OTP
									</Button>
									{/* <a href="#" className="text-verify">
										Verify
									</a> */}
									{!!touched.phoneNo && !!errors.phoneNo && (
										<p className="error-text">{errors.phoneNo}</p>
									)}
								</Form.Group>
								<Form.Group
									as={Col}
									md="6"
									sm="12"
									controlId="formGridEmail"
									className="mb-3"
								>
									<Form.Label className="text-bottom">Enter Mobile OTP </Form.Label>
									{/* <a href="#" className="text-forgot-pwd">
										Resend OTP
									</a> */}
									<Form.Control
										type="text"
										placeholder="Enter OTP "
										className="field-size"
									/>
									<a href="#" className="text-verify-1">
										Verify
									</a>
								</Form.Group>
							</Row>
							<Row>
								<Form.Group
									as={Col}
									md="6"
									sm="12"
									controlId="formGridEmail"
									className="mb-3"
								>
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
									<Button
										className="text-verify"
										variant="link"
										disabled={!values.email && !!errors.email}
										onClick={() => handleEmailVerification(values)}
									>
										Send OTP
									</Button>
									{!!touched.email && !!errors.email && (
										<p className="error-text">{errors.email}</p>
									)}
								</Form.Group>
								<Form.Group
									as={Col}
									md="6"
									sm="12"
									controlId="formGridEmail"
									className="mb-3"
								>
									<Form.Label className="text-bottom">Enter Email OTP </Form.Label>
									{/* <Button
										variant="link"
										// onClick={() => handleEmailVerification(values)}
										className="text-forgot-pwd"
									>
										Resend OTP
									</Button> */}
									<Form.Control
										type="text"
										placeholder="Enter OTP"
										className="field-size"
										onChange={(e) => {
											setEmailOtp(e.target.value);
											setOtpError(false);
										}}
									/>
									<Button
										className="text-verify"
										variant="link"
										disabled={!emailOtp}
										onClick={() => handleOTPVerification(values, "EMAIL")}
									>
										Verify
									</Button>
								</Form.Group>
							</Row>
							<Row>
								<Form.Group
									as={Col}
									md="6"
									sm="12"
									controlId="formGridPassword"
									className="mb-3"
								>
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
								<Form.Group
									as={Col}
									md="6"
									sm="12"
									controlId="formGridPassword"
									className="mb-3"
								>
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
								</Form.Group>
							</Row>
							<Button className="btn-outlined" onClick={() => setActiveTab("entity")}>
								<RightArrow className="icon-login" />
								Prev Step
							</Button>
							<Button
								className="btn-position btn-filled w-custom"
								type="submit"
								disabled={!isEmailVerified}
							>
								<TickIcon className="icon-login" />
								Register
							</Button>
						</Form>
					);
				}}
			/>

			<SuccessModal
				show={successModal === "emailVerified"}
				message={"Email is verified Successfully!"}
				onHide={() => setSuccessModal("")}
			/>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		profile: state.user.profile,
		token: state.user.token,
		error: state.user.error,
		isOTPSent: state.user.isOTPSent,
		receivedOTP: state.user.receivedOTP,
	};
};

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{ userRegister, emailVerification, otpVerification },
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PersonalDetailsForm);
