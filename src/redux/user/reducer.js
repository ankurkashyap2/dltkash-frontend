import {
	USER_REGISTER,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_ERROR,
	USER_LOGIN,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_ERROR,
	FORGOT_PASSWORD,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_ERROR,
	SET_TOKEN,
	SET_PROFILE,
	USER_LOGOUT,
	USER_LOGOUT_SUCCESS,
	USER_LOGOUT_ERROR,
} from "../actionTypes";

const initState = {
	loading: false,
	error: null,
	user: null,
	token: "",
};

const userReducer = (state = initState, action) => {
	switch (action.type) {
		case USER_REGISTER:
			return {
				...state,
				loading: true,
				error: null,
			};
		case USER_REGISTER_SUCCESS:
			return {
				...state,
				loading: false,
				token: action.response.token,
				profile: action.response.user,
			};
		case USER_REGISTER_ERROR:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case USER_LOGIN: {
			return {
				...state,
				error: null,
				loading: true,
			};
		}
		case USER_LOGIN_SUCCESS: {
			return {
				...state,
				loading: false,
				token: action.response.token,
				profile: action.response.user,
			};
		}
		case USER_LOGIN_ERROR: {
			return {
				...state,
				loading: false,
				error: action.error,
			};
		}
		case FORGOT_PASSWORD: {
			return {
				...state,
				loading: true,
				error: null,
			};
		}
		case FORGOT_PASSWORD_SUCCESS: {
			return {
				...state,
				loading: false,
				// profile: action.response.user,
			};
		}
		case FORGOT_PASSWORD_ERROR: {
			return {
				...state,
				loading: false,
				error: action.error,
			};
		}
		case SET_TOKEN: {
			return {
				...state,
				token: action.token,
			};
		}
		case SET_PROFILE: {
			return {
				...state,
				profile: action.profile,
			};
		}
		case USER_LOGOUT: {
			return {
				...state,
				loading: true,
				error: null,
			};
		}
		case USER_LOGOUT_SUCCESS: {
			return {
				...state,
				loading: false,
				profile: null,
				error: null,
				token: "",
			};
		}
		case USER_LOGOUT_ERROR: {
			return {
				...state,
				loading: false,
				error: action.error,
			};
		}
		default:
			return state;
	}
};

export default userReducer;
