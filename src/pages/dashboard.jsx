import React, { useEffect, useState } from "react";
import {
	Form,
	FormControl,
	Button,
	Row,
	Col,
	Pagination,
} from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ReactComponent as Down } from "../components/icons/down.svg";
import { ReactComponent as UserEdit } from "../components/icons/UserEdit.svg";
import { ReactComponent as Up } from "../components/icons/up.svg";
import { ReactComponent as Download } from "../components/icons/download.svg";
import { ReactComponent as Filter } from "../components/icons/filter.svg";
import { ReactComponent as Refresh } from "../components/icons/Refresh.svg";
import AppLayout from "../layouts/appLayout";
import "../styles/dashboard.css";
import Sidebar from "../components/navbar/sidebar";
import { getAllInvestors } from "../redux/investor/actions";

const Dashboard = ({ loading, getAllInvestors, token, investors }) => {
	const [search, setSearch] = useState("");

	useEffect(() => {
		if (token) getAllInvestors({ page: 1, limit: 1 }, token);
	}, [getAllInvestors, token]);

	const handleSearch = (text) => {
		setSearch(text);
		getAllInvestors({ panNumber: text }, token);
	};
	return (
		<AppLayout page="Dashboard" loading={loading}>
			<Sidebar />

			{/* <div className="content content-is-open"> */}
			{/* <span className="side-panel-toggle">
					<i className="fa fa-bars"></i>
				</span> */}
			{/* <Tab.Content>
							<Tab.Pane eventKey="first"> */}
			{/* <h3>Dashboard</h3> */}
			<div className="filter-section">
				<Row>
					{/* <Col sm={3}>
							<Form.Group as={Col} controlId="formGridEmail">
								<Form.Label className="text-bottom"></Form.Label>
								<FormControl
									type="search"
									placeholder="Search"
									className="me-2 field-size"
									aria-label="Search"
									value={search}
									onChange={(e) => handleSearch(e.target.value)}
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
						</Col> */}
					<Col>
						<Button
							className="btn-position btn-filled custom-refresh"
							onClick={() => getAllInvestors({}, token)}
						>
							<Refresh alt="refresh" className="btn-size" /> Refresh
						</Button>
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
								{/* <th className="col-md-1">Action</th> */}
							</tr>
						</thead>
						<tbody>
							{investors && investors.results.length > 0 ? (
								investors.results.map((item, index) => {
									return (
										<tr>
											<td>{index + 1}</td>
											<td>{item.uccTmId}</td>
											<td>{item.uccPanNo}</td>
											<td className="field-text">{item.uccEmailId}</td>
											<td>{item.uccMobileNo}</td>
											<td className="verfied-pill">
												<span>{item.uccPanStatus}</span>
											</td>
											<td className="not-verfied-pill">
												<span>{item.uccEmailStatus}</span>
											</td>
											<td className="verfied-pill">
												<span>{item.uccMobileStatus}</span>
											</td>
											{/* <td>
													<UserEdit alt="edit" />
												</td> */}
										</tr>
									);
								})
							) : (
								<tr>No data!</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
			<Row className="pt-3">
				<Col sm={8}>
					<p className="left">
						Showing 1 to 10 of {investors && investors.results.length} results
					</p>
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
			{/* </div> */}
		</AppLayout>
	);
};

const mapStateToProps = (state) => {
	return {
		error: state.investor.error,
		loading: state.investor.loading,
		investors: state.investor.investors,
		token: state.user.token,
	};
};

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ getAllInvestors }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
