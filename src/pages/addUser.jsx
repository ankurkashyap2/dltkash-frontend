import React from "react";
import Navbar from "../components/navbar";
import {
	Form,
	FormControl,
	Button,
	Row,
	Col,
	InputGroup,
	Pagination,
	Tabs,
	Tab,
	Nav,
} from "react-bootstrap";
import { ReactComponent as Dashboard1 } from "../components/icons/Dashboard1.svg";
import { ReactComponent as User } from "../components/icons/User.svg";
import { ReactComponent as Varification } from "../components/icons/Varification.svg";
import { ReactComponent as Logout } from "../components/icons/Logout.svg";
import { ReactComponent as Down } from "../components/icons/down.svg";
import { ReactComponent as UserEdit } from "../components/icons/UserEdit.svg";
import { ReactComponent as Up } from "../components/icons/up.svg";
import { ReactComponent as Download } from "../components/icons/download.svg";
import { ReactComponent as Filter } from "../components/icons/filter.svg";
import { ReactComponent as PlusCircleFill } from "../components/icons/PlusCircleFill.svg";
import { ReactComponent as CloudUploadFill } from "../components/icons/CloudUploadFill.svg";
import { ReactComponent as BorderStyle } from "../components/icons/BorderStyle.svg";
import AppLayout from "../layouts/appLayout";
import "../styles/dashboard.css";
import Sidebar from "../components/navbar/sidebar";

const AddUser = ({ loading }) => {
	return (
		<AppLayout page="Add User" loading={loading}>
			<Sidebar />

			<div className="content content-is-open">
				<span className="side-panel-toggle">
					<i className="fa fa-bars"></i>
				</span>
				<h3>Add User</h3>
				<Row className="add_user">
					<Col sm={8}>
						<Tabs
							defaultActiveKey="home"
							transition={false}
							id="noanim-tab-example"
							className="mb-3 add-user-tab"
						>
							<Tab eventKey="home" title="Add Admin">
								<Form>
									<Row className="mb-3">
										<Form.Group as={Col} controlId="formGridEmail">
											<Form.Label className="text-bottom text-bold">Username</Form.Label>
											<Form.Control type="text" className="field-size" />
										</Form.Group>
										<Form.Group as={Col} controlId="formGridEmail">
											<Form.Label className="text-bottom text-bold">
												Email Address
											</Form.Label>
											<Form.Control type="email" className="field-size" />
										</Form.Group>
									</Row>
									<Row className="mb-3">
										<Form.Group as={Col} controlId="formGridEmail">
											<Form.Label className="text-bottom text-bold">Mobile No</Form.Label>
											<Form.Control type="text" className="field-size" />
										</Form.Group>
										<Form.Group as={Col} controlId="formGridEmail">
											<Form.Label className="text-bottom text-bold">Pan No</Form.Label>
											<Form.Control type="email" className="field-size" />
										</Form.Group>
									</Row>
									<Row className="mb-3">
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
									</Row>
									<Row className="mb-3">
										<Form.Group as={Col} controlId="formGridEmail"></Form.Group>
										<Form.Group as={Col} controlId="formGridEmail">
											<Button type="submit" className="btn-filled w-100">
												Submit
											</Button>
										</Form.Group>
									</Row>
								</Form>
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

export default AddUser;
