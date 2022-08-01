import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
	Form,
	Button,
	Alert,
	ToggleButtonGroup,
	ToggleButton,
	Spinner,
} from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Countdown from "react-countdown";
import LoadingOverlay from "react-loading-overlay";
import { useJwt } from "react-jwt";
import {
	getExchangeInvestorData,
	verifyInvestorEmail,
	verifyInvestorMobile,
	resetInvestorFlags,
} from "../redux/investor/actions";
import { generateOTP } from "../utils";
import SuccessModal from "../components/successModal";
import "../styles/investor.css";

const Investor = ({
	error,
	loading,
	getExchangeInvestorData,
	investorData,
	verifyInvestorEmail,
	verifyInvestorMobile,
	isEmailVerified,
	isMobileVerified,
	resetInvestorFlags,
}) => {
	let { token, uccRequestId } = useParams();
	let location = useLocation();

	const [otpType, setOtpType] = useState(
		location && location.pathname.includes("email-verification")
			? "email"
			: "mobile"
	);
	const [otpStatus, setOtpStatus] = useState("");
	const [enteredOtp, setEnteredOtp] = useState("");
	const [otpError, setOtpError] = useState(false);
	const [otp, setOtp] = useState("");
	const [expirationTime, setExpirationTime] = useState("");
	const { isExpired } = useJwt(token);

	useEffect(() => {
		if (!isExpired && uccRequestId) {
			getExchangeInvestorData({ uccRequestId }, token);
		}
	}, [uccRequestId, token, getExchangeInvestorData, isExpired]);

	const renderer = ({ formatted, completed, api }) => {
		if (completed) {
			setOtp(generateOTP());
			setExpirationTime(Date.now() + 60000);
		}
		return (
			<p className="timer">
				{formatted.minutes}:{formatted.seconds}
			</p>
		);
	};

	const handleToggle = (val) => {
		setOtpType(val);
		setOtpStatus("");
	};

	const handleOTPStatus = (val) => {
		setOtpStatus(val);
		setOtp(generateOTP());
		setExpirationTime(Date.now() + 60000);
	};

	const handleOTPSubmit = () => {
		let payload = {
			uccRequestId,
			uccUpdatedAt:
				investorData && investorData.uccUpdatedAt ? investorData.uccUpdatedAt : "",
		};
		if (otpType === "email") {
			payload = {
				...payload,
				uccEmailStatus: otpStatus === "reject" ? "REJECTED" : "VERIFIED",
			};
		} else {
			payload = {
				...payload,
				uccMobileStatus: otpStatus === "reject" ? "REJECTED" : "VERIFIED",
			};
		}
		if (payload.uccUpdatedAt === "") {
			delete payload.uccUpdatedAt;
		}
		if (otp === enteredOtp || otpStatus === "reject") {
			setOtpError(false);
			otpType === "email"
				? verifyInvestorEmail(payload, token)
				: verifyInvestorMobile(payload, token);
		} else {
			setOtpError(true);
		}
	};

	const CountdownWrapper = () => {
		return <Countdown date={expirationTime} renderer={renderer} />;
	};
	const MemoCountdown = React.memo(CountdownWrapper);

	const renderOTPOptions = () => {
		return (
			<>
				<div className="radio-otp mt-4">
					{(error || otpError) && (
						<Alert variant="danger">{error ? error : "Wrong OTP"}!</Alert>
					)}
					<Form>
						<Form.Check
							label="Reject Verification"
							name="group1"
							type="radio"
							id="reject"
							value="reject"
							onChange={(e) => handleOTPStatus(e.target.value)}
						/>
						<Form.Check
							label="Generate OTP"
							name="group1"
							type="radio"
							id="generate"
							value="generate"
							onChange={(e) => handleOTPStatus(e.target.value)}
						/>
					</Form>
				</div>
				{otpStatus === "generate" ? (
					<>
						<Form.Group controlId="validationCustom01">
							<Form.Control
								required
								type="text"
								placeholder="Please Enter OTP here"
								className="field-size mt-4"
								onChange={(e) => setEnteredOtp(parseInt(e.target.value))}
								autoComplete="off"
							/>
						</Form.Group>
						<p className="text-otp p-3">
							Your OTP is <span>{otp}</span>
						</p>

						<MemoCountdown />
					</>
				) : null}
				<Button
					variant="primary"
					className="w-100 p-2 mt-3"
					disabled={!otpStatus}
					onClick={() => handleOTPSubmit()}
				>
					Submit
				</Button>
			</>
		);
	};

	return (
		<LoadingOverlay
			active={isExpired ? false : loading}
			spinner={<Spinner animation="border" variant="info" />}
			text=""
			styles={{
				content: (base) => ({
					...base,
					color: "#919191",
					marginTop: "50vh",
				}),
				overlay: (base) => ({
					...base,
					zIndex: 9999,
					color: "#919191",
					backgroundColor: "rgba(255,255,255,.5)",
				}),
			}}
		>
			<div className="main-content">
				<div className="outer-box w-investor">
					<div className="investor-box">
						<div className="row">
							<div className="col-md-6 bg-otp">
								<img
									src={"/assets/images/otp-security.png"}
									alt="upload"
									className=""
								/>
							</div>
							<div className="col-md-6 bg-white pd-custom-investor">
								{isExpired ? (
									<div className="form-login">
										<h3>This Link is expired!</h3>
									</div>
								) : (
									<div className="form-login">
										<h3>
											{location && location.pathname.includes("email-verification")
												? otpType === "email"
													? investorData && investorData.uccEmailStatus === "VERIFIED"
														? "Your email is verified!"
														: investorData && investorData.uccEmailStatus === "REJECTED"
														? "Your email request has been rejected"
														: "Please Verify your Account"
													: investorData && investorData.uccMobileStatus === "VERIFIED"
													? "Your mobile is verified!"
													: investorData && investorData.uccMobileStatus === "REJECTED"
													? "Your mobile request has been rejected"
													: investorData && investorData.uccMobileStatus === "SENT"
													? "Verification Link is already sent to your mobile number!"
													: "Please Verify your Account"
												: otpType === "mobile"
												? investorData && investorData.uccMobileStatus === "VERIFIED"
													? "Your mobile is verified!"
													: investorData && investorData.uccMobileStatus === "REJECTED"
													? "Your mobile request has been rejected"
													: "Please Verify your Account"
												: investorData && investorData.uccEmailStatus === "VERIFIED"
												? "Your email is verified!"
												: investorData && investorData.uccEmailStatus === "REJECTED"
												? "Your email request has been rejected"
												: investorData && investorData.uccEmailStatus === "SENT"
												? "Verification Link is already sent to your Email Id!"
												: "Please Verify your Account"}
										</h3>

										<div className="otp-radio-btn">
											<ToggleButtonGroup
												type="radio"
												className="btn-otp mt-3"
												name="options"
												value={otpType}
												onChange={(val) => handleToggle(val)}
											>
												<ToggleButton
													id="tbg-btn-2"
													className={
														otpType === "email" ? "btn-otp-inner active" : "btn-otp-inner"
													}
													value="email"
												>
													Email
												</ToggleButton>
												<ToggleButton
													id="tbg-btn-3"
													className={
														otpType === "mobile" ? "btn-otp-inner active" : "btn-otp-inner"
													}
													value="mobile"
												>
													Mobile
												</ToggleButton>
											</ToggleButtonGroup>
										</div>
										{location &&
										location.pathname.includes("email-verification") &&
										otpType === "email"
											? investorData &&
											  (investorData.uccEmailStatus === "VERIFIED" ||
													investorData.uccEmailStatus === "REJECTED")
												? null
												: renderOTPOptions()
											: location.pathname.includes("mobile-verification") &&
											  otpType === "mobile"
											? investorData &&
											  (investorData.uccMobileStatus === "VERIFIED" ||
													investorData.uccMobileStatus === "REJECTED")
												? null
												: renderOTPOptions()
											: null}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<SuccessModal
				show={isEmailVerified || isMobileVerified}
				message={
					isEmailVerified
						? investorData && investorData.uccEmailStatus === "REJECTED"
							? "Your Email has been Rejected!"
							: "Verified successfully!"
						: isMobileVerified
						? investorData && investorData.uccMobileStatus === "REJECTED"
							? "Your Mobile Number has been Rejected!"
							: "Verified successfully!"
						: ""
				}
				onHide={() =>
					resetInvestorFlags(
						isEmailVerified ? "isEmailVerified" : "isMobileVerified"
					)
				}
			/>
		</LoadingOverlay>
	);
};

const mapStateToProps = (state) => {
	return {
		loading: state.investor.loading,
		error: state.investor.error,
		token: state.user.token,
		investorData: state.investor.investorData,
		isEmailVerified: state.investor.isEmailVerified,
		isMobileVerified: state.investor.isMobileVerified,
	};
};

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			getExchangeInvestorData,
			verifyInvestorEmail,
			verifyInvestorMobile,
			resetInvestorFlags,
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(Investor);
