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

const Dashboard = ({ loading }) => {
	return (
		<AppLayout page="Dashboard" loading={loading}>
			<div className="wrapper">
				<Tab.Container id="left-tabs-example" defaultActiveKey="first">
					<div className="sidebar">
						<ul className="nav_dashboard">
							<Nav variant="pills" className="flex-column">
								<Nav.Item>
									<Nav.Link eventKey="first">
										<li>
											<a className="active">
												<Dashboard1 className="icon-dashboard" alt="dashboard" />
												Dashboard
											</a>
										</li>
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="second">
										<li>
											<a>
												<User alt="user" className="icon-dashboard" /> Add User
											</a>
										</li>
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="Third">
										<li>
											<a>
												<Varification alt="Verification" className="icon-dashboard" /> UCC
												Verification
											</a>
										</li>
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="Fourth">
										<li>
											<a>
												<BorderStyle alt="trails" className="icon-dashboard" /> Trails
											</a>
										</li>
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="Fourth">
										<li>
											<a>
												<Logout alt="Logout" className="icon-dashboard" /> Logout
											</a>
										</li>
									</Nav.Link>
								</Nav.Item>
							</Nav>
						</ul>
					</div>

					<div className="content content-is-open">
						<span className="side-panel-toggle">
							<i className="fa fa-bars"></i>
						</span>
						<Tab.Content>
							<Tab.Pane eventKey="first">
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
							</Tab.Pane>

							{/* Add user  */}

							<Tab.Pane eventKey="second">
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
													<Row>
														<Form.Group as={Col} controlId="formGridEmail">
															<Form.Label className="text-bottom text-bold">
																Username
															</Form.Label>
															<Form.Control type="text" className="field-size" />
														</Form.Group>
														<Form.Group as={Col} controlId="formGridEmail">
															<Form.Label className="text-bottom text-bold">
																Email Address
															</Form.Label>
															<Form.Control type="email" className="field-size" />
														</Form.Group>
													</Row>
													<Row>
														<Form.Group as={Col} controlId="formGridEmail">
															<Form.Label className="text-bottom text-bold">
																Mobile No
															</Form.Label>
															<Form.Control type="text" className="field-size" />
														</Form.Group>
														<Form.Group as={Col} controlId="formGridEmail">
															<Form.Label className="text-bottom text-bold">Pan No</Form.Label>
															<Form.Control type="email" className="field-size" />
														</Form.Group>
													</Row>
													<Row>
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
													<Row>
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
							</Tab.Pane>
							{/* User Verification */}

							<Tab.Pane eventKey="Third">
								<h3>UCC Verificaiton</h3>
								<Row className="add_user">
									<Col sm={7}>
										<Row className="mb-5">
											<Form.Label column lg={3} className="text-bold">
												Verificaiton send via
											</Form.Label>
											<Col>
												<Form.Select defaultValue="Choose..." className="select-custom">
													<option>SMS and Email</option>
													<option>Option 2 </option>
													<option>Option 3 </option>
													<option>Option 4 </option>
													<option>Option 5 </option>
													<option>Option 6 </option>
												</Form.Select>
											</Col>
										</Row>
										<Row>
											<Form.Label column lg={3} className="text-bold">
												Send To
											</Form.Label>
											<Col>
												<Form.Group as={Col}>
													<div className="file file--upload send-btn">
														<label htmlFor="input-file">
															<PlusCircleFill alt="upload" className="upload-send" />
															Send to specific user
														</label>
														<input id="input-file" type="file" />
													</div>
													<p>OR</p>
													<div className="file file--upload send-btn">
														<label htmlFor="input-file">
															<CloudUploadFill alt="upload" className="upload-send" />
															Upload Verification file
														</label>
														<input id="input-file" type="file" />
													</div>
												</Form.Group>
											</Col>
										</Row>
										<Row className="mt-5">
											<Col sm={3}></Col>
											<Col>
												<Button className="btn-outlined">Cancel</Button>
												<Button className="btn-position btn-filled">Submit</Button>
											</Col>
										</Row>
									</Col>
								</Row>
							</Tab.Pane>

							{/* Trails */}
							<Tab.Pane eventKey="Fourth">
								<h3>Trails</h3>
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
													<th className="col-md-1">Date</th>
													<th className="col-md-1">Total PAN's</th>
													<th className="col-md-1">Total Email Id's</th>
													<th className="col-md-1">Total Mobile No.</th>
													<th className="col-md-1">SMS Sent</th>
													<th className="col-md-1">Email's Sent </th>
													<th className="col-md-1">Total Amount</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>01-01-2022</td>
													<td>100,000</td>
													<td>110,000</td>
													<td>125,000</td>
													<td>115,000</td>
													<td>120,000</td>
													<td>01-07-2022</td>
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
							</Tab.Pane>
						</Tab.Content>
					</div>
				</Tab.Container>
			</div>
		</AppLayout>
	);
};

export default Dashboard;
