import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import "../../styles/register.css";

const EntityDetailsForm = ({ setActiveTab, setEntityDetails }) => {
	const validationSchema = () => {
		return Yup.object().shape({
			legalEntityName: Yup.string().required("* Legal Entity Name is required"),
			sebiCertificateNumber: Yup.string().required(
				"* SEBI Certificate Number is required"
			),
			cinNumber: Yup.string().required("* CIN Number is required"),
			panNumber: Yup.string().required("* PAN Number is required"),
			sebiCertificate: Yup.mixed().required("* SEBI Certificate is required"),
			cinCertificate: Yup.mixed().required("* CIN Certificate is required"),
			pan: Yup.mixed().required("* PAN is required"),
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
			legalEntityName: "",
			sebiCertificateNumber: "",
			cinNumber: "",
			panNumber: "",
			sebiCertificate: null,
			cinCertificate: null,
			pan: null,
		};
		return initialValues;
	};

	const handleSubmit = (values) => {
		setEntityDetails(values);
		setActiveTab("personalDetails");
		// userLogin(
		// 	{ user_name: values.userName.toLowerCase(), password: values.password, remember },
		// 	history
		// );
	};

	return (
		<>
			<p>Step 1</p>
			<h3>Entity Details</h3>
			<p>Please enter the information about the entity</p>
			<Formik
				initialValues={getInitialValues()}
				validate={validate(validationSchema)}
				onSubmit={handleSubmit}
				enableReinitialize={true}
				render={({ errors, handleChange, handleSubmit, values, touched }) => {
					return (
						<Form className="form-align" noValidate onSubmit={handleSubmit}>
							<Form.Group className="mb-3" controlId="validationFormik01">
								<Form.Label className="text-bottom">Legal Entity</Form.Label>
								<Form.Control
									type="text"
									name="legalEntityName"
									required
									placeholder="Enter Legal Entity"
									className="field-size"
									onChange={handleChange}
									value={values.legalEntityName}
									isInvalid={!!errors.legalEntityName}
									isValid={touched.legalEntityName && !errors.legalEntityName}
								/>

								<Form.Control.Feedback type="invalid">
									{errors.legalEntityName}
								</Form.Control.Feedback>
							</Form.Group>
							<Row>
								<Form.Group as={Col} controlId="formGridEmail">
									<Form.Label className="text-bottom">SEBI Certificate</Form.Label>
									<Form.Control
										type="text"
										name="sebiCertificateNumber"
										placeholder="Enter SEBI Certificate Number"
										className="field-size"
										onChange={handleChange}
										value={values.sebiCertificateNumber}
										isInvalid={!!errors.sebiCertificateNumber}
										isValid={
											touched.sebiCertificateNumber && !errors.sebiCertificateNumber
										}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.sebiCertificateNumber}
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group as={Col} controlId="formGridPassword" className="file file--upload upload-label">
									<span>Upload SEBI Certificate</span>
									<Form.Label className="text-bottom">
									      <img
											src={"/assets/images/upload.png"}
											alt="upload"
											className="icon-login"
										/> Upload SEBI Certificate
									</Form.Label>
									<Form.Control
										type="file"
										required
										name="sebiCertificate"
										onChange={handleChange}
										isInvalid={!!errors.sebiCertificate}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.sebiCertificate}
									</Form.Control.Feedback>
									{/* <div className="file file--upload">
																<label for="input-file">
																	<img
																		src={"/assets/images/upload.png"}
																		alt="upload"
																		className="icon-login"
																	/>
																	Upload SEBI Certificate
																</label>
																<input id="input-file" type="file" />
															</div> */}
								</Form.Group>
							</Row>
							<Row>
								<Form.Group as={Col} controlId="formGridEmail">
									<Form.Label className="text-bottom">CIN</Form.Label>
									<Form.Control
										type="text"
										name="cinNumber"
										placeholder="Enter CIN Number"
										className="field-size"
										onChange={handleChange}
										value={values.cinNumber}
										isInvalid={!!errors.cinNumber}
										isValid={touched.cinNumber && !errors.cinNumber}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.cinNumber}
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group as={Col} controlId="formGridPassword" className="file file--upload upload-label">
								<span>Upload CIN</span>
									<Form.Label className="text-bottom"><img
											src={"/assets/images/upload.png"}
											alt="upload"
											className="icon-login"
										/>Upload CIN</Form.Label>
									<Form.Control
										type="file"
										required
										name="cinCertificate"
										onChange={handleChange}
										isInvalid={!!errors.cinCertificate}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.cinCertificate}
									</Form.Control.Feedback>
									{/* <div className="file file--upload">
																<label for="input-file">
																	<img
																		src={"/assets/images/upload.png"}
																		alt="upload"
																		className="icon-login"
																	/>
																	Upload CIN
																</label>
																<input id="input-file" type="file" />
															</div> */}
								</Form.Group>
							</Row>
							<Row>
								<Form.Group as={Col} controlId="formGridEmail">
									<Form.Label className="text-bottom">PAN</Form.Label>
									<Form.Control
										type="text"
										name="panNumber"
										placeholder="Enter PAN Number"
										className="field-size"
										onChange={handleChange}
										value={values.panNumber}
										isInvalid={!!errors.panNumber}
										isValid={touched.panNumber && !errors.panNumber}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.panNumber}
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group as={Col} controlId="formGridPassword" className="file file--upload upload-label"> 
								<span>Upload PAN</span>
									<Form.Label className="text-bottom"><img
											src={"/assets/images/upload.png"}
											alt="upload"
											className="icon-login"
										/>Upload PAN</Form.Label>
									<Form.Control
										type="file"
										required
										name="pan"
										onChange={handleChange}
										isInvalid={!!errors.pan}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.pan}
									</Form.Control.Feedback>
									{/* <div className="file file--upload">
																<label for="input-file">
																	<img
																		src={"/assets/images/upload.png"}
																		alt="upload"
																		className="icon-login"
																	/>
																	Upload PAN
																</label>
																<input id="input-file" type="file" />
															</div> */}
								</Form.Group>
							</Row>
							<Button className="btn-position btn-filled" type="submit">
								Next Step{" "}
								<img
									src={"/assets/images/arrowblue.png"}
									alt="next"
									className="icon-login-left"
								/>
							</Button>
						</Form>
					);
				}}
			/>
		</>
	);
};

export default EntityDetailsForm;
