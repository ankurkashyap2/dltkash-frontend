import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AppLayout from "../layouts/appLayout";
import Sidebar from "../components/navbar/sidebar";
import {
	addSingleInvestor,
	resetInvestorFlags,
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
}) => {
	const validationSchema = () => {
		return Yup.object().shape({
			uccRequestId: Yup.string().required("* Request Id is required"),
			uccTmId: Yup.string().required("* TM Id is required"),
			uccTmName: Yup.string().required("* TM Name is required"),
			uccPanExempt: Yup.boolean().required("* PAN EXempt is required"),
			uccPanNo: Yup.string().required("* PAN Number is required"),
			uccCountry: Yup.string().required("* Country is required"),
			uccMobileNo: Yup.string().required("* Mobile Number is required"),
			uccEmailId: Yup.string().required("* Email Id is required"),
			uccMobileNoModified: Yup.boolean().required(
				"* Mobile Number modified is required"
			),
			uccEmailIdModified: Yup.boolean().required(
				"* Email Id modified is required"
			),
			uccDpId: Yup.string().required("* DP Id is required"),
			uccClientId: Yup.string().required("* Client Id is required"),
			uccInvestorCode: Yup.string().required("* Investor Code is required"),
			uccRequestType: Yup.string().required("* Request Type is required"),
			uccNodeStatus: Yup.string().required("* Node Status is required"),
			uccEmailStatus: Yup.boolean().required("* Email Status is required"),
			uccMobileStatus: Yup.boolean().required("* Mobile Status is required"),
			uccPanStatus: Yup.boolean().required("* PAN Status is required"),
		});
	};
	console.log("country", CountryList);
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
			uccMobileNoModified: false,
			uccEmailIdModified: false,
			uccDpId: "",
			uccClientId: "",
			uccInvestorCode: "",
			uccRequestType: "",
			uccNodeStatus: "01",
			uccEmailStatus: false,
			uccMobileStatus: false,
			uccPanStatus: false,
		};
		return initialValues;
	};

	const handleSubmit = (values) => {
		let payload = values;
		payload = {
			...payload,
			uccEmailIdModified: values.uccEmailIdModified.toString(),
			uccPanExempt: values.uccPanExempt.toString(),
			uccMobileNoModified: values.uccMobileNoModified.toString(),
			uccEmailStatus: values.uccEmailStatus ? "VERIFIED" : "NOT VERIFIED",
			uccMobileStatus: values.uccMobileStatus ? "VERIFIED" : "NOT VERIFIED",
			uccPanStatus: values.uccPanStatus ? "VERIFIED" : "NOT VERIFIED",
		};

		addSingleInvestor(payload, token);
	};
	return (
		<AppLayout page="UCC Verification" loading={loading}>
			<Sidebar />

			<div className="content content-is-open">
				<span className="side-panel-toggle">
					<i className="fa fa-bars"></i>
				</span>
				<h3>UCC Verificaiton</h3>
				<Row className="add_user">
					<Col className="col-lg-7 col-md-12">
						{error && <Alert variant="danger">{error}!</Alert>}
						<Formik
							initialValues={getInitialValues()}
							validate={validate(validationSchema)}
							onSubmit={handleSubmit}
							enableReinitialize={true}
							render={({ errors, handleChange, handleSubmit, values, touched }) => {
								console.log(errors);
								return (
									<Form className="form-align" noValidate onSubmit={handleSubmit}>
										<Row className="mb-4">
											<Col>
												<Form.Label className="text-bold">Verificaiton send via</Form.Label>
												<Form.Select defaultValue="Choose..." className="select-custom">
													<option>SMS and Email</option>
												</Form.Select>
											</Col>
										</Row>
										<Row>
											<Col>
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
														/>
														{!!touched.uccRequestId && !!errors.uccRequestId && (
															<p className="error-text">{errors.uccRequestId}</p>
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
														/>
														{!!touched.uccMobileNo && !!errors.uccMobileNo && (
															<p className="error-text">{errors.uccMobileNo}</p>
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
														/>
														{!!touched.uccTmId && !!errors.uccTmId && (
															<p className="error-text">{errors.uccTmId}</p>
														)}
													</Form.Group>
												</Row>
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
														/>
														{!!touched.uccDpId && !!errors.uccDpId && (
															<p className="error-text">{errors.uccDpId}</p>
														)}
													</Form.Group>
													<Form.Group
														className="col-lg-6 col-md-12"
														controlId="validationCustom01"
													>
														<Form.Label className="mb-0 text-bold">Country</Form.Label>
														<Form.Control
															as="select"
															custom
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
														</Form.Control>
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
														<Form.Label className="mb-0 text-bold">Client ID</Form.Label>
														<Form.Control
															required
															type="text"
															placeholder="Enter Client ID"
															className="field-size"
															name="uccClientId"
															onChange={handleChange}
															value={values.uccClientId}
														/>
														{!!touched.uccClientId && !!errors.uccClientId && (
															<p className="error-text">{errors.uccClientId}</p>
														)}
													</Form.Group>
													<Form.Group
														className="col-lg-6 col-md-12"
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
														/>
														{!!touched.uccInvestorCode && !!errors.uccInvestorCode && (
															<p className="error-text">{errors.uccInvestorCode}</p>
														)}
													</Form.Group>
												</Row>
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
														/>
														{!!touched.uccPanNo && !!errors.uccPanNo && (
															<p className="error-text">{errors.uccPanNo}</p>
														)}
													</Form.Group>
													<Form.Group
														className="col-lg-6 col-md-12 mt-3"
														controlId="validationCustom02"
													>
														<Form.Check
															type="switch"
															id="custom-switch switch-ucc"
															label="PAN Exempt"
															name="uccPanExempt"
															className="switch-label"
															onChange={handleChange}
															value={values.uccPanExempt}
														/>
														{!!touched.uccPanExempt && !!errors.uccPanExempt && (
															<p className="error-text">{errors.uccPanExempt}</p>
														)}
													</Form.Group>
												</Row>
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
														/>
														{!!touched.uccEmailId && !!errors.uccEmailId && (
															<p className="error-text">{errors.uccEmailId}</p>
														)}
													</Form.Group>
													<Form.Group
														className="col-lg-6 col-md-12 mt-3"
														controlId="validationCustom02"
													>
														<Form.Check
															type="switch"
															id="custom-switch switch-ucc"
															label="Email ID Modified"
															name="uccEmailIdModified"
															onChange={handleChange}
															value={values.uccEmailIdModified}
															className="switch-label"
														/>
														{!!touched.uccEmailIdModified && !!errors.uccEmailIdModified && (
															<p className="error-text">{errors.uccEmailIdModified}</p>
														)}
													</Form.Group>
												</Row>
												<Row className="mb-3">
													<Form.Group
														className="col-lg-6 col-md-12"
														controlId="validationCustom01"
													>
														<Form.Label className="mb-0 text-bold">Request Type</Form.Label>
														<Form.Control
															as="select"
															custom
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

															<option key="new" value="New">
																New
															</option>
															<option key="existing" value="Existing">
																Existing
															</option>
														</Form.Control>
														{!!touched.uccRequestType && !!errors.uccRequestType && (
															<p className="error-text">{errors.uccRequestType}</p>
														)}
													</Form.Group>
													<Form.Group
														as={Col}
														md="6"
														className="col-lg-6 col-md-12 mt-3"
														controlId="validationCustom02"
													>
														<Form.Check
															type="switch"
															id="custom-switch switch-ucc"
															label="Email Status"
															name="uccEmailStatus"
															onChange={handleChange}
															value={values.uccEmailStatus}
															className="switch-label"
														/>
														{!!touched.uccEmailStatus && !!errors.uccEmailStatus && (
															<p className="error-text">{errors.uccEmailStatus}</p>
														)}
													</Form.Group>
												</Row>
												<Row className="mb-3">
													<Form.Group
														as={Col}
														md="6"
														className="col-lg-6 col-md-12 mt-3"
														controlId="validationCustom02"
													>
														<Form.Check
															type="switch"
															id="custom-switch switch-ucc"
															label="Pan Status"
															name="uccPanStatus"
															className="switch-label"
															onChange={handleChange}
															value={values.uccPanStatus}
														/>
														{!!touched.uccPanStatus && !!errors.uccPanStatus && (
															<p className="error-text">{errors.uccPanStatus}</p>
														)}
													</Form.Group>
													<Form.Group
														as={Col}
														md="6"
														className="col-lg-6 col-md-12 mt-3"
														controlId="validationCustom02"
													>
														<Form.Check
															type="switch"
															id="custom-switch switch-ucc"
															label="Mobile Status"
															name="uccMobileStatus"
															className="switch-label"
															onChange={handleChange}
															value={values.uccMobileStatus}
														/>
														{!!touched.uccMobileStatus && !!errors.uccMobileStatus && (
															<p className="error-text">{errors.uccMobileStatus}</p>
														)}
													</Form.Group>
												</Row>
												<Row className="mt-5">
													<Col>
														<Button className="btn-outlined">Cancel</Button>
														<Button className="btn-position btn-filled" type="submit">
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
					getInitialValues();
					resetInvestorFlags("isInvestorCreated");
				}}
			/>
		</AppLayout>
	);
};

const mapStateToProps = (state) => {
	return {
		loading: state.investor.loading,
		error: state.investor.error,
		token: state.user.token,
		isInvestorCreated: state.investor.isInvestorCreated,
	};
};

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ addSingleInvestor, resetInvestorFlags }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UCCVerification);
