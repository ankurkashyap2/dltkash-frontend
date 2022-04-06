import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Nav, Offcanvas, Navbar } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { ReactComponent as Dashboard1 } from "../icons/Dashboard1.svg";
import { setSelectedDrawerItem, userLogout } from "../../redux/user/actions";
import { ReactComponent as User } from "../icons/User.svg";
import { ReactComponent as Varification } from "../icons/Varification.svg";
import { ReactComponent as Settings } from "../icons/gears-solid.svg";
import "../../styles/sidebar.css";

const Sidebar = ({
	setSelectedDrawerItem,
	selectedDrawerTab,
	history,
	profile,
	userLogout,
}) => {
	let location = useLocation();

	const renderWeb = () => {
		return (
			<Navbar className="nav_dashboard">
				<Nav variant="pills" className="flex-column">
					<Nav.Item>
						<Nav.Link
							eventKey="first"
							href="/"
							className={location.pathname === "/" ? "active" : ""}
						>
							<Dashboard1 className="icon-dashboard" alt="dashboard" />
							Dashboard
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link
							eventKey="second"
							href="/add-user"
							className={location.pathname === "/add-user" ? "active" : ""}
						>
							<User alt="user" className="icon-dashboard" /> Add User
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link
							eventKey="Third"
							href="/ucc-verification"
							className={location.pathname === "/ucc-verification" ? "active" : ""}
						>
							<Varification alt="Verification" className="icon-dashboard" /> UCC
							Verification
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link
							eventKey="fourth"
							href="/settings"
							className={location.pathname === "/settings" ? "active" : ""}
						>
							<Settings alt="Settings" className="icon-dashboard" /> Settings
						</Nav.Link>
					</Nav.Item>
					{/* <Nav.Item>
							<Nav.Link
								eventKey="Fourth"
								href="/trails"
								className={location.pathname === "/trails" ? "active" : ""}
							>
								<BorderStyle alt="trails" className="icon-dashboard" /> Trails
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="Fourth" onClick={() => userLogout()}>
								<Logout alt="Logout" className="icon-dashboard" /> Logout
							</Nav.Link>
						</Nav.Item> */}
				</Nav>
			</Navbar>
		);
	};

	const renderMobile = () => {
		return (
			<Navbar
				bg="light"
				expand={false}
				style={{
					padding: 0,
					borderRadius: "5px",
					marginTop: "5px",
					marginLeft: "20px",
				}}
			>
				<Navbar.Toggle aria-controls="offcanvasNavbar">
					<img src="/assets/images/menu.png" alt="menu" width="18px" />
				</Navbar.Toggle>
				<Navbar.Offcanvas
					id="offcanvasNavbar"
					aria-labelledby="offcanvasNavbarLabel"
					placement="start"
				>
					<Offcanvas.Body className="nav_dashboard">
						<Nav variant="pills" className="flex-column">
							<Nav.Item>
								<Nav.Link
									eventKey="first"
									href="/"
									className={location.pathname === "/" ? "active" : ""}
								>
									<Dashboard1 className="icon-dashboard" alt="dashboard" />
									Dashboard
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link
									eventKey="second"
									href="/add-user"
									className={location.pathname === "/add-user" ? "active" : ""}
								>
									<User alt="user" className="icon-dashboard" /> Add User
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link
									eventKey="Third"
									href="/ucc-verification"
									className={location.pathname === "/ucc-verification" ? "active" : ""}
								>
									<Varification alt="Verification" className="icon-dashboard" /> UCC
									Verification
								</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link
									eventKey="fourth"
									href="/settings"
									className={location.pathname === "/settings" ? "active" : ""}
								>
									<Settings alt="Settings" className="icon-dashboard" />
									Settings
								</Nav.Link>
							</Nav.Item>
							{/* <Nav.Item>
							<Nav.Link
								eventKey="Fourth"
								href="/trails"
								className={location.pathname === "/trails" ? "active" : ""}
							>
								<BorderStyle alt="trails" className="icon-dashboard" /> Trails
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="Fourth" onClick={() => userLogout()}>
								<Logout alt="Logout" className="icon-dashboard" /> Logout
							</Nav.Link>
						</Nav.Item> */}
						</Nav>
					</Offcanvas.Body>
				</Navbar.Offcanvas>
			</Navbar>
		);
	};
	return (
		<div className="wrapper">
			<div className="sidebar-web sidebar">{renderWeb()}</div>
			<div className="sidebar-mobile">{renderMobile()}</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		loading: state.user.loading,
		profile: state.user.profile,
		error: state.user.error,
		selectedDrawerTab: state.user.selectedDrawerTab,
	};
};

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			setSelectedDrawerItem,
			userLogout,
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
