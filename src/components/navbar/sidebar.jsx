import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Nav } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { ReactComponent as Logout } from "../icons/Logout.svg";
import { ReactComponent as Dashboard1 } from "../icons/Dashboard1.svg";
import { setSelectedDrawerItem, userLogout } from "../../redux/user/actions";
import { ReactComponent as User } from "../icons/User.svg";
import { ReactComponent as Varification } from "../icons/Varification.svg";
import { ReactComponent as BorderStyle } from "../icons/BorderStyle.svg";

const Sidebar = ({
	setSelectedDrawerItem,
	selectedDrawerTab,
	history,
	profile,
	userLogout,
}) => {
	let location = useLocation();

	return (
		<div className="wrapper">
			{/* <Tab.Container id="left-tabs-example" defaultActiveKey="first"> */}
			<div className="sidebar">
				<ul className="nav_dashboard">
					<Nav variant="pills" className="flex-column">
						<Nav.Item>
							<Nav.Link eventKey="first" href="/">
								<li>
									<a className={location.pathname === "/" ? "active" : ""}>
										<Dashboard1 className="icon-dashboard" alt="dashboard" />
										Dashboard
									</a>
								</li>
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="second" href="/add-user">
								<li>
									<a className={location.pathname === "/add-user" ? "active" : ""}>
										<User alt="user" className="icon-dashboard" /> Add User
									</a>
								</li>
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="Third" href="/ucc-verification">
								<li>
									<a
										className={location.pathname === "/ucc-verification" ? "active" : ""}
									>
										<Varification alt="Verification" className="icon-dashboard" /> UCC
										Verification
									</a>
								</li>
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="Fourth" href="/trails">
								<li>
									<a className={location.pathname === "/trails" ? "active" : ""}>
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
