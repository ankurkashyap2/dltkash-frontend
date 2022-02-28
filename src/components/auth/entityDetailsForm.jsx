import React from "react";
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
	const validationSchema = () => {
		return Yup.object().shape({
			legalEntityName: Yup.string().required("* Legal Entity Name is required"),
			sebiCertificateNumber: Yup.string()
				.required("* SEBI Certificate Number is required")
				.min(4, "* Invalid SEBI Certificate Number")
				.max(10, "* Invalid SEBI Certificate Number"),
			cinNumber: Yup.string()
				.required("* CIN Number is required")
				.min(4, "* Invalid CIN Number")
				.max(22, "* Invalid CIN Number"),
			panNumber: Yup.string()
				.required("* PAN Number is required")
				.min(4, "* Invalid PAN Number")
				.max(10, "* Invalid PAN Number"),
			logo: Yup.mixed().required("* Logo is required"),
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
			logo: null,
			sebiCertificate: null,
			cinCertificate: null,
			pan: null,
		};
		return initialValues;
	};

	// const handleDropReject = (type, rejected) => {
	// 	if (type === "sebi") {
	// 		setSebiCertificateError("* SEBI Certificate is required");
	// 	} else if (type === "cin") {
	// 		setCinCertificateError("* CIN Certificate is required");
	// 	} else if (type === "logo") {
	// 		setLogoError("* Logo is required");
	// 	} else {
	// 		setPanError("* PAN is required");
	// 	}
	// };

	const handleSubmit = (values) => {
		setEntityDetails(values);
		setActiveTab("personalDetails");
	};

	return (
		<>
			<Formik
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
					setFieldValue,
				}) => {
					console.log(values, errors);
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
												onDrop={(acceptedFiles) => {
													setFieldValue(
														"logo",
														acceptedFiles.map((file) =>
															Object.assign(file, {
																preview: URL.createObjectURL(file),
															})
														)
													);
												}}
												// onDropRejected={(rejected) => handleDropReject("logo", rejected)}
												multiple={false}
												accept=".png, .jpg, .jpeg"
											>
												{({ getRootProps, getInputProps }) => (
													<div>
														{values.logo && values.logo.length > 0 ? (
															<section>
																<div className="avatar-preview">
																	{values.logo.map((file, index) => {
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
									{!!touched.logo && !!errors.logo && (
										<p className="error-text">{errors.logo}</p>
									)}
								</Form.Group>
								<Form.Group
									as={Col}
									md="6"
									sm="12"
									className="mb-3"
									controlId="validationFormik01"
								>
									<Form.Label className="text-bottom">
										Legal Entity<span className="asterick">*</span>
									</Form.Label>
									<Form.Control
										type="text"
										name="legalEntityName"
										required
										placeholder="Enter Legal Entity"
										className="field-size"
										onChange={handleChange}
										value={values.legalEntityName}
										autoComplete="off"
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
									<Form.Label className="text-bottom">
										SEBI Certificate<span className="asterick">*</span>
									</Form.Label>
									<Form.Control
										type="text"
										name="sebiCertificateNumber"
										placeholder="Enter SEBI Certificate Number"
										className="field-size"
										onChange={handleChange}
										value={values.sebiCertificateNumber}
										autoComplete="off"
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
										Upload SEBI Certificate <span className="file-type">(.pdf)</span>
										<span className="asterick">*</span>
									</Form.Label>
									<OverlayTrigger overlay={<Tooltip>Upload SEBI Certificate</Tooltip>}>
										<Question className="tooltip_icon" />
									</OverlayTrigger>
									<Dropzone
										// maxSize={512000}
										onDrop={(acceptedFiles) =>
											setFieldValue(
												"sebiCertificate",
												acceptedFiles.map((file) =>
													Object.assign(file, {
														preview: URL.createObjectURL(file),
													})
												)
											)
										}
										// onDropRejected={(rejected) => handleDropReject("sebi", rejected)}
										multiple={false}
										accept=".pdf"
									>
										{({ getRootProps, getInputProps }) => (
											<div>
												{values.sebiCertificate && values.sebiCertificate.length > 0 ? (
													<section className="file file--upload">
														{values.sebiCertificate.map((file, index) => {
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
									{!!touched.sebiCertificate && !!errors.sebiCertificate && (
										<p className="error-text">{errors.sebiCertificate}</p>
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
									<Form.Label className="text-bottom">
										CIN<span className="asterick">*</span>
									</Form.Label>
									<Form.Control
										type="text"
										name="cinNumber"
										placeholder="Enter CIN Number"
										className="field-size"
										onChange={handleChange}
										value={values.cinNumber}
										autoComplete="off"
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
									<Form.Label className="text-bottom">
										Upload CIN <span className="file-type">(.pdf)</span>
										<span className="asterick">*</span>
									</Form.Label>
									<OverlayTrigger overlay={<Tooltip>Upload CIN </Tooltip>}>
										<Question className="tooltip_icon" />
									</OverlayTrigger>
									<Dropzone
										// maxSize={512000}
										onDrop={(acceptedFiles) =>
											setFieldValue(
												"cinCertificate",
												acceptedFiles.map((file) =>
													Object.assign(file, {
														preview: URL.createObjectURL(file),
													})
												)
											)
										}
										// onDropRejected={(rejected) => handleDropReject("cin", rejected)}
										multiple={false}
										accept=".pdf"
									>
										{({ getRootProps, getInputProps }) => (
											<div>
												{values.cinCertificate && values.cinCertificate.length > 0 ? (
													<section className="file file--upload">
														{values.cinCertificate.map((file, index) => {
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
									{!!touched.cinCertificate && !!errors.cinCertificate && (
										<p className="error-text">{errors.cinCertificate}</p>
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
									<Form.Label className="text-bottom">
										PAN<span className="asterick">*</span>
									</Form.Label>
									<Form.Control
										type="text"
										name="panNumber"
										placeholder="Enter PAN Number"
										className="field-size"
										onChange={handleChange}
										value={values.panNumber}
										autoComplete="off"
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
									<Form.Label className="text-bottom">
										Upload PAN <span className="file-type">(.pdf)</span>
										<span className="asterick">*</span>
									</Form.Label>
									<OverlayTrigger overlay={<Tooltip>Upload PAN</Tooltip>}>
										<Question className="tooltip_icon" />
									</OverlayTrigger>
									<Dropzone
										// maxSize={512000}
										onDrop={(acceptedFiles) =>
											setFieldValue(
												"pan",
												acceptedFiles.map((file) =>
													Object.assign(file, {
														preview: URL.createObjectURL(file),
													})
												)
											)
										}
										// onDropRejected={(rejected) => handleDropReject("pan", rejected)}
										multiple={false}
										accept=".pdf"
									>
										{({ getRootProps, getInputProps }) => (
											<div>
												{values.pan && values.pan.length > 0 ? (
													<section className="file file--upload">
														{values.pan.map((file, index) => {
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
									{!!touched.pan && !!errors.pan && (
										<p className="error-text">{errors.pan}</p>
									)}
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
