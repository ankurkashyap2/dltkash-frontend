import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
// import LandingPage from "./landingPage";
// import SecuredRoute from "./securedRoute";
import Login from "./login";
import Register from "./register";
import Forgot from "./forgot";
import Dashboard from "./dashboard";
import ResetPassword from "./reset";
import Investor from "./Investor";
import Otp from "./otp";

const AppRoutes = (props) => {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<Login {...props} />} />
				<Route path="/register" element={<Register {...props} />} />
				<Route path="/forgot-password" element={<Forgot {...props} />} />
				<Route path="/reset-password" element={<ResetPassword {...props} />} />
				<Route path="/otp" element={<Otp {...props} />} />
				<Route path="/investor" element={<Investor {...props} />} />
				<Route path="/dashboard" element={<Dashboard {...props} />} />
				<Route path="/" element={<Login {...props} />} />
			</Routes>
		</Router>
	);
};
export default AppRoutes;
