import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Dropdown, Nav } from "react-bootstrap";
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
		console.log(key === 3);
		if (key === "3") {
			userLogout();
		}
	};

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
				{token ? (
					<>
						<Dropdown onSelect={handleDropdown}>
							<Dropdown.Toggle
								id="dropdown-button-dark-example1"
								className="login-link"
								as={CustomToggle}
							>
								<div
									style={{
										background: user
											? `url(${user.documentLinks && user.documentLinks.logo})`
											: "url(/assets/images/dltkashlogo.png)",
										height: 70,
										width: 70,
										backgroundPosition: "center center",
										borderRadius: "50%",
										marginRight: "5px",
										backgroundRepeat: "no-repeat",
										backgroundSize: "contain",
										border: "1px solid #4FADEA",
									}}
								/>

								<span style={{ marginRight: "5px", textTransform: "capitalize" }}>
									{user && user.userName}
								</span>
							</Dropdown.Toggle>
							<Dropdown.Menu variant="light" className="list-login">
								<Dropdown.Item eventKey={3}>Logout</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</>
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
