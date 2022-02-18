import React, { useState, useEffect } from "react";
import {
	Form,
	Button,
	Row,
	Col,
	Alert,
	OverlayTrigger,
	Tooltip,
} from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import Countdown from "react-countdown";
import {
	userRegister,
	emailVerification,
	otpVerification,
	resetUserFlags,
} from "../../redux/user/actions";
import { ReactComponent as RightArrow } from "../icons/rightarrow.svg";
import { ReactComponent as TickIcon } from "../icons/tick.svg";
import { ReactComponent as EyeIcon } from "../icons/eye.svg";
import { ReactComponent as EyeHiddenIcon } from "../icons/eye-hidden.svg";
import { ReactComponent as Question } from "../icons/Question.svg";
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
	resetUserFlags,
}) => {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [mobileOtp, setMobileOtp] = useState("");
	const [emailOtp, setEmailOtp] = useState("");
	const [emailOtpText, setEmailOtpText] = useState("Send OTP");
	const [successModal, setSuccessModal] = useState("");
	const [otpError, setOtpError] = useState(false);
	const [isEmailVerified, setIsEmailVerified] = useState(false);
	const [expirationTime, setExpirationTime] = useState(Date.now());

	useEffect(() => {
		if (receivedOTP) {
			setEmailOtpText("Resend OTP");
		}
	}, [receivedOTP]);

	const validationSchema = () => {
		return Yup.object().shape({
			userName: Yup.string().required("*User Name is required"),
			phoneNo: Yup.string()
				.required("* Mobile Number is required")
				.matches(
					/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
					"* Invalid Mobile Number"
				),
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

	const renderer = ({ formatted, completed, api }, values) => {
		if (completed) {
			return (
				<Button
					className="text-verify"
					variant="link"
					onClick={() => {
						handleEmailVerification(values);
						api.start();
					}}
				>
					{emailOtpText}
				</Button>
			);
		} else {
			return (
				<span className="text-verify" style={{ bottom: "13px", right: "9px" }}>
					{formatted.minutes}:{formatted.seconds}
				</span>
			);
		}
	};
	console.log("*********", expirationTime + 30000, Date.now() + 30000);
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
									<div style={{ position: "relative" }}>
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
									</div>
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
									<div style={{ position: "relative" }}>
										<Form.Control
											type="text"
											placeholder="Enter OTP "
											className="field-size"
										/>
										<Button
											className="text-verify"
											variant="link"
											// onClick={() => handleEmailVerification(values)}
										>
											Verify
										</Button>
									</div>
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
									<div style={{ position: "relative" }}>
										<Form.Control
											type="text"
											placeholder="Enter Email Address"
											className="field-size"
											name="email"
											required
											onChange={handleChange}
											value={values.email}
										/>
										{receivedOTP ? (
											<Countdown
												date={Date.now() + 30000}
												renderer={(props) => renderer(props, values)}
											/>
										) : (
											<Button
												className="text-verify"
												variant="link"
												disabled={!values.email && !!errors.email}
												onClick={() => handleEmailVerification(values)}
											>
												{emailOtpText}
											</Button>
										)}
									</div>
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
									<div style={{ position: "relative" }}>
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
									</div>
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
									<OverlayTrigger
										overlay={
											<Tooltip>
												Password must contain minimum of 8 characters with a capital letter,
												a number, and a symbol
											</Tooltip>
										}
									>
										<Question className="tooltip_icon" />
									</OverlayTrigger>
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
				show={successModal === "emailVerified" || isOTPSent}
				message={
					isOTPSent
						? "An OTP is sent to your Email. Please verify it first to get yourself register."
						: "Email is verified Successfully!"
				}
				onHide={() =>
					isOTPSent ? resetUserFlags("isOTPSent") : setSuccessModal("")
				}
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
		{ userRegister, emailVerification, otpVerification, resetUserFlags },
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PersonalDetailsForm);
