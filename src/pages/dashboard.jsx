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
import { ReactComponent as dashboard } from "../components/icons/dashboard.svg";
import { ReactComponent as User } from "../components/icons/User.svg";
import { ReactComponent as Notifications } from "../components/icons/Notifications.svg";
import { ReactComponent as Groupchat } from "../components/icons/Groupchat.svg";
import { ReactComponent as Logout } from "../components/icons/Logout.svg";
import { ReactComponent as down } from "../components/icons/down.svg";
import { ReactComponent as up } from "../components/icons/up.svg";
import { ReactComponent as download } from "../components/icons/download.svg";
import { ReactComponent as filter } from "../components/icons/filter.svg";
import "../styles/dashboard.css";

const Dashboard = () => {
	return (
		<>
			<Navbar />
			<div class="wrapper">
				<Tab.Container id="left-tabs-example" defaultActiveKey="first">
					<Row>
						<Col sm={3}>
							<div class="sidebar">
								<ul class="nav_dashboard">
									<Nav variant="pills" className="flex-column">
										<Nav.Item>
											<Nav.Link eventKey="first">
												<li>
													<a class="active">
														{" "}
														<img
															src={dashboard}
															alt="dashboard"
															className="icon-dashboard"
														/>{" "}
														Dashboard
													</a>
												</li>
											</Nav.Link>
										</Nav.Item>
										<Nav.Item>
											<Nav.Link eventKey="second">
												<li>
													<a>
														{" "}
														<img src={User} alt="user" className="icon-dashboard" /> Admin
														User
													</a>
												</li>
											</Nav.Link>
										</Nav.Item>
									</Nav>

									{/* <li>
                            <a><img src={Notifications} alt='user' className='icon-dashboard' /> Notification</a>
                        </li>
                        <li>
                            <a><img src={Groupchat} alt='user' className='icon-dashboard' /> Inbox</a>
                        </li>
                        <li>
                            <a><img src={Logout} alt='user' className='icon-dashboard' /> Logout</a>
                        </li> */}
								</ul>
							</div>
						</Col>
						<Col sm={9}>
							<div class="content content-is-open">
								<span class="side-panel-toggle">
									<i class="fa fa-bars"></i>
								</span>
								<Tab.Content>
									<Tab.Pane eventKey="first"></Tab.Pane>
									<Tab.Pane eventKey="second"></Tab.Pane>
								</Tab.Content>
							</div>
						</Col>
					</Row>
				</Tab.Container>
				<div class="content content-is-open">
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
									<img src={download} alt="download" className="icon-dashboard" /> Export
								</Button>
								<img
									src={filter}
									alt="filter"
									className="icon-dashboard btn-position mt-4"
								/>
							</Col>
						</Row>
					</div>
					<div class="table-responsive">
						<table
							class="table table-hover dashboard-table"
							cellspacing="0"
							width="100%"
						>
							<thead>
								<tr>
									<th class="col-md-1">S.No.</th>
									<th class="col-md-1">TM ID</th>
									<th class="col-md-1">PAN</th>
									<th class="col-md-1">Mobile No.</th>
									<th class="col-md-1">Email ID</th>
									<th class="col-md-1">
										Mobile Status <img src={up} className="up-arrow" />
										<img src={down} className="down-arrow" />
									</th>
									<th class="col-md-1">
										Email Status <img src={up} className="up-arrow" />
										<img src={down} className="down-arrow" />
									</th>
									<th class="col-md-1">
										PAN Status <img src={up} className="up-arrow" />
										<img src={down} className="down-arrow" />
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>1.</td>
									<td>155236</td>
									<td>ABC12345XZ</td>
									<td>+1 987654 3210</td>
									<td>username@xyz.com</td>
									<td className="verfied-pill">
										<span>Verified</span>
									</td>
									<td className="not-verfied-pill">
										<span>Not Verified</span>
									</td>
									<td className="verfied-pill">
										<span>Verified</span>
									</td>
								</tr>
								<tr>
									<td>2.</td>
									<td>155236</td>
									<td>ABC12345XZ</td>
									<td>+1 987654 3210</td>
									<td>username@xyz.com</td>
									<td className="not-verfied-pill">
										<span>Not Verified</span>
									</td>
									<td className="verfied-pill">
										<span>Verified</span>
									</td>
									<td className="verfied-pill">
										<span>Verified</span>
									</td>
								</tr>
								<tr>
									<td>3.</td>
									<td>155236</td>
									<td>ABC12345XZ</td>
									<td>+1 987654 3210</td>
									<td>username@xyz.com</td>
									<td className="verfied-pill">
										<span>Verified</span>
									</td>
									<td className="not-verfied-pill">
										<span>Not Verified</span>
									</td>
									<td className="verfied-pill">
										<span>Verified</span>
									</td>
								</tr>
								<tr>
									<td>4.</td>
									<td>155236</td>
									<td>ABC12345XZ</td>
									<td>+1 987654 3210</td>
									<td>username@xyz.com</td>
									<td className="not-verfied-pill">
										<span>Not Verified</span>
									</td>
									<td className="verfied-pill">
										<span>Verified</span>
									</td>
									<td className="not-verfied-pill">
										<span>Not Verified</span>
									</td>
								</tr>
								<tr>
									<td>5.</td>
									<td>155236</td>
									<td>ABC12345XZ</td>
									<td>+1 987654 3210</td>
									<td>username@xyz.com</td>
									<td className="verfied-pill">
										<span>Verified</span>
									</td>
									<td className="not-verfied-pill">
										<span>Not Verified</span>
									</td>
									<td className="not-verfied-pill">
										<span>Not Verified</span>
									</td>
								</tr>
								<tr>
									<td>6.</td>
									<td>155236</td>
									<td>ABC12345XZ</td>
									<td>+1 987654 3210</td>
									<td>username@xyz.com</td>
									<td className="not-verfied-pill">
										<span>Not Verified</span>
									</td>
									<td className="verfied-pill">
										<span>Verified</span>
									</td>
									<td className="verfied-pill">
										<span>Verified</span>
									</td>
								</tr>
							</tbody>
						</table>
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
				</div>
			</div>
		</>
	);
};

export default Dashboard;
