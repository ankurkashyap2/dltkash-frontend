import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Form, Button, Row, Col, Tabs, Tab, Alert } from "react-bootstrap";
import AppLayout from "../layouts/appLayout";
import "../styles/dashboard.css";
import Sidebar from "../components/navbar/sidebar";
import { ReactComponent as EyeIcon } from "../components/icons/eye.svg";
import { ReactComponent as EyeHiddenIcon } from "../components/icons/eye-hidden.svg";

const AddUser = ({ loading, error }) => {
	const [showPassword, setShowPassword] = useState(false);

	const validationSchema = () => {
		return Yup.object().shape({
			userName: Yup.string().required("*User Name is required"),
			phoneNo: Yup.string()
				.required("* Mobile Number is required")
				.matches(
					/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
					"* Invalid Mobile Number"
				),
			email: Yup.string()
				.required("* Email is required")
				.email("* Please enter valid format"),
			password: Yup.string()
				.required("* Password is required")
				.min(
					8,
					"* Minimum of 8 characters with a capital letter, a number, and a symbol."
				)
				.matches(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/,
					"* Minimum of 8 characters with a capital letter, a number, and a symbol."
				),
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
			email: "",
			phoneNo: "",
			password: "",
			isFirstExchangeAdmin: false,
			userName: "",
		};
		return initialValues;
	};

	const handleSubmit = (values) => {};

	const renderForm = (errors, handleChange, handleSubmit, values, touched) => {
		return (
			<Form className="form-align" noValidate onSubmit={handleSubmit}>
				<Row className="mb-3">
					<Form.Group as={Col} controlId="formGridEmail">
						<Form.Label className="text-bottom text-bold">Username</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter User Name"
							className="field-size"
							name="userName"
							required
							onChange={handleChange}
							value={values.userName}
						/>
						{!!touched.userName && !!errors.userName && (
							<p className="error-text">{errors.userName}</p>
						)}
					</Form.Group>
					<Form.Group as={Col} controlId="formGridEmail">
						<Form.Label className="text-bottom text-bold">Email Address</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Email Address"
							className="field-size"
							name="email"
							required
							onChange={handleChange}
							value={values.email}
						/>
						{!!touched.email && !!errors.email && (
							<p className="error-text">{errors.email}</p>
						)}
					</Form.Group>
				</Row>
				<Row className="mb-3">
					<Form.Group as={Col} controlId="formGridEmail">
						<Form.Label className="text-bottom text-bold">Mobile No</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Mobile Number"
							className="field-size"
							name="phoneNo"
							required
							onChange={handleChange}
							value={values.phoneNo}
						/>
						{!!touched.phoneNo && !!errors.phoneNo && (
							<p className="error-text">{errors.phoneNo}</p>
						)}
					</Form.Group>
					<Form.Group as={Col} controlId="formGridEmail">
						<Form.Label className="text-bottom text-bold">Password</Form.Label>
						<Form.Control
							type={showPassword ? "text" : "password"}
							placeholder="Enter Password"
							className="field-size"
							name="password"
							required
							onChange={handleChange}
							value={values.password}
						/>
						{showPassword ? (
							<EyeIcon className="eye-icon" onClick={() => setShowPassword(false)} />
						) : (
							<EyeHiddenIcon
								className="eye-icon"
								onClick={() => setShowPassword(true)}
							/>
						)}
						{!!touched.password && !!errors.password && (
							<p className="error-text">{errors.password}</p>
						)}
					</Form.Group>
				</Row>
				{/* <Row className="mb-3">
										<Form.Group as={Col} controlId="formGridEmail">
											<Form.Label className="text-bottom text-bold">
												Legel Entity
											</Form.Label>
											<Form.Control type="text" className="field-size" />
										</Form.Group>
										<Form.Group as={Col} controlId="formGridEmail">
											<Form.Label className="text-bottom text-bold">CIN No</Form.Label>
											<Form.Control type="email" className="field-size" />
										</Form.Group>
									</Row> */}
				<Row className="mb-3">
					<Form.Group as={Col} controlId="formGridEmail"></Form.Group>
					<Form.Group as={Col} controlId="formGridEmail">
						<Button type="submit" className="btn-filled w-100">
							Submit
						</Button>
					</Form.Group>
				</Row>
			</Form>
		);
	};

	return (
		<AppLayout page="Add User" loading={loading}>
			<Sidebar />

			<div className="content content-is-open">
				<span className="side-panel-toggle">
					<i className="fa fa-bars"></i>
				</span>
				{/* <h3>Add User</h3> */}
				<Row className="add_user">
					<Col sm={8}>
						<Tabs
							defaultActiveKey="home"
							transition={false}
							id="noanim-tab-example"
							className="mb-3 add-user-tab"
						>
							<Tab eventKey="home" title="Add Admin">
								{error && <Alert variant="danger">{error}!</Alert>}
								<Formik
									initialValues={getInitialValues()}
									validate={validate(validationSchema)}
									onSubmit={handleSubmit}
									enableReinitialize={true}
									render={({ errors, handleChange, handleSubmit, values, touched }) => {
										return renderForm(
											errors,
											handleChange,
											handleSubmit,
											values,
											touched
										);
									}}
								/>
							</Tab>
							<Tab eventKey="profile" title="Add Operation Manager">
								hello
							</Tab>
						</Tabs>
					</Col>
				</Row>
			</div>
		</AppLayout>
	);
};

const mapStateToProps = (state) => {
	return {
		error: state.user.error,
		loading: state.user.loading,
	};
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);

// * in label
