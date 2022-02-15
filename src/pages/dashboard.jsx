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

const Dashboard = ({ loading }) => {
	return (
		<AppLayout page="Dashboard" loading={loading}>
			<Sidebar />

			<div className="content content-is-open">
				<span className="side-panel-toggle">
					<i className="fa fa-bars"></i>
				</span>
				{/* <Tab.Content>
							<Tab.Pane eventKey="first"> */}
				<h3>Dashboard</h3>
				<div className="filter-section">
					<Row>
						<Col sm={3}>
							<Form.Group as={Col} controlId="formGridEmail">
								<Form.Label className="text-bottom"></Form.Label>
								<FormControl
									type="search"
									placeholder="Search"
									className="me-2 field-size"
									aria-label="Search"
								/>
							</Form.Group>
						</Col>
						<Col sm={2}>
							<Form.Group controlId="formGridEmail">
								<Form action="/action_page.php"></Form>
								<Form.Label className="text-bottom">From: </Form.Label>
								<Form.Control
									type="date"
									name="datefrom"
									placeholder="From"
									className="field-size"
								/>
							</Form.Group>
						</Col>
						<Col sm={2}>
							<Form.Group controlId="formGridEmail">
								<Form action="/action_page.php"></Form>
								<Form.Label className="text-bottom">To: </Form.Label>
								<Form.Control
									type="date"
									name="datefrom"
									placeholder="From"
									className="field-size"
								/>
							</Form.Group>
						</Col>
						<Col sm={5}>
							<Button className="btn-position btn-filled">
								<Download alt="Export" className="icon-dashboard" /> Export
							</Button>
							<Filter alt="filter" className="icon-dashboard btn-position mt-4" />
						</Col>
					</Row>
					<div className="table-responsive">
						<table
							className="table table-hover dashboard-table"
							cellspacing="0"
							width="100%"
						>
							<thead>
								<tr>
									<th className="col-md-1">S.No.</th>
									<th className="col-md-1">TM ID</th>
									<th className="col-md-1">PAN</th>
									<th className="col-md-1">Email ID</th>
									<th className="col-md-1">Mobile No.</th>
									<th className="col-md-1">
										PAN Status <Up alt="down" className="up-arrow" />
										<Down alt="down" className="down-arrow" />
									</th>
									<th className="col-md-1">
										Email Status <Up alt="down" className="up-arrow" />
										<Down alt="down" className="down-arrow" />
									</th>
									<th className="col-md-1">
										Mobile Status <Up alt="down" className="up-arrow" />
										<Down alt="down" className="down-arrow" />
									</th>
									<th className="col-md-1">Action</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>1.</td>
									<td>155236</td>
									<td>ABC12345XZ</td>
									<td>username@xyz.com</td>
									<td>+1 987654 3210</td>
									<td className="verfied-pill">
										<span>Verified</span>
									</td>
									<td className="not-verfied-pill">
										<span>Not Verified</span>
									</td>
									<td className="verfied-pill">
										<span>Verified</span>
									</td>
									<td>
										<UserEdit alt="edit" />
									</td>
								</tr>
								<tr>
									<td>1.</td>
									<td>155236</td>
									<td>ABC12345XZ</td>
									<td>username@xyz.com</td>
									<td>+1 987654 3210</td>
									<td className="verfied-pill">
										<span>Verified</span>
									</td>
									<td className="not-verfied-pill">
										<span>Not Verified</span>
									</td>
									<td className="verfied-pill">
										<span>Verified</span>
									</td>
									<td>
										<UserEdit alt="edit" />
									</td>
								</tr>
								<tr>
									<td>1.</td>
									<td>155236</td>
									<td>ABC12345XZ</td>
									<td>username@xyz.com</td>
									<td>+1 987654 3210</td>
									<td className="verfied-pill">
										<span>Verified</span>
									</td>
									<td className="not-verfied-pill">
										<span>Not Verified</span>
									</td>
									<td className="verfied-pill">
										<span>Verified</span>
									</td>
									<td>
										<UserEdit alt="edit" />
									</td>
								</tr>
								<tr>
									<td>1.</td>
									<td>155236</td>
									<td>ABC12345XZ</td>
									<td>username@xyz.com</td>
									<td>+1 987654 3210</td>
									<td className="verfied-pill">
										<span>Verified</span>
									</td>
									<td className="not-verfied-pill">
										<span>Not Verified</span>
									</td>
									<td className="verfied-pill">
										<span>Verified</span>
									</td>
									<td>
										<UserEdit alt="edit" />
									</td>
								</tr>
								<tr>
									<td>1.</td>
									<td>155236</td>
									<td>ABC12345XZ</td>
									<td>username@xyz.com</td>
									<td>+1 987654 3210</td>
									<td className="verfied-pill">
										<span>Verified</span>
									</td>
									<td className="not-verfied-pill">
										<span>Not Verified</span>
									</td>
									<td className="verfied-pill">
										<span>Verified</span>
									</td>
									<td>
										<UserEdit alt="edit" />
									</td>
								</tr>
								<tr>
									<td>1.</td>
									<td>155236</td>
									<td>ABC12345XZ</td>
									<td>username@xyz.com</td>
									<td>+1 987654 3210</td>
									<td className="verfied-pill">
										<span>Verified</span>
									</td>
									<td className="not-verfied-pill">
										<span>Not Verified</span>
									</td>
									<td className="verfied-pill">
										<span>Verified</span>
									</td>
									<td>
										<UserEdit alt="edit" />
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<Row className="pt-3">
					<Col sm={8}>
						<p className="left">Showing 1 to 10 of 98 results</p>
					</Col>
					<Col sm={4}>
						<Pagination>
							<Pagination.Prev />
							<Pagination.Item active>{1}</Pagination.Item>
							<Pagination.Item>{2}</Pagination.Item>
							<Pagination.Item>{3}</Pagination.Item>
							<Pagination.Ellipsis />
							<Pagination.Item>{8}</Pagination.Item>
							<Pagination.Item>{9}</Pagination.Item>
							<Pagination.Item>{10}</Pagination.Item>
							<Pagination.Next />
						</Pagination>
					</Col>
				</Row>
				{/* </Tab.Pane> */}
			</div>
		</AppLayout>
	);
};

export default Dashboard;
