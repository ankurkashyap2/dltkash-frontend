import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import SecuredRoute from "./securedRoute";
import Login from "./login";
import Register from "./register";
import Forgot from "./forgot";
import Dashboard from "./dashboard";
import ResetPassword from "./reset";
import Investor from "./investor";
import Otp from "./otp";
import AddUser from "./addUser";
import UCCVerification from "./uccVerification";
import Trails from "./trails";

const AppRoutes = (props) => {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<Login {...props} />} />
				<Route path="/register" element={<Register {...props} />} />
				<Route path="/forgot-password" element={<Forgot {...props} />} />
				<Route
					path="/reset-password/:token"
					element={<ResetPassword {...props} />}
				/>
				<Route path="/otp" element={<Otp {...props} />} />
				<Route
					path="/investor/email-verification/:uccRequestId/:token"
					element={<Investor {...props} />}
				/>
				<Route
					path="/investor/mobile-verification/:uccRequestId/:token"
					element={<Investor {...props} />}
				/>
				<Route
					path="/add-user"
					element={
						// <SecuredRoute>
						<AddUser {...props} />
						// </SecuredRoute>
					}
				/>
				<Route
					path="/ucc-verification"
					element={
						// <SecuredRoute>
						<UCCVerification {...props} />
						// </SecuredRoute>
					}
				/>
				<Route
					path="/trails"
					element={
						<SecuredRoute>
							<Trails {...props} />
						</SecuredRoute>
					}
				/>
				<Route
					path="/"
					element={
						// <SecuredRoute>
						<Dashboard {...props} />
						// </SecuredRoute>
					}
				/>
			</Routes>
		</Router>
	);
};
export default AppRoutes;
