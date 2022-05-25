import React, { useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AppLayout from "../layouts/appLayout";
import Sidebar from "../components/navbar/sidebar";
import { changeSettings, resetUserFlags } from "../redux/user/actions";
import SuccessModal from "../components/successModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/dashboard.css";

const Settings = ({
	error,
	loading,
	changeSettings,
	token,
	isInvestorCreated,
	resetUserFlags,
	user,
	isSettingChanged,
}) => {
	const formikRef = useRef();
	const [startDate, setStartDate] = useState(
		user && user.existingDate ? new Date(user.existingDate) : ""
	);
	const [existingType, setExistingType] = useState(
		user && user.isExisitngDateSelected ? "date" : "days"
	);

	const validationSchema = () => {
		return Yup.object().shape({
			uccRequestType: Yup.string().required("* Request Type is required"),
			newAttempts: Yup.string().when("uccRequestType", {
				is: "NEW",
				then: Yup.string().required("* Number of days required"),
			}),
			existingAttempts: Yup.string().when("uccRequestType", {
				is: "EXISTING",
				then: Yup.string().required("* Number of days required"),
			}),
			modifiedAttempts: Yup.string().when("uccRequestType", {
				is: "MODIFIED",
				then: Yup.string().required("* Number of days required"),
			}),
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
			uccRequestType: "NEW",
			newAttempts: (user && user.newAttempts) || "",
			modifiedAttempts: (user && user.modifiedAttempts) || "",
			existingAttempts:
				user && user.isExisitngDateSelected ? 0 : user && user.existingAttempts,
		};
		return initialValues;
	};

	const handleSubmit = (values) => {
		let payload = values;
		payload = {
			...payload,
			exchangeId: user.exchangeId,
			existingDate: startDate,
		};
		if (values.uccRequestType === "NEW") {
			delete payload.existingAttempts;
			delete payload.existingDate;
			delete payload.modifiedAttempts;
		} else if (values.uccRequestType === "MODIFIED") {
			delete payload.existingAttempts;
			delete payload.existingDate;
			delete payload.newAttempts;
		} else {
			delete payload.newAttempts;
			delete payload.modifiedAttempts;
			if (existingType === "date") {
				delete payload.existingAttempts;
			} else {
				delete payload.existingDate;
			}
		}
		changeSettings(payload, token);
	};

	return (
		<AppLayout page="Settings" loading={loading}>
			<Sidebar />
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
								console.log(values);
								return (
									<Form className="form-align" noValidate onSubmit={handleSubmit}>
										<Form.Label className="text-bold">
											No. of Days/ Till Due Date investors will get notifications.
										</Form.Label>
										<Row>
											<Col>
												<div className="box-line">
													<Row className="mb-3">
														<Form.Group
															className="col-lg-6 col-md-12"
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
													<Form.Label className="mb-0 text-bold">
														Number of days till the link will be valid
													</Form.Label>
													{values.uccRequestType === "EXISTING" ? (
														<>
															<Form.Check
																label="Due Date"
																name="group1"
																type="radio"
																id="date"
																value="date"
																defaultChecked={existingType === "date"}
																onChange={(e) => setExistingType(e.target.value)}
															/>
															<Form.Check
																label="Number of Days"
																name="group1"
																type="radio"
																id="days"
																value="days"
																defaultChecked={existingType === "days"}
																onChange={(e) => setExistingType(e.target.value)}
															/>
															{existingType === "days" ? (
																<Form.Group
																	className="col-lg-6 col-md-12 mt-3"
																	controlId="validationCustom02"
																>
																	<Form.Label className="mb-0 text-bold">
																		Number of Days
																	</Form.Label>
																	<Form.Control
																		type="number"
																		min={1}
																		placeholder="Enter Number of days"
																		className="field-size"
																		name="existingAttempts"
																		onChange={handleChange}
																		value={values.existingAttempts}
																	/>
																	{!!touched.existingAttempts && !!errors.existingAttempts && (
																		<p className="error-text">{errors.existingAttempts}</p>
																	)}
																</Form.Group>
															) : null}
															{existingType === "date" ? (
																<Form.Group
																	className="col-lg-6 col-md-12 mt-3"
																	controlId="validationCustom02"
																>
																	<Form.Label className="mb-0 text-bold">Due Date</Form.Label>
																	<DatePicker
																		selected={startDate}
																		onChange={(d) => setStartDate(d)}
																		name="existingDate"
																		className="field-size form-control"
																		minDate={new Date()}
																	/>
																	{!startDate && (
																		<p className="error-text">{errors.existingDate}</p>
																	)}
																</Form.Group>
															) : null}
														</>
													) : (
														<Form.Group
															className="col-lg-6 col-md-12"
															controlId="validationCustom02"
														>
															<Form.Label className="mb-0 text-bold">
																Number of Days
															</Form.Label>
															<Form.Control
																type="number"
																min={1}
																placeholder="Enter Number of days"
																className="field-size"
																name={
																	values.uccRequestType === "NEW"
																		? "newAttempts"
																		: "modifiedAttempts"
																}
																onChange={handleChange}
																value={
																	values.uccRequestType === "NEW"
																		? values.newAttempts
																		: values.modifiedAttempts
																}
															/>
															{!!touched.newAttempts && !!errors.newAttempts && (
																<p className="error-text">{errors.newAttempts}</p>
															)}
															{!!touched.modifiedAttempts && !!errors.modifiedAttempts && (
																<p className="error-text">{errors.modifiedAttempts}</p>
															)}
														</Form.Group>
													)}
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
				show={isSettingChanged}
				message={"Settings updated successfully!"}
				onHide={() => {
					resetUserFlags("isSettingChanged");
				}}
			/>
		</AppLayout>
	);
};

const mapStateToProps = (state) => {
	return {
		loading: state.user.loading,
		error: state.user.error,
		token: state.user.token,
		user: state.user.profile,
		isSettingChanged: state.user.isSettingChanged,
	};
};

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ changeSettings, resetUserFlags }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
