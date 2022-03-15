import React, { useEffect, useState, useMemo } from "react";
import { Form, FormControl, Button, Row, Col, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import { ReactComponent as Download } from "../components/icons/download.svg";
import { ReactComponent as Search } from "../components/icons/search.svg";
import { ReactComponent as Refresh } from "../components/icons/Refresh.svg";
import AppLayout from "../layouts/appLayout";
import "../styles/dashboard.css";
import Sidebar from "../components/navbar/sidebar";
import { getAllInvestors } from "../redux/investor/actions";

const Dashboard = ({ loading, getAllInvestors, token, investors }) => {
	const [search, setSearch] = useState("");
	const [searchKey, setSearchKey] = useState("");
	const [pageLimit] = useState(500);
	const [localPageLimit, setLocalPageLimit] = useState(10);
	const [pageNumber, setPageNumber] = useState(1);
	const [localPageNumber, setLocalPageNumber] = useState(1);
	const [investorsList, setInvestorsList] = useState([]);

	useEffect(() => {
		if (token) {
			getAllInvestors({ page: pageNumber, limit: pageLimit }, token);
			setSearch("");
			setSearchKey("");
		}
	}, [getAllInvestors, token, pageLimit, pageNumber]);

	useEffect(() => {
		if (investors && investors.records > 0) {
			const startIndex = (localPageNumber - 1) * localPageLimit;
			const endIndex = localPageNumber * localPageLimit;
			setInvestorsList(investors.results.slice(startIndex, endIndex));
		} else {
			setInvestorsList([]);
		}
	}, [investors, localPageLimit, localPageNumber]);

	const subHeaderComponentMemo = useMemo(() => {
		const headers = [
			{ label: "Investor Code", key: "uccInvestorCode" },
			{ label: "TM ID", key: "uccTmId" },
			{ label: "TM Name", key: "uccTmName" },
			{ label: "Country", key: "uccCountry" },
			{ label: "PAN Exempt", key: "uccPanExempt" },
			{ label: "PAN", key: "uccPanNo" },
			{ label: "DP ID", key: "uccDpId" },
			{ label: "Client ID", key: "uccClientId" },
			{ label: "Email ID", key: "uccEmailId" },
			{ label: "Email Status", key: "uccEmailStatus" },
			{ label: "Mobile No.", key: "uccMobileNo" },
			{ label: "Mobile Status", key: "uccMobileStatus" },
			{ label: "PAN Status", key: "uccPanStatus" },
		];

		const csvReport = {
			data: investorsList,
			headers: headers,
			filename: "Investors_Report.csv",
		};

		const handleSearch = () => {
			getAllInvestors(
				{ page: 1, limit: pageLimit, [searchKey]: search },
				token,
				"search"
			);
		};

		return (
			<div className="filter-section">
				<Row style={{ alignItems: "center", justifyContent: "space-between" }}>
					<Col sm={6} className="d-flex">
						<Form.Select
							className="search-select"
							name="uccRequestType"
							// value={searchKey}
							onChange={(e) => {
								if (e.target.value === "all") {
									getAllInvestors({ page: 1, limit: pageLimit }, token, "search");
								}
								setSearchKey(e.target.value);
								setSearch("");
							}}
						>
							<option key="blankChoice" hidden value className="select-placeholder">
								Select Search Key
							</option>
							<option key="all" value="all">
								All
							</option>
							<option key="TmName" value="TmName">
								TM Name
							</option>
							<option key="mobileNumber" value="mobileNumber">
								Mobile Number
							</option>
							<option key="panNumber" value="panNumber">
								PAN Number
							</option>
							{/* <option key="notificationKey" value="notificationKey">
								Notification Key
							</option> */}
						</Form.Select>
						<FormControl
							type="search"
							placeholder="Search"
							className="investor-search"
							aria-label="Search"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							disabled={!searchKey}
						/>
						<Button
							className="btn-filled custom-refresh icon-dashboard"
							style={{ marginTop: "0px", marginLeft: "5px" }}
							onClick={handleSearch}
							disabled={!searchKey || !search}
						>
							<Search alt="search-icon" className="search-size" />
						</Button>
					</Col>
					{/* <Col sm={3}>
						
					</Col> */}
					{/* <Col sm={2}>
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
					</Col> */}

					<Col sm={6} className="action-btns">
						<Button
							className="btn-filled custom-refresh icon-dashboard"
							style={{ marginTop: "0px" }}
							onClick={() => {
								setSearch("");
								setSearchKey("");
								getAllInvestors({ page: 1, limit: pageLimit }, token, "search");
							}}
						>
							<Refresh alt="refresh" className="btn-size" />
						</Button>
						<CSVLink
							className="btn-filled"
							style={{ marginTop: "0px", textDecoration: "none" }}
							{...csvReport}
						>
							<Download alt="Export" className="icon-dashboard" /> Export
						</CSVLink>
						{/* <csvlink {...csvreport}>Export to CSV</csvlink> */}
					</Col>
				</Row>
			</div>
		);
	}, [search, searchKey, getAllInvestors, pageLimit, token, investorsList]);

	const handlePageChange = (page, totalRows) => {
		setLocalPageNumber(page);
		let tempLimit = page * localPageLimit;
		if (tempLimit > totalRows) {
			tempLimit = totalRows;
		}
		if (tempLimit <= (investors && investors.results.length)) {
			const startIndex = (page - 1) * localPageLimit;
			const endIndex = page * localPageLimit;
			setInvestorsList(investors.results.slice(startIndex, endIndex));
		} else {
			if (page - localPageNumber > 1) {
				getAllInvestors({ page: 1, limit: totalRows }, token, "search");
			} else {
				setPageNumber(pageNumber + 1);
			}
		}
	};

	const handlePerRowsChange = (newPerPage) => {
		setLocalPageLimit(newPerPage);
	};

	const columns = [
		// {
		// 	name: "S. No.",
		// 	selector: (row) =>
		// 		investors &&
		// 		investors.results.length &&
		// 		investors.results.map((item, i) => row.seqId === item.seqId && i + 1),

		// 	sortable: true,
		// },
		{
			name: "Investor Code",
			selector: (row) => row.uccInvestorCode,
			sortable: true,
			minWidth: "140px",
			style: {
				minWidth: "140px",
			},
		},
		{
			name: "TM ID",
			selector: (row) => row.uccTmId,
			sortable: true,
			// minWidth: 40,
		},
		{
			name: "TM Name",
			selector: (row) => row.uccTmName,
			sortable: true,
			minWidth: "140px",
			style: {
				minWidth: "140px",
			},
		},
		{
			name: "Country",
			selector: (row) => row.uccCountry,
			sortable: true,
			// minWidth: 40,
		},
		{
			name: "PAN Exempt",
			selector: (row) => row.uccPanExempt,
			sortable: true,
			minWidth: "140px",
			style: {
				minWidth: "140px",
			},
		},
		{
			name: "PAN",
			selector: (row) => (row.uccPanNo ? row.uccPanNo : "-"),
			sortable: true,
			minWidth: "120px",
			style: {
				minWidth: "120px",
			},
		},
		{
			name: "DP ID",
			selector: (row) => (row.uccDpId ? row.uccDpId : "-"),
			sortable: true,
			// minWidth: 40,
		},
		{
			name: "Client Id",
			selector: (row) => (row.uccClientId ? row.uccClientId : "-"),
			sortable: true,
			// minWidth: 40,
		},
		{
			name: "Email ID",
			selector: (row) => row.uccEmailId,
			sortable: true,
			minWidth: "200px",
			style: {
				minWidth: "200px",
			},
		},

		{
			name: "Mobile No.",
			selector: (row) => row.uccMobileNo,
			sortable: true,
			minWidth: "140px",
			style: {
				minWidth: "140px",
			},
		},
		{
			name: "Email Status",
			selector: (row) => row.uccEmailStatus,
			sortable: true,
			minWidth: "140px",
			style: {
				minWidth: "140px",
			},
			conditionalCellStyles: [
				{
					when: (row) => row.uccEmailStatus === "VERIFIED",
					classNames: ["verfied-pill"],
				},
				{
					when: (row) =>
						row.uccEmailStatus === "SENT" || row.uccEmailStatus === "REJECTED",
					classNames: ["sent-pill"],
				},
				{
					when: (row) => row.uccEmailStatus === "NOT VERIFIED",
					classNames: ["not-verfied-pill"],
				},
			],
		},
		{
			name: "Mobile Status",
			selector: (row) => row.uccMobileStatus,
			sortable: true,
			minWidth: "140px",
			style: {
				minWidth: "140px",
			},
			conditionalCellStyles: [
				{
					when: (row) => row.uccMobileStatus === "VERIFIED",
					classNames: ["verfied-pill"],
				},
				{
					when: (row) =>
						row.uccMobileStatus === "SENT" || row.uccMobileStatus === "REJECTED",
					classNames: ["sent-pill"],
				},
				{
					when: (row) => row.uccMobileStatus === "NOT VERIFIED",
					classNames: ["not-verfied-pill"],
				},
			],
		},
		{
			name: "PAN Status",
			selector: (row) => row.uccPanStatus,
			sortable: true,
			minWidth: "140px",
			style: {
				minWidth: "140px",
			},
			conditionalCellStyles: [
				{
					when: (row) => row.uccPanStatus === "VERIFIED",
					classNames: ["verfied-pill"],
				},
				{
					when: (row) =>
						row.uccPanStatus === "SENT" || row.uccPanStatus === "REJECTED",
					classNames: ["sent-pill"],
				},
				{
					when: (row) => row.uccPanStatus === "NOT VERIFIED",
					classNames: ["not-verfied-pill"],
				},
			],
		},
	];

	const customStyles = {
		rows: {
			style: {
				// minHeight: "72px", // override the row height
			},
		},
		headCells: {
			style: {
				paddingLeft: "12px", // override the cell padding for head cells
				paddingRight: "12px",
				fontSize: "15px",
				fontWeight: 700,
				backgroundColor: "#dee0e1",
			},
		},
		cells: {
			style: {
				// paddingLeft: "20px", // override the cell padding for data cells
				paddingRight: "20px",
			},
		},
	};

	return (
		<AppLayout page="Dashboard">
			<Sidebar />

			<div className="content content-is-open">
				{/* <span className="side-panel-toggle">
					<i className="fa fa-bars"></i>
				</span> */}
				{/* <Tab.Content>
							<Tab.Pane eventKey="first"> */}
				{/* <h3>Dashboard</h3> */}
				{/* <div className="filter-section">
					<Row>
						<Col sm={3}>
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
						</Col>
						<Col>
							<Button
								className="btn-position btn-filled custom-refresh"
								onClick={() => {
									setPageNumber(1);
									getInvestorsList();
									getAllInvestors({ page: 1, limit: pageLimit }, token);
								}}
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
									<th className="col-md-1">Action</th>
								</tr>
							</thead>
							<tbody>
								{investorsList && investorsList.length > 0 ? (
									investorsList.map((item, index) => {
										return (
											<tr>
												<td>{index + 1}</td>
												<td>{item.uccTmId}</td>
												<td>{item.uccPanNo}</td>
												<td>{item.uccEmailId}</td>
												<td>{item.uccMobileNo}</td>
												<td
													className={
														item.uccPanStatus === "VERIFIED"
															? "verfied-pill"
															: item.uccPanStatus === "SENT"
															? "sent-pill"
															: "not-verfied-pill"
													}
												>
													<span>{item.uccPanStatus}</span>
												</td>
												<td
													className={
														item.uccEmailStatus === "VERIFIED"
															? "verfied-pill"
															: item.uccEmailStatus === "SENT"
															? "sent-pill"
															: "not-verfied-pill"
													}
												>
													<span>{item.uccEmailStatus}</span>
												</td>
												<td
													className={
														item.uccMobileStatus === "VERIFIED"
															? "verfied-pill"
															: item.uccMobileStatus === "SENT"
															? "sent-pill"
															: "not-verfied-pill"
													}
												>
													<span>{item.uccMobileStatus}</span>
												</td>
												<td>
													<UserEdit alt="edit" />
												</td>
											</tr>
										);
									})
								) : (
									<tr>No data!</tr>
								)}
							</tbody>
						</table>
					</div>
				</div> */}
				{/* <Row className="pt-3">
					<Col sm={8}>
						<p className="left">
							{investors
								? `Showing ${localStartIndex + 1} to 
							${
								investors
									? localEndIndex > investors.records
										? investors.records
										: localEndIndex
									: localEndIndex
							}
							of ${investors && investors.records} results`
								: "No Results Found"}
						</p>
					</Col>
					<Col sm={4}>
					
						<Pagination
							page={pageNumber}
							totalPage={
								investors ? Math.round(investors.records / localPageLimit) : 0
							}
							handleChange={handlePageChange}
						/>
					</Col>
				</Row> */}
				{/* </Tab.Pane> */}
				<DataTable
					columns={columns}
					data={investorsList ? investorsList : []}
					// pagination
					fixedHeader
					subHeader
					subHeaderComponent={subHeaderComponentMemo}
					pointerOnHover
					highlightOnHover
					customStyles={customStyles}
					pagination
					paginationServer
					paginationTotalRows={investors && investors.records}
					onChangeRowsPerPage={handlePerRowsChange}
					onChangePage={handlePageChange}
					progressPending={loading}
					progressComponent={<Spinner animation="border" variant="info" />}
				/>
			</div>
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
