import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Dropdown, Nav, Row } from "react-bootstrap";
import { userLogout } from "../../redux/user/actions";
import "../../styles/navbar.css";

const Navbar = ({ page, token, user, userLogout }) => {
	const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
		<div
			className="icon-user"
			ref={ref}
			onClick={(e) => {
				e.preventDefault();
				onClick(e);
			}}
		>
			{children}
			&#x25bc;
		</div>
	));

	const handleDropdown = (key) => {
		if (key === "3") {
			userLogout();
		}
	};
	console.log(user);
	return (
		<Nav className="customnavbar-container">
			<Nav.Item>
				<div
					style={{
						background: user
							? `url(${user.documentLinks && user.documentLinks.logo})`
							: "url(/assets/images/dltkashlogo.png)",
						height: user ? 70 : 90,
						width: user ? 70 : 110,
					}}
					className="left-logo"
				/>
			</Nav.Item>
			<Nav.Item>
				<h3 className="text-dark">{page}</h3>
			</Nav.Item>
			<Nav.Item>
				{user ? (
					<Row>
						{/* <div
							style={{
								background: `url(${user.documentLinks && user.documentLinks.logo})`,
							}}
							className="right-logo"
						/> */}
						{/* <img
							src={
								user
									? user.documentLinks && user.documentLinks.logo
									: "/assets/images/dltkashlogo.png"
							}
							className="right-logo"
						/> */}
						<Dropdown onSelect={handleDropdown}>
							<Dropdown.Toggle
								id="dropdown-button-dark-example1"
								className="login-link"
								as={CustomToggle}
							>
								<img
									src={
										user
											? user.documentLinks && user.documentLinks.logo
											: "/assets/images/dltkashlogo.png"
									}
									alt="logo"
								/>

								<span
									style={{
										marginRight: "5px",
										marginLeft: "5px",
										textTransform: "capitalize",
									}}
								>
									{user && user.userName}
								</span>
							</Dropdown.Toggle>
							<Dropdown.Menu variant="light" className="list-login">
								<Dropdown.Item eventKey={3}>
									<img
										src={"/assets/images/switch.png"}
										className="logout-icon"
										alt="logout icon"
									/>
									Logout
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Row>
				) : (
					<Nav.Link
						className="top-link"
						eventKey="link-2"
						href={page === "Registration" ? "/login" : "/register"}
					>
						<p className="text-link">
							{page === "Registration" ? "Login" : "Register"}
						</p>
					</Nav.Link>
				)}
			</Nav.Item>
		</Nav>
	);
};

const mapStateToProps = (state) => {
	return {
		token: state.user.token,
		user: state.user.profile,
	};
};

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ userLogout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
