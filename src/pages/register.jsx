import React from "react";
import { Form, Button, Row, Col, Tabs, Tab } from "react-bootstrap";
import { ReactComponent as RightArrow } from "../components/icons/rightarrow.svg";
import { ReactComponent as TickIcon } from "../components/icons/tick.svg";
import Navbar from "../components/navbar";
import "../styles/register.css";

const Register = () => {
	return (
		<>
			<Navbar page="Register" />
			{
				<div class="main-content">
					<div className="outer-box">
						<div className="Register-box">
							<Tabs
								defaultActiveKey="home"
								id="uncontrolled-tab-example"
								className="btn-tab mb-3"
							>
								<Tab eventKey="home" title="1. Entity Details">
									<p>Step 1</p>
									<h3>Entity Details</h3>
									<p>Please enter the information about the entity</p>
									<Form className="form-align">
										<Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
											<Form.Label className="text-bottom">Legal Entity</Form.Label>
											<Form.Control
												type="email"
												placeholder="Enter Legal Entity"
												className="field-size"
											/>
										</Form.Group>
										<Row>
											<Form.Group as={Col} controlId="formGridEmail">
												<Form.Label className="text-bottom">SEBI Certificate</Form.Label>
												<Form.Control
													type="text"
													placeholder="Enter SEBI Certificate Number"
													className="field-size"
												/>
											</Form.Group>
											<Form.Group as={Col} controlId="formGridPassword">
												<Form.Label className="text-bottom">
													Upload SEBI Certificate
												</Form.Label>
												<div className="file file--upload">
													<label for="input-file">
														<img
															src={"/assets/images/upload.png"}
															alt="upload"
															className="icon-login"
														/>
														Upload SEBI Certificate
													</label>
													<input id="input-file" type="file" />
												</div>
											</Form.Group>
										</Row>
										<Row>
											<Form.Group as={Col} controlId="formGridEmail">
												<Form.Label className="text-bottom">CIN</Form.Label>
												<Form.Control
													type="text"
													placeholder="Enter CIN Number"
													className="field-size"
												/>
											</Form.Group>
											<Form.Group as={Col} controlId="formGridPassword">
												<Form.Label className="text-bottom">Upload CIN</Form.Label>
												<div className="file file--upload">
													<label for="input-file">
														<img
															src={"/assets/images/upload.png"}
															alt="upload"
															className="icon-login"
														/>
														Upload CIN
													</label>
													<input id="input-file" type="file" />
												</div>
											</Form.Group>
										</Row>
										<Row>
											<Form.Group as={Col} controlId="formGridEmail">
												<Form.Label className="text-bottom">PAN</Form.Label>
												<Form.Control
													type="text"
													placeholder="Enter PAN Number"
													className="field-size"
												/>
											</Form.Group>
											<Form.Group as={Col} controlId="formGridPassword">
												<Form.Label className="text-bottom">Upload PAN</Form.Label>
												<div className="file file--upload">
													<label for="input-file">
														<img
															src={"/assets/images/upload.png"}
															alt="upload"
															className="icon-login"
														/>
														Upload PAN
													</label>
													<input id="input-file" type="file" />
												</div>
											</Form.Group>
										</Row>
										<Button className="btn-position btn-filled">
											Next Step{" "}
											<img
												src={"/assets/images/arrowblue.png"}
												alt="next"
												className="icon-login-left"
											/>
										</Button>
									</Form>
								</Tab>
								<Tab eventKey="profile" title="2. Personal Information">
									<p>Step 2</p>
									<h3>Personal Information</h3>
									<p>Please enter the information about yourself</p>
									<Form className="form-align">
										<Row>
											<Form.Group as={Col} controlId="formGridEmail">
												<Form.Label className="text-bottom">User Name</Form.Label>
												<Form.Control
													type="email"
													placeholder="Enter User Name"
													className="field-size"
												/>
											</Form.Group>
											<Form.Group as={Col} controlId="formGridEmail">
												<div class="box box-primary">
													<div class="box-body box-profile">
														<div>
															<div class="avatar-upload">
																<div class="avatar-edit">
																	<form action="" method="post" id="form-image">
																		<input
																			type="file"
																			id="imageUpload"
																			accept=".png, .jpg, .jpeg"
																		/>
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
											</Form.Group>
										</Row>
										<Row>
											<Form.Group as={Col} controlId="formGridEmail">
												<Form.Label className="text-bottom">Mobile Number</Form.Label>
												<Form.Control
													type="text"
													placeholder="Enter Mobile Number"
													className="field-size"
												/>
												<a href="#" className="text-verify">
													Verify
												</a>
											</Form.Group>
											<Form.Group as={Col} controlId="formGridEmail">
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
											<Form.Group as={Col} controlId="formGridEmail">
												<Form.Label className="text-bottom">Email Address</Form.Label>
												<Form.Control
													type="text"
													placeholder="Enter Email Address"
													className="field-size"
												/>
												<a href="#" className="text-verify">
													Verify
												</a>
											</Form.Group>
											<Form.Group as={Col} controlId="formGridEmail">
												<Form.Label className="text-bottom">Enter Email OTP </Form.Label>
												<a href="#" className="text-forgot-pwd">
													Resend OTP
												</a>
												<Form.Control
													type="text"
													placeholder="Enter OTP"
													className="field-size"
												/>
											</Form.Group>
										</Row>
										<Row>
											<Form.Group as={Col} controlId="formGridPassword">
												<Form.Label className="text-bottom">Password</Form.Label>
												<Form.Control
													type="password"
													placeholder="Enter Password"
													className="field-size"
												/>
											</Form.Group>
											<Form.Group as={Col} controlId="formGridPassword">
												<Form.Label className="text-bottom">Confirm Password</Form.Label>
												<Form.Control
													type="password"
													placeholder="Confirm Password"
													className="field-size"
												/>
											</Form.Group>
										</Row>
										<Button className="btn-outlined">
											<RightArrow className="icon-login" />
											Prev Step
										</Button>
										<Button className="btn-position btn-filled">
											<TickIcon className="icon-login" />
											Register
										</Button>
									</Form>
								</Tab>
							</Tabs>
						</div>
					</div>
				</div>
			}
		</>
	);
};

export default Register;
