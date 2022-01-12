import React from "react";
import Nav from "react-bootstrap/Nav";
import "../../styles/navbar.css";

function Navbar() {
	return (
		<Nav className="customnavbar-container">
			<Nav.Item>
				<Nav.Link href="#">
					<img src={"/assets/images/dltkashlogo.png"} alt="logo" />
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link eventKey="link-1" href="/login">
					<h3>Login</h3>
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link eventKey="link-2" href="/register">
					<p>Register</p>
				</Nav.Link>
			</Nav.Item>
		</Nav>
	);
}
export default Navbar;
