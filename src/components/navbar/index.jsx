import React from "react";
import Nav from "react-bootstrap/Nav";
import { DropdownButton, Dropdown, Figure } from "react-bootstrap";
import "../../styles/navbar.css";

const Navbar = ({ page }) => {
	return (
		<Nav className="customnavbar-container p-3">
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
					<h3 className="text-dark">{page}</h3>
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link
					eventKey="link-2"
					href={page === "Login" ? "/register" : "/login"}
				>
					{/* <p>{page === "Login" ? "Register" : "Login"}</p> */}
					<Nav.Link href="#">
						<div className="icon-user"><img src={"/assets/images/dltkashlogo.png"} alt="logo" /></div>
					</Nav.Link>
					<DropdownButton className="login-link" title="John Doe">
						<div className="list-login">
							<Dropdown.Item>John Doe</Dropdown.Item>
							<Dropdown.Item>Another action</Dropdown.Item>
							<Dropdown.Item>Logout</Dropdown.Item>
						</div>
					</DropdownButton>
				</Nav.Link>
			</Nav.Item>
		</Nav>
	);
};
export default Navbar;
