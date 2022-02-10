import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
	Form,
	Button,
	Alert,
	ToggleButtonGroup,
	ToggleButton,
} from "react-bootstrap";
import AppLayout from "../layouts/appLayout";
import Countdown from "react-countdown";

import "../styles/investor.css";

const Investor = ({}) => {
	const [otpType, setOtpType] = useState("email");
	const [otpStatus, setOtpStatus] = useState("reject");
	let { token } = useParams();

	const renderer = ({ hours, minutes, seconds, completed }, values) => {
		// if (completed) {
		// 	return (
		// 		<Button
		// 			className="text-verify"
		// 			variant="link"
		// 			// onClick={() => handleEmailVerification(values)}
		// 		>
		// 			{/* {emailOtpText} */}
		// 		</Button>
		// 	);
		// } else {
		return (
			<span className="text-verify" style={{ bottom: "13px", right: "9px" }}>
				0{minutes}:{seconds}
			</span>
		);
		// }
	};
	console.log(otpStatus);
	return (
		<>
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
							<div className="col-md-6 bg-white p-5">
								<div className="form-login">
									<h3>Please Verify your Account</h3>
									<div className="otp-radio-btn">
										<ToggleButtonGroup
											type="radio"
											className="btn-otp mt-3"
											name="options"
											value={otpType}
											onChange={(val) => setOtpType(val)}
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
									<div className="radio-otp mt-4">
										<Form>
											<Form.Check
												label="Reject Verification"
												name="group1"
												type="radio"
												id="reject"
												value="reject"
												onChange={(e) => setOtpStatus(e.target.value)}
											/>
											<Form.Check
												label="Generate OTP"
												name="group1"
												type="radio"
												id="generate"
												value="generate"
												onChange={(e) => setOtpStatus(e.target.value)}
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
												/>
												<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
											</Form.Group>
											<p className="text-otp p-3">
												Your OTP is <span>345673</span>
											</p>
											<Countdown date={Date.now() + 60000} renderer={renderer} />
										</>
									) : null}
									<Button variant="primary" className="w-100 p-2 mt-3">
										Submit
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Investor;
