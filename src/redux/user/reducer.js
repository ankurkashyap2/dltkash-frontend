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
	RESET_PASSWORD,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_ERROR,
	EMAIL_VERIFICATION,
	EMAIL_VERIFICATION_SUCCESS,
	EMAIL_VERIFICATION_ERROR,
	MOBILE_VERIFICATION,
	MOBILE_VERIFICATION_SUCCESS,
	MOBILE_VERIFICATION_ERROR,
	OTP_VERIFICATION,
	OTP_VERIFICATION_SUCCESS,
	OTP_VERIFICATION_ERROR,
	SET_TOKEN,
	SET_PROFILE,
	USER_LOGOUT,
	USER_LOGOUT_SUCCESS,
	USER_LOGOUT_ERROR,
	RESET_USER_FLAGS,
} from "../actionTypes";

const initState = {
	loading: false,
	error: null,
	profile: null,
	token: "",
	isOTPSent: false,
	isEmailVerified: false,
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
		case RESET_PASSWORD: {
			return {
				...state,
				loading: true,
				error: null,
			};
		}
		case RESET_PASSWORD_SUCCESS: {
			return {
				...state,
				loading: false,
				// profile: action.response.user,
			};
		}
		case RESET_PASSWORD_ERROR: {
			return {
				...state,
				loading: false,
				error: action.error,
			};
		}
		case EMAIL_VERIFICATION: {
			return {
				...state,
				loading: true,
				error: null,
			};
		}
		case EMAIL_VERIFICATION_SUCCESS: {
			return {
				...state,
				loading: false,
				isOTPSent: true,
			};
		}
		case EMAIL_VERIFICATION_ERROR: {
			return {
				...state,
				loading: false,
				error: action.error,
			};
		}
		case MOBILE_VERIFICATION: {
			return {
				...state,
				loading: true,
				error: null,
			};
		}
		case MOBILE_VERIFICATION_SUCCESS: {
			return {
				...state,
				loading: false,
			};
		}
		case MOBILE_VERIFICATION_ERROR: {
			return {
				...state,
				loading: false,
				error: action.error,
			};
		}
		case OTP_VERIFICATION: {
			return {
				...state,
				loading: true,
				error: null,
			};
		}
		case OTP_VERIFICATION_SUCCESS: {
			return {
				...state,
				loading: false,
				isEmailVerified: true,
			};
		}
		case OTP_VERIFICATION_ERROR: {
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
		case RESET_USER_FLAGS: {
			return {
				state: { ...state, [action.flagName]: false },
			};
		}
		default:
			return state;
	}
};

export default userReducer;
