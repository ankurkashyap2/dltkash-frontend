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
import {
	getAllInvestors,
	setPreviousBookmark,
} from "../redux/investor/actions";

const Dashboard = ({
	loading,
	getAllInvestors,
	token,
	investors,
	previousBookmark,
	newBookmark,
	setPreviousBookmark,
}) => {
	const [search, setSearch] = useState("");
	const [searchKey, setSearchKey] = useState("all");
	const [pageLimit] = useState(10);
	const [investorsList, setInvestorsList] = useState([]);

	useEffect(() => {
		if (token) {
			getAllInvestors({ pageSize: pageLimit, bookmark: "" }, token, "", false);
			setSearch("");
			setSearchKey("");
		}
	}, [getAllInvestors, token, pageLimit]);

	useEffect(() => {
		if (investors && investors.length > 0) {
			const list = [];
			investors.map((item) =>
				item.bookmark === newBookmark
					? item.results.map((item1) => list.push(item1.Record))
					: null
			);
			setInvestorsList(list);
		} else {
			setInvestorsList([]);
		}
	}, [investors, newBookmark]);

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
				{ pageSize: pageLimit, bookmark: "", [searchKey]: search },
				token,
				"search",
				false
			);
		};

		return (
			<div className="filter-section">
				<Row style={{ alignItems: "center", justifyContent: "space-between" }}>
					<Col sm={6} className="d-flex">
						<Form.Select
							className="search-select"
							name="uccRequestType"
							onChange={(e) => {
								if (e.target.value === "all" && search) {
									getAllInvestors(
										{ pageSize: pageLimit, bookmark: "" },
										token,
										"search",
										false
									);
								}
								setSearchKey(e.target.value);
								setSearch("");
							}}
							value={searchKey}
						>
							{/* <option key="blankChoice" hidden value className="select-placeholder">
								Select Search Key
							</option> */}
							<option key="all" value="all">
								All
							</option>
							<option key="uccTmName" value="uccTmName">
								TM Name
							</option>

							<option key="uccPanNo" value="uccPanNo">
								PAN Number
							</option>
							<option key="uccMobileNo" value="uccMobileNo">
								Mobile Number
							</option>
							<option key="uccEmailId" value="uccEmailId">
								Email Id
							</option>
							{/* <option key="exchangeId" value="exchangeId">
								Exchange Id
							</option>
							<option key="fileName" value="fileName">
								File Name
							</option> */}
						</Form.Select>
						<FormControl
							type="search"
							placeholder="Search"
							className="investor-search"
							aria-label="Search"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							disabled={!searchKey || searchKey === "all"}
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

					<Col sm={6} className="action-btns">
						<Button
							className="btn-filled custom-refresh icon-dashboard"
							style={{ marginTop: "0px" }}
							onClick={() => {
								setSearch("");
								setSearchKey("");
								getAllInvestors(
									{ pageSize: pageLimit, bookmark: "" },
									token,
									"search",
									false
								);
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
					</Col>
				</Row>
			</div>
		);
	}, [search, searchKey, getAllInvestors, pageLimit, token, investorsList]);

	const getEncryptedPan = (panNumber) => {
		const endDigits = panNumber.slice(-4);
		return endDigits.padStart(panNumber.length, "X");
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
			selector: (row) => (row.uccPanNo ? getEncryptedPan(row.uccPanNo) : "-"),
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
		},
		{
			name: "Client Id",
			selector: (row) => (row.uccClientId ? row.uccClientId : "-"),
			sortable: true,
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
					when: (row) => row.uccEmailStatus === "NOT_VERIFIED",
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
					when: (row) => row.uccMobileStatus === "NOT_VERIFIED",
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
					when: (row) => row.uccPanStatus === "NOT_VERIFIED",
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
				paddingRight: "20px",
			},
		},
	};

	const handleNextPage = () => {
		if (searchKey && search) {
			getAllInvestors(
				{ pageSize: pageLimit, bookmark: newBookmark, [searchKey]: search },
				token,
				"search",
				true
			);
		} else {
			getAllInvestors(
				{ pageSize: pageLimit, bookmark: newBookmark },
				token,
				"",
				true
			);
			setSearch("");
			setSearchKey("");
		}
	};

	const handlePreviousPage = () => {
		if (searchKey && search) {
			setPreviousBookmark();
		} else {
			setPreviousBookmark();
			setSearch("");
			setSearchKey("");
		}
	};

	return (
		<AppLayout page="Dashboard">
			<Sidebar />

			<div className="content content-is-open">
				<DataTable
					columns={columns}
					data={investorsList ? investorsList : []}
					fixedHeader
					subHeader
					subHeaderComponent={subHeaderComponentMemo}
					pointerOnHover
					highlightOnHover
					customStyles={customStyles}
					progressPending={loading}
					progressComponent={<Spinner animation="border" variant="info" />}
				/>
				<div className="arrows">
					<img
						src={
							previousBookmark
								? "/assets/images/left-arrow-dark.png"
								: "/assets/images/left-arrow-grey.png"
						}
						alt="left arrow"
						style={{ cursor: previousBookmark && "pointer" }}
						onClick={previousBookmark ? handlePreviousPage : null}
					/>
					<img
						src={
							investors &&
							investors.length > 0 &&
							investors[investors.length - 1].recordsCount === pageLimit
								? "/assets/images/right-arrow-dark.png"
								: "/assets/images/right-arrow-grey.png"
						}
						alt="right arrow"
						style={{
							cursor:
								investors &&
								investors.length > 0 &&
								investors[investors.length - 1].recordsCount === pageLimit &&
								"pointer",
						}}
						onClick={
							investors &&
							investors.length > 0 &&
							investors[investors.length - 1].recordsCount === pageLimit
								? handleNextPage
								: null
						}
					/>
				</div>
			</div>
		</AppLayout>
	);
};

const mapStateToProps = (state) => {
	return {
		error: state.investor.error,
		loading: state.investor.loading,
		investors: state.investor.investors,
		previousBookmark: state.investor.previousBookmark,
		newBookmark: state.investor.newBookmark,
		token: state.user.token,
	};
};

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ getAllInvestors, setPreviousBookmark }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
