import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useLocation } from "react-router-dom";
import { mobileRedirection } from "../redux/investor/actions";

const MobileRedirect = ({ mobileRedirection, redirectionUrl, history }) => {
	let location = useLocation();

	useEffect(() => {
		if (location && location.pathname.includes("/mobile/")) {
			mobileRedirection(location.pathname);
		}
	}, [location, mobileRedirection]);
	useEffect(() => {
		if (redirectionUrl) {
			window.location.href = redirectionUrl;
		}
	}, [redirectionUrl]);

	return <div />;
};

const mapStateToProps = (state) => {
	return {
		error: state.investor.error,
		loading: state.investor.loading,
		redirectionUrl: state.investor.redirectionUrl,
	};
};

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ mobileRedirection }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MobileRedirect);
