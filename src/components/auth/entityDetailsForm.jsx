import React, { useState } from "react";
import {
	Form,
	Button,
	Row,
	Col,
	OverlayTrigger,
	Tooltip,
} from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { ReactComponent as Question } from "../icons/Question.svg";
import { ReactComponent as CameraIcon } from "../icons/camera.svg";
import Dropzone from "react-dropzone";
import "../../styles/register.css";

const EntityDetailsForm = ({ setActiveTab, setEntityDetails }) => {
	const [sebiCertificate, setSebiCertificate] = useState([]);
	const [sebiCertificateError, setSebiCertificateError] = useState("");
	const [cinCertificate, setCinCertificate] = useState([]);
	const [cinCertificateError, setCinCertificateError] = useState("");
	const [pan, setPan] = useState([]);
	const [panError, setPanError] = useState("");
	const [logo, setLogo] = useState([]);
	const [logoError, setLogoError] = useState("");

	const validationSchema = () => {
		return Yup.object().shape({
			legalEntityName: Yup.string().required("* Legal Entity Name is required"),
			sebiCertificateNumber: Yup.string().required(
				"* SEBI Certificate Number is required"
			),
			cinNumber: Yup.string().required("* CIN Number is required"),
			panNumber: Yup.string().required("* PAN Number is required"),
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
		if (logo.length === 0) {
			setLogoError("* Logo is required");
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
		} else if (type === "logo") {
			setLogoError("");
			setLogo(
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
		} else if (type === "logo") {
			setLogoError("* Logo is required");
		} else {
			setPanError("* PAN is required");
		}
	};

	const handleSubmit = (values) => {
		if (validateExtras()) {
			setEntityDetails({ ...values, sebiCertificate, cinCertificate, pan, logo });
			setActiveTab("personalDetails");
		}
	};

	return (
		<>
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
									md="6"
									sm="12"
									controlId="formGridEmail"
									className="center"
								>
									<div className="box box-primary">
										<div className="box-body box-profile">
											<Dropzone
												// maxSize={512000}
												onDrop={(acceptedFiles) => handleFileUpload("logo", acceptedFiles)}
												onDropRejected={(rejected) => handleDropReject("logo", rejected)}
												multiple={false}
												accept=".png, .jpg, .jpeg"
											>
												{({ getRootProps, getInputProps }) => (
													<div>
														{logo.length && logo.length > 0 ? (
															<section>
																<div className="avatar-preview">
																	{logo.map((file, index) => {
																		return (
																			<img
																				src={file.preview}
																				className="profile-user-img img-responsive img-circle"
																				alt="User profile"
																				id="imagePreview"
																			/>
																		);
																	})}
																	<input {...getInputProps()} />
																	<div {...getRootProps()}>
																		<CameraIcon className="camera-icon" />
																	</div>
																</div>
															</section>
														) : (
															<section>
																<div className="avatar-preview">
																	<img
																		src="/assets/images/avatar.png"
																		className="profile-user-img img-responsive img-circle"
																		alt="User profile"
																		id="imagePreview"
																	/>
																	<input {...getInputProps()} />
																	<div {...getRootProps()}>
																		<CameraIcon className="camera-icon" />
																	</div>
																</div>
															</section>
														)}
													</div>
												)}
											</Dropzone>
										</div>
									</div>
									{logoError && <p className="error-text">{logoError}</p>}
								</Form.Group>
								<Form.Group
									as={Col}
									md="6"
									sm="12"
									className="mb-3"
									controlId="validationFormik01"
								>
									<Form.Label className="text-bottom">
										Legal Entity<span className="error-text">*</span>
									</Form.Label>
									<Form.Control
										type="text"
										name="legalEntityName"
										required
										placeholder="Enter Legal Entity"
										className="field-size"
										onChange={handleChange}
										value={values.legalEntityName}
									/>
									{!!touched.legalEntityName && !!errors.legalEntityName && (
										<p className="error-text">{errors.legalEntityName}</p>
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
									<Form.Label className="text-bottom">SEBI Certificate</Form.Label>
									<Form.Control
										type="text"
										name="sebiCertificateNumber"
										placeholder="Enter SEBI Certificate Number"
										className="field-size"
										onChange={handleChange}
										value={values.sebiCertificateNumber}
									/>
									{!!touched.sebiCertificateNumber && !!errors.sebiCertificateNumber && (
										<p className="error-text">{errors.sebiCertificateNumber}</p>
									)}
								</Form.Group>
								<Form.Group
									as={Col}
									md="6"
									sm="12"
									controlId="formGridEmail"
									className="mb-3"
								>
									<Form.Label className="text-bottom">
										Upload SEBI Certificate
									</Form.Label>
									<OverlayTrigger overlay={<Tooltip>Upload SEBI Certificate</Tooltip>}>
										<Question className="tooltip_icon" />
									</OverlayTrigger>
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
														{sebiCertificate.map((file, index) => {
															return (
																<div>
																	<input {...getInputProps()} />
																	<div {...getRootProps()} className="file file--upload">
																		<div className="after_upload_text">
																			<p>{file.name}</p>
																		</div>
																	</div>
																</div>
															);
														})}
													</section>
												) : (
													<section>
														<input {...getInputProps()} />
														<div {...getRootProps()} className="file file--upload">
															<label htmlFor="input-file">
																<img
																	src={"/assets/images/upload.png"}
																	alt="upload"
																	className="icon-login"
																/>
																Upload SEBI Certificate{" "}
															</label>
														</div>
													</section>
												)}
											</div>
										)}
									</Dropzone>
									{sebiCertificateError && (
										<p className="error-text">{sebiCertificateError}</p>
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
									<Form.Label className="text-bottom">CIN</Form.Label>
									<Form.Control
										type="text"
										name="cinNumber"
										placeholder="Enter CIN Number"
										className="field-size"
										onChange={handleChange}
										value={values.cinNumber}
									/>
									{!!touched.cinNumber && !!errors.cinNumber && (
										<p className="error-text">{errors.cinNumber}</p>
									)}
								</Form.Group>
								<Form.Group
									as={Col}
									md="6"
									sm="12"
									controlId="formGridEmail"
									className="mb-3"
								>
									<Form.Label className="text-bottom">Upload CIN </Form.Label>
									<OverlayTrigger overlay={<Tooltip>Upload CIN </Tooltip>}>
										<Question className="tooltip_icon" />
									</OverlayTrigger>
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
														{cinCertificate.map((file, index) => {
															return (
																<div>
																	<input {...getInputProps()} />
																	<div {...getRootProps()} className="file file--upload">
																		<div className="after_upload_text">
																			<p>{file.name}</p>
																		</div>
																	</div>
																</div>
															);
														})}
													</section>
												) : (
													<section>
														<input {...getInputProps()} />
														<div {...getRootProps()} className="file file--upload">
															<label htmlFor="input-file">
																<img
																	src={"/assets/images/upload.png"}
																	alt="upload"
																	className="icon-login"
																/>
																Upload CIN{" "}
															</label>
														</div>
													</section>
												)}
											</div>
										)}
									</Dropzone>
									{cinCertificateError && (
										<p className="error-text">{cinCertificateError}</p>
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
									<Form.Label className="text-bottom">PAN</Form.Label>
									<Form.Control
										type="text"
										name="panNumber"
										placeholder="Enter PAN Number"
										className="field-size"
										onChange={handleChange}
										value={values.panNumber}
									/>
									{!!touched.panNumber && !!errors.panNumber && (
										<p className="error-text">{errors.panNumber}</p>
									)}
								</Form.Group>
								<Form.Group
									as={Col}
									md="6"
									sm="12"
									controlId="formGridPassword"
									className="mb-3"
								>
									<Form.Label className="text-bottom">Upload PAN</Form.Label>
									<OverlayTrigger overlay={<Tooltip>Upload PAN</Tooltip>}>
										<Question className="tooltip_icon" />
									</OverlayTrigger>
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
														{pan.map((file, index) => {
															return (
																<div>
																	<input {...getInputProps()} />
																	<div {...getRootProps()} className="file file--upload">
																		<div className="after_upload_text">
																			<p>{file.name}</p>
																		</div>
																	</div>
																</div>
															);
														})}
													</section>
												) : (
													<section>
														<input {...getInputProps()} />
														<div {...getRootProps()} className="file file--upload">
															<label htmlFor="input-file">
																<img
																	src={"/assets/images/upload.png"}
																	alt="upload"
																	className="icon-login"
																/>
																Upload PAN{" "}
															</label>
														</div>
													</section>
												)}
											</div>
										)}
									</Dropzone>
									{panError && <p className="error-text">{panError}</p>}
								</Form.Group>
							</Row>
							<Button className="btn-position btn-filled w-custom" type="submit">
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
