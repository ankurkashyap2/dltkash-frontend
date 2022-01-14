import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import "../../styles/register.css";

const EntityDetailsForm = ({ setActiveTab, setEntityDetails }) => {
	const [sebiCertificate, setSebiCertificate] = useState([]);
	const [sebiCertificateError, setSebiCertificateError] = useState("");
	const [cinCertificate, setCinCertificate] = useState([]);
	const [cinCertificateError, setCinCertificateError] = useState("");
	const [pan, setPan] = useState([]);
	const [panError, setPanError] = useState("");

	const validationSchema = () => {
		return Yup.object().shape({
			legalEntityName: Yup.string().required("* Legal Entity Name is required"),
			sebiCertificateNumber: Yup.string().required(
				"* SEBI Certificate Number is required"
			),
			cinNumber: Yup.string().required("* CIN Number is required"),
			panNumber: Yup.string().required("* PAN Number is required"),
			// sebiCertificate: Yup.mixed().required("* SEBI Certificate is required"),
			// cinCertificate: Yup.mixed().required("* CIN Certificate is required"),
			// pan: Yup.mixed().required("* PAN is required"),
		});
	};

	const validate = (getValidationSchema) => {
		return (values) => {
			const validationSchema = getValidationSchema(values);
			try {
				validationSchema.validateSync(values, { abortEarly: false });
				return {};
			} catch (error) {
				validateExtras();
				return getErrorsFromValidationError(error);
			}
		};
	};

	const validateExtras = () => {
		let update = true;
		if (sebiCertificate.length === 0) {
			setSebiCertificateError("* SEBI Certificate is required");
			update = false;
		}
		if (cinCertificate.length === 0) {
			setCinCertificateError("* CIN Certificate is required");
			update = false;
		}
		if (pan.length === 0) {
			setPanError("* PAN is required");
			update = false;
		}
		return update;
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
			// sebiCertificate: null,
			// cinCertificate: null,
			// pan: null,
		};
		return initialValues;
	};

	const handleFileUpload = (type, acceptedFiles) => {
		if (type === "sebi") {
			setSebiCertificateError("");
			setSebiCertificate(
				acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				)
			);
		} else if (type === "cin") {
			setCinCertificateError("");
			setCinCertificate(
				acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				)
			);
		} else {
			setPanError("");
			setPan(
				acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				)
			);
		}
	};

	const handleDropReject = (type, rejected) => {
		if (type === "sebi") {
			setSebiCertificateError("* SEBI Certificate is required");
		} else if (type === "cin") {
			setCinCertificateError("* CIN Certificate is required");
		} else {
			setPanError("* PAN is required");
		}
	};

	const handleSubmit = (values) => {
		if (validateExtras()) {
			setEntityDetails(values);
			setActiveTab("personalDetails");
		}
	};

	console.log(sebiCertificateError, cinCertificateError, panError);
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
								<Form.Group as={Col} controlId="formGridEmail">
									<Form.Label className="text-bottom">SEBI Certificate</Form.Label>
									<Dropzone
										// maxSize={512000}
										onDrop={(acceptedFiles) => handleFileUpload("sebi", acceptedFiles)}
										onDropRejected={(rejected) => handleDropReject("sebi", rejected)}
										multiple={false}
										accept=".pdf"
									>
										{({ getRootProps, getInputProps }) => (
											<div>
												{sebiCertificate.length && sebiCertificate.length > 0 ? (
													<section className="file file--upload">
														<input {...getInputProps()} />
														<div {...getRootProps()}>
															{sebiCertificate.map((file, index) => {
																return (
																	<div {...getRootProps()} className="file file--upload">
																		<span className="after_upload_text">{file.name}</span>
																	</div>
																);
															})}
														</div>
													</section>
												) : (
													<section>
														<input {...getInputProps()} />
														<div {...getRootProps()} className="file file--upload">
															<label for="input-file">
																<img
																	src={"/assets/images/upload.png"}
																	alt="upload"
																	className="icon-login"
																/>
																Upload SEBI Certificate
															</label>
														</div>
													</section>
												)}
											</div>
										)}
									</Dropzone>
									<Form.Control.Feedback type="invalid" style={{ display: "block" }}>
										{sebiCertificateError}
									</Form.Control.Feedback>
								</Form.Group>
								{/* <Form.Group
									as={Col}
									controlId="formGridPassword"
									className="file file--upload upload-label"
								>
									<span>Upload SEBI Certificate</span>
									<Form.Label className="text-bottom">
										<img
											src={"/assets/images/upload.png"}
											alt="upload"
											className="icon-login"
										/>{" "}
										Upload SEBI Certificate
									</Form.Label>
									<Form.Control
										type="file"
										required
										name="sebiCertificate"
										onChange={handleChange}
										value={values.sebiCertificate}
										isInvalid={!!errors.sebiCertificate}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.sebiCertificate}
									</Form.Control.Feedback>
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
								</Form.Group> */}
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
								<Form.Group as={Col} controlId="formGridEmail">
									<Form.Label className="text-bottom">Upload CIN</Form.Label>
									<Dropzone
										// maxSize={512000}
										onDrop={(acceptedFiles) => handleFileUpload("cin", acceptedFiles)}
										onDropRejected={(rejected) => handleDropReject("cin", rejected)}
										multiple={false}
										accept=".pdf"
									>
										{({ getRootProps, getInputProps }) => (
											<div>
												{cinCertificate.length && cinCertificate.length > 0 ? (
													<section className="file file--upload">
														<input {...getInputProps()} />
														<div {...getRootProps()}>
															{cinCertificate.map((file, index) => {
																return (
																	<div {...getRootProps()} className="file file--upload">
																		<span className="after_upload_text">{file.name}</span>
																	</div>
																);
															})}
														</div>
													</section>
												) : (
													<section>
														<input {...getInputProps()} />
														<div {...getRootProps()} className="file file--upload">
															<label for="input-file">
																<img
																	src={"/assets/images/upload.png"}
																	alt="upload"
																	className="icon-login"
																/>
																Upload CIN
															</label>
														</div>
													</section>
												)}
											</div>
										)}
									</Dropzone>
									<Form.Control.Feedback type="invalid">
										{cinCertificateError}
									</Form.Control.Feedback>
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
								<Form.Group as={Col} controlId="formGridPassword">
									<Form.Label className="text-bottom">Upload PAN</Form.Label>
									<Dropzone
										// maxSize={512000}
										onDrop={(acceptedFiles) => handleFileUpload("pan", acceptedFiles)}
										onDropRejected={(rejected) => handleDropReject("pan", rejected)}
										multiple={false}
										accept=".pdf"
									>
										{({ getRootProps, getInputProps }) => (
											<div>
												{pan.length && pan.length > 0 ? (
													<section className="file file--upload">
														<input {...getInputProps()} />
														<div {...getRootProps()}>
															{pan.map((file, index) => {
																return (
																	<div {...getRootProps()} className="file file--upload">
																		<span className="after_upload_text">{file.name}</span>
																	</div>
																);
															})}
														</div>
													</section>
												) : (
													<section>
														<input {...getInputProps()} />
														<div {...getRootProps()} className="file file--upload">
															<label for="input-file">
																<img
																	src={"/assets/images/upload.png"}
																	alt="upload"
																	className="icon-login"
																/>
																Upload PAN
															</label>
														</div>
													</section>
												)}
											</div>
										)}
									</Dropzone>
									<Form.Control.Feedback type="invalid">
										{panError}
									</Form.Control.Feedback>
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
