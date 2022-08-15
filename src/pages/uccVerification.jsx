import React, { useRef } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, Row, Col, Alert, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AppLayout from "../layouts/appLayout";
import {
	addSingleInvestor,
	resetInvestorFlags,
	resetExchangeData,
} from "../redux/investor/actions";
import SuccessModal from "../components/successModal";
import CountryList from "../configs/countries.json";
import "../styles/dashboard.css";

const UCCVerification = ({
	error,
	loading,
	addSingleInvestor,
	token,
	isInvestorCreated,
	resetInvestorFlags,
	investorData,
	resetExchangeData,
}) => {
	const formikRef = useRef();
	const validationSchema = () => {
		return Yup.object().shape({
			uccRequestId: Yup.string().trim().required("* Request Id is required"),
			uccTmId: Yup.string().trim().required("* TM Id is required"),
			uccTmName: Yup.string().trim().required("* TM Name is required"),
			uccPanExempt: Yup.boolean().required("* PAN EXempt is required"),
			uccPanNo: Yup.string()
				.trim()
				.when("uccPanExempt", {
					is: false,
					then: Yup.string().required("* PAN Number is required"),
				}),
			uccCountry: Yup.string().trim().required("* Country is required"),
			uccMobileNo: Yup.string()
				.trim()
				.matches(
					/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
					"* Invalid Mobile Number"
				)
				.required("* Mobile Number is required"),
			uccEmailId: Yup.string()
				.trim()
				.email("* Please enter valid format")
				.required("* Email Id is required"),
			uccDpId: Yup.string()
				.trim()
				.when("uccPanExempt", {
					is: true,
					then: Yup.string().required("* DP Id is required"),
				}),
			uccClientId: Yup.string()
				.trim()
				.when("uccPanExempt", {
					is: true,
					then: Yup.string().required("* Client Id is required"),
				}),
			uccInvestorCode: Yup.string().trim().required("* Investor Code is required"),
			uccRequestType: Yup.string().trim().required("* Request Type is required"),
			uccNodeStatus: Yup.string().trim().required("* Node Status is required"),
			// uccPanStatus: Yup.boolean().required("* PAN Status is required"),
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
			uccRequestId: "",
			uccTmId: "",
			uccTmName: "",
			uccPanExempt: false,
			uccPanNo: "",
			uccCountry: "",
			uccMobileNo: "",
			uccEmailId: "",
			uccDpId: "",
			uccClientId: "",
			uccInvestorCode: "",
			uccRequestType: "NEW",
			uccNodeStatus: "01",
			// uccPanStatus: true,
		};
		return initialValues;
	};

	const handleSubmit = (values) => {
		let payload = values;
		payload = {
			...payload,
			email: values.uccEmailId.toLowerCase(),
			uccPanExempt: values.uccPanExempt.toString(),
			// uccPanStatus: !values.uccPanExempt ? "VERIFIED" : "NOT_VERIFIED",
		};
		if (values.uccPanExempt) {
			delete payload.uccPanNo;
		} else {
			delete payload.uccDpId;
			delete payload.uccClientId;
		}
		addSingleInvestor(payload, token);
	};

	return (
		<AppLayout page="UCC Verification" loading={loading}>
			<div className="content content-is-open">
				<Row className="add_user">
					<Col className="col-lg-10 col-md-12">
						{error && <Alert variant="danger">{error}!</Alert>}
						<Formik
							innerRef={formikRef}
							initialValues={getInitialValues()}
							validate={validate(validationSchema)}
							onSubmit={handleSubmit}
							enableReinitialize={true}
							render={({
								errors,
								handleChange,
								handleSubmit,
								values,
								touched,
								resetForm,
							}) => {
								return (
									<Form className="form-align" noValidate onSubmit={handleSubmit}>
										<Row className="mb-4">
											<Col>
												<Form.Label className="text-bold">Verification send via</Form.Label>
												<Form.Select defaultValue="Choose..." className="select-custom">
													<option>SMS and Email</option>
												</Form.Select>
											</Col>
										</Row>
										<Row>
											<Col>
												<div className="box-line">
													<Row className="mb-3">
														<Form.Group
															className="col-lg-12 col-md-12"
															controlId="validationCustom01"
														>
															<Form.Label className="mb-0 text-bold">Request Type</Form.Label>
															<Form.Select
																className="field-size"
																name="uccRequestType"
																value={values.uccRequestType}
																onChange={handleChange}
															>
																<option
																	key="blankChoice"
																	hidden
																	value
																	className="select-placeholder"
																>
																	Choose...
																</option>

																<option key="NEW" value="NEW">
																	New
																</option>
																<option key="EXISTING" value="EXISTING">
																	Existing
																</option>
																<option key="MODIFIED" value="MODIFIED">
																	Modified
																</option>
															</Form.Select>

															{!!touched.uccRequestType && !!errors.uccRequestType && (
																<p className="error-text">{errors.uccRequestType}</p>
															)}
														</Form.Group>
													</Row>
													<Row className="mb-3">
														<Form.Group
															className="col-lg-6 col-md-12"
															controlId="validationCustom01"
														>
															<Form.Label className="mb-0 text-bold">Request ID</Form.Label>
															<Form.Control
																type="text"
																placeholder="Enter Request Id"
																className="field-size"
																name="uccRequestId"
																onChange={handleChange}
																value={values.uccRequestId}
																autoComplete="off"
															/>
															{!!touched.uccRequestId && !!errors.uccRequestId && (
																<p className="error-text">{errors.uccRequestId}</p>
															)}
														</Form.Group>
														<Form.Group
															className="col-lg-6 col-md-12"
															controlId="validationCustom01"
														>
															<Form.Label className="mb-0 text-bold">Country</Form.Label>
															<Form.Select
																className="field-size"
																name="uccCountry"
																value={values.uccCountry}
																onChange={handleChange}
															>
																<option key="blankChoice" hidden value>
																	Choose...
																</option>
																{CountryList &&
																	CountryList.records.map((item) => (
																		<option key={item.id} value={item.country}>
																			{item.country}
																		</option>
																	))}
															</Form.Select>
															{!!touched.uccCountry && !!errors.uccCountry && (
																<p className="error-text">{errors.uccCountry}</p>
															)}
														</Form.Group>
													</Row>

													<Row className="mb-3">
														<Form.Group
															className="col-lg-6 col-md-12"
															controlId="validationCustom01"
														>
															<Form.Label className="mb-0 text-bold">TM Name</Form.Label>
															<Form.Control
																required
																type="text"
																placeholder="Enter TM Name"
																className="field-size"
																name="uccTmName"
																onChange={handleChange}
																value={values.uccTmName}
																autoComplete="off"
															/>
															{!!touched.uccTmName && !!errors.uccTmName && (
																<p className="error-text">{errors.uccTmName}</p>
															)}
														</Form.Group>
														<Form.Group
															className="col-lg-6 col-md-12"
															controlId="validationCustom02"
														>
															<Form.Label className="mb-0 text-bold">TM ID</Form.Label>
															<Form.Control
																required
																type="text"
																placeholder="Enter TM ID"
																className="field-size"
																name="uccTmId"
																onChange={handleChange}
																value={values.uccTmId}
																autoComplete="off"
															/>
															{!!touched.uccTmId && !!errors.uccTmId && (
																<p className="error-text">{errors.uccTmId}</p>
															)}
														</Form.Group>
													</Row>
													<Row>
														<Form.Group
															className="col-lg-12 col-md-12"
															controlId="validationCustom02"
														>
															<Form.Label className="mb-0 text-bold">Investor Code</Form.Label>
															<Form.Control
																required
																type="text"
																placeholder="Enter Investor Code"
																className="field-size"
																name="uccInvestorCode"
																onChange={handleChange}
																value={values.uccInvestorCode}
																autoComplete="off"
															/>
															{!!touched.uccInvestorCode && !!errors.uccInvestorCode && (
																<p className="error-text">{errors.uccInvestorCode}</p>
															)}
														</Form.Group>
													</Row>
												</div>
												<div className="box-line">
													<Row className="mb-3">
														<Form.Group
															className="col-lg-6 col-md-12 mb-3"
															controlId="validationCustom02"
														>
															<Row>
																<Col>
																	<Form.Label className="mb-0">PAN Exempt</Form.Label>
																</Col>
																<Col>
																	<Form.Check
																		type="switch"
																		id="custom-switch switch-ucc"
																		name="uccPanExempt"
																		className="switch-label"
																		onChange={handleChange("uccPanExempt")}
																		checked={values.uccPanExempt}
																	/>
																</Col>
															</Row>
															{!!touched.uccPanExempt && !!errors.uccPanExempt && (
																<p className="error-text">{errors.uccPanExempt}</p>
															)}
														</Form.Group>
													</Row>
													{values.uccPanExempt ? (
														<Row className="mb-3">
															<Form.Group
																className="col-lg-6 col-md-12"
																controlId="validationCustom02"
															>
																<Form.Label className="mb-0 text-bold">DP ID</Form.Label>
																<Form.Control
																	required
																	type="text"
																	placeholder="Enter DP ID"
																	className="field-size"
																	name="uccDpId"
																	onChange={handleChange}
																	value={values.uccDpId}
																	autoComplete="off"
																/>
																{!!touched.uccDpId && !!errors.uccDpId && (
																	<p className="error-text">{errors.uccDpId}</p>
																)}
															</Form.Group>

															<Form.Group
																className="col-lg-6 col-md-12"
																controlId="validationCustom01"
															>
																<Form.Label className="mb-0 text-bold">Client ID</Form.Label>
																<Form.Control
																	required
																	type="text"
																	placeholder="Enter Client ID"
																	className="field-size"
																	name="uccClientId"
																	onChange={handleChange}
																	value={values.uccClientId}
																	autoComplete="off"
																/>
																{!!touched.uccClientId && !!errors.uccClientId && (
																	<p className="error-text">{errors.uccClientId}</p>
																)}
															</Form.Group>
														</Row>
													) : (
														<Row className="mb-3">
															<Form.Group
																className="col-lg-6 col-md-12"
																controlId="validationCustom02"
															>
																<Form.Label className="mb-0 text-bold">PAN No</Form.Label>
																<Form.Control
																	required
																	type="text"
																	placeholder="Enter PAN No"
																	className="field-size"
																	name="uccPanNo"
																	onChange={handleChange}
																	value={values.uccPanNo}
																	autoComplete="off"
																/>
																{!!touched.uccPanNo && !!errors.uccPanNo && (
																	<p className="error-text">{errors.uccPanNo}</p>
																)}
															</Form.Group>
														</Row>
													)}
													{/* {values.uccPanExempt ? null : (
														<Row>
															<Form.Group
																as={Col}
																md="6"
																className="col-lg-6 col-md-12"
																controlId="validationCustom02"
															>
																<Row>
																	<Col>
																		<Form.Label className="mb-0">
																			Is the PAN number already verified?
																		</Form.Label>
																	</Col>
																	<Col>
																		<Form.Check
																			type="switch"
																			id="custom-switch switch-ucc"
																			name="uccPanStatus"
																			className="switch-label"
																			onChange={handleChange}
																			value={values.uccPanStatus}
																			defaultChecked
																			disabled
																		/>
																	</Col>
																</Row>

																{!!touched.uccPanStatus && !!errors.uccPanStatus && (
																	<p className="error-text">{errors.uccPanStatus}</p>
																)}
															</Form.Group>
														</Row>
													)} */}
												</div>
												<div className="box-line">
													<Row className="mb-3">
														<Form.Group
															className="col-lg-6 col-md-12"
															controlId="validationCustom01"
														>
															<Form.Label className="mb-0 text-bold">Email ID</Form.Label>
															<Form.Control
																required
																type="email"
																placeholder="Enter Email ID"
																className="field-size"
																name="uccEmailId"
																onChange={handleChange}
																value={values.uccEmailId}
																autoComplete="off"
															/>
															{!!touched.uccEmailId && !!errors.uccEmailId && (
																<p className="error-text">{errors.uccEmailId}</p>
															)}
														</Form.Group>
														<Form.Group
															className="col-lg-6 col-md-12"
															controlId="validationCustom02"
														>
															<Form.Label className="mb-0 text-bold">Mobile No</Form.Label>
															<Form.Control
																type="text"
																placeholder="Enter Mobile No"
																className="field-size"
																name="uccMobileNo"
																onChange={handleChange}
																value={values.uccMobileNo}
																autoComplete="off"
															/>
															{!!touched.uccMobileNo && !!errors.uccMobileNo && (
																<p className="error-text">{errors.uccMobileNo}</p>
															)}
														</Form.Group>
													</Row>
												</div>

												<Row className="mt-5">
													<Col>
														<Button className="btn-filled" type="submit">
															Submit
														</Button>
													</Col>
												</Row>
											</Col>
										</Row>
									</Form>
								);
							}}
						/>
					</Col>
				</Row>
			</div>
			<SuccessModal
				show={isInvestorCreated}
				message={"Your Request queued successfully!"}
				onHide={() => {
					formikRef.current?.resetForm();
					resetInvestorFlags("isInvestorCreated");
				}}
			/>
			<Modal
				show={investorData}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
				onHide={() => resetExchangeData()}
			>
				<Modal.Body className="p-5">
					<h5>Request Id already exist with following data</h5>
					<Row>
						<Col className="col-6 investor-popup">
							<p>Request Type: {investorData && investorData.uccRequestType}</p>
							<p>TM Name: {investorData && investorData.uccTmName}</p>
							<p>Country: {investorData && investorData.uccCountry}</p>
							<p>PAN Exempt: {investorData && investorData.uccPanExempt}</p>
							{investorData && !investorData.uccPanExempt ? (
								<p>DP Id: {investorData && investorData.uccDpId}</p>
							) : null}
							<p>Email Id: {investorData && investorData.uccEmailId}</p>
						</Col>
						<Col className="col-6 investor-popup">
							<p>Request Id: {investorData && investorData.uccRequestId}</p>
							<p>TM Id: {investorData && investorData.uccTmId}</p>
							<p>Investor Code: {investorData && investorData.uccInvestorCode}</p>
							{investorData && investorData.uccPanExempt ? (
								<p>PAN Number: {investorData && investorData.uccPanNo}</p>
							) : null}
							{investorData && !investorData.uccPanExempt ? (
								<p>Client Id: {investorData && investorData.uccClientId}</p>
							) : null}
							<p>Mobile Number: {investorData && investorData.uccMobileNo}</p>
						</Col>
					</Row>

					<Button
						className="btn-filled"
						style={{ float: "right" }}
						onClick={() => resetExchangeData()}
					>
						Okay
					</Button>
				</Modal.Body>
			</Modal>
		</AppLayout>
	);
};

const mapStateToProps = (state) => {
	return {
		loading: state.investor.loading,
		error: state.investor.error,
		token: state.user.token,
		isInvestorCreated: state.investor.isInvestorCreated,
		investorData: state.investor.investorData,
	};
};

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{ addSingleInvestor, resetInvestorFlags, resetExchangeData },
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(UCCVerification);
