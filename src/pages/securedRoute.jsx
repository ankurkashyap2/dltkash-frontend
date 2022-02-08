import { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Route, Navigate } from "react-router-dom";
import { setToken, setProfile } from "../redux/user/actions";
import { getProfile, getToken } from "../utils/index";

const SecuredRoute = ({
	path,
	element: Component,
	setToken,
	setProfile,
	token,
	profile,
	children,
}) => {
	const sessionToken = getToken();
	const sessionProfile = getProfile();
	useEffect(() => {
		if (!token || !profile) {
			if (sessionToken) {
				setToken(sessionToken);
			}
			if (sessionProfile) {
				setProfile(sessionProfile);
			}
		}
	}, [token, profile, sessionToken, sessionProfile, setProfile, setToken]);

	return sessionToken && sessionProfile ? (
		children
	) : (
		<Navigate replace to="/login" />
	);
};

const mapStateToProps = (state) => {
	return {
		profile: state.user.profile,
		token: state.user.token,
	};
};

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			setToken,
			setProfile,
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(SecuredRoute);
