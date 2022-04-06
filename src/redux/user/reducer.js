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
	ADD_USER,
	ADD_USER_SUCCESS,
	ADD_USER_ERROR,
	SET_TOKEN,
	SET_PROFILE,
	USER_LOGOUT,
	USER_LOGOUT_SUCCESS,
	USER_LOGOUT_ERROR,
	RESET_USER_FLAGS,
	SET_SELECTED_DRAWER_ITEM,
	CHANGE_SETTINGS,
	CHANGE_SETTINGS_SUCCESS,
	CHANGE_SETTINGS_ERROR,
} from "../actionTypes";

const initState = {
	loading: false,
	error: null,
	profile: null,
	token: null,
	isEmailOTPSent: false,
	isMobileOTPSent: false,
	receivedEmailOTP: "",
	receivedMobileOTP: "",
	isEmailVerified: false,
	isLinkSent: false,
	selectedDrawerTab: "dashboard",
	isUserAdded: false,
	isUserRegistered: false,
	isPasswordReset: false,
	operationUserError: null,
	isSettingChanged: false,
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
				isUserRegistered: true,
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
				isLinkSent: true,
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
				isPasswordReset: true,
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
				receivedEmailOTP: "",
				isEmailOTPSent: false,
			};
		}
		case EMAIL_VERIFICATION_SUCCESS: {
			return {
				...state,
				loading: false,
				isEmailOTPSent: true,
				receivedEmailOTP: action.response.enc,
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
				receivedMobileOTP: "",
				isMobileOTPSent: false,
			};
		}
		case MOBILE_VERIFICATION_SUCCESS: {
			return {
				...state,
				loading: false,
				receivedMobileOTP: action.response.data.verification,
				isMobileOTPSent: true,
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
		case ADD_USER: {
			return {
				...state,
				loading: true,
				error: action.payload.role === "ADMIN" ? null : state.error,
				operationUserError:
					action.payload.role === "OPERATIONAL" ? null : state.operationUserError,
			};
		}
		case ADD_USER_SUCCESS: {
			return {
				...state,
				loading: false,
				isUserAdded: true,
			};
		}
		case ADD_USER_ERROR: {
			return {
				...state,
				loading: false,
				error: action.role === "ADMIN" ? action.error : state.error,
				operationUserError:
					action.role === "OPERATIONAL" ? action.error : state.operationUserError,
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
				token: null,
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
				...state,
				[action.flagName]: false,
			};
		}
		case SET_SELECTED_DRAWER_ITEM: {
			return {
				...state,
				selectedDrawerTab: action.drawerTab,
			};
		}
		case CHANGE_SETTINGS:
			return {
				...state,
				loading: true,
				error: null,
			};
		case CHANGE_SETTINGS_SUCCESS:
			return {
				...state,
				loading: false,
				isSettingChanged: true,
				profile: { ...state.profile, ...action.response },
			};
		case CHANGE_SETTINGS_ERROR:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		default:
			return state;
	}
};

export default userReducer;
