import React from "react";
import Nav from "react-bootstrap/Nav";
import "../../styles/navbar.css";

const Navbar = ({ page }) => {
	return (
		<Nav className="customnavbar-container">
			<Nav.Item>
				<Nav.Link href="#">
					<img src={"/assets/images/dltkashlogo.png"} alt="logo" />
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link
					eventKey="link-1"
					// href={page === "Login" ? "/register" : "/login"}
				>
					<h3>{page}</h3>
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link
					eventKey="link-2"
					href={page === "Login" ? "/register" : "/login"}
				>
					<p>{page === "Login" ? "Register" : "Login"}</p>
				</Nav.Link>
			</Nav.Item>
		</Nav>
	);
};
export default Navbar;
