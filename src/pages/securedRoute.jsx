import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Redirect } from 'react-router-dom';
import { setToken, setProfile } from '../redux/user/actions';
import { getProfile, getToken } from '../utils/index';

const SecuredRoute = ({
	component: Component,
	setToken,
	setProfile,
	token,
	profile,
	noMatch,
	...rest
}) => {
	useEffect(() => {
		if (!token || !profile) {
			const token = getToken();
			const profile = getProfile();
			if (token !== 'null' && token !== null) {
				setToken(token);
			}
		
			if (profile) {
				setProfile(profile);
			}
		}
	}, [token, profile]);


	return token && profile ? (
		
		<Route {...rest} render={(props) => <Component {...props} />} />
	) : (
		<Route {...rest} render={() => <Redirect to={{ pathname: noMatch }} />} />
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
