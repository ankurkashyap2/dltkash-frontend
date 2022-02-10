import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DropdownButton, Dropdown, Nav } from "react-bootstrap";
import "../../styles/navbar.css";

const Navbar = ({ page, token, user }) => {
	return (
		<Nav className="customnavbar-container">
			<Nav.Item>
				<img src={"/assets/images/dltkashlogo.png"} alt="logo" />
			</Nav.Item>
			<Nav.Item>
				<h3 className="text-dark">{page}</h3>
			</Nav.Item>
			<Nav.Item>
				{token ? (
					<>
						<Nav.Link href="/">
							<div className="icon-user">
								<img src={"/assets/images/dltkashlogo.png"} alt="logo" />
							</div>
						</Nav.Link>
						<DropdownButton className="login-link" title={user && user.userName}>
							<div className="list-login">
								<Dropdown.Item>{user && user.userName}</Dropdown.Item>
								<Dropdown.Item>Another action</Dropdown.Item>
								<Dropdown.Item>Logout</Dropdown.Item>
							</div>
						</DropdownButton>
					</>
				) : (
					<Nav.Link
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

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
