import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
// import LandingPage from "./landingPage";
import Login from "./login";
import Register from "./register";
import Forgot from "./forgot";

const AppRoutes = (props) => {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<Login {...props} />} />
				<Route path="/register" element={<Register {...props} />} />
				<Route path="/forgot-password" element={<Forgot {...props} />} />
			</Routes>
		</Router>
	);
};
export default AppRoutes;
