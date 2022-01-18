import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DropdownButton, Dropdown, Figure, Nav } from "react-bootstrap";
import "../../styles/navbar.css";

const Navbar = ({ page, token }) => {
	return (
		<Nav className="customnavbar-container p-3">
			<Nav.Item>
				<img src={"/assets/images/dltkashlogo.png"} alt="logo" />
			</Nav.Item>
			<Nav.Item>
				<h3 className="text-dark">{page}</h3>
			</Nav.Item>
			<Nav.Item>
				{token ? (
					<Nav.Link
						eventKey="link-2"
						href={page === "Login" ? "/register" : "/login"}
					>
						<Nav.Link href="#">
							<div className="icon-user">
								<img src={"/assets/images/dltkashlogo.png"} alt="logo" />
							</div>
						</Nav.Link>
						<DropdownButton className="login-link" title="John Doe">
							<div className="list-login">
								<Dropdown.Item>John Doe</Dropdown.Item>
								<Dropdown.Item>Another action</Dropdown.Item>
								<Dropdown.Item>Logout</Dropdown.Item>
							</div>
						</DropdownButton>
					</Nav.Link>
				) : (
					<Nav.Link
						eventKey="link-2"
						href={page === "Register" ? "/login" : "/register"}
					>
						<p>{page === "Register" ? "Login" : "Register"}</p>
					</Nav.Link>
				)}
			</Nav.Item>
		</Nav>
	);
};

const mapStateToProps = (state) => {
	return {
		token: state.user.token,
	};
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
