import {
	ADD_SINGLE_INVESTOR,
	ADD_SINGLE_INVESTOR_SUCCESS,
	ADD_SINGLE_INVESTOR_ERROR,
	GET_EXCHANGE_INVESTOR_DATA,
	GET_EXCHANGE_INVESTOR_DATA_SUCCESS,
	GET_EXCHANGE_INVESTOR_DATA_ERROR,
	VERIFY_INVESTOR_EMAIL,
	VERIFY_INVESTOR_EMAIL_SUCCESS,
	VERIFY_INVESTOR_EMAIL_ERROR,
	VERIFY_INVESTOR_MOBILE,
	VERIFY_INVESTOR_MOBILE_SUCCESS,
	VERIFY_INVESTOR_MOBILE_ERROR,
	RESET_INVESTOR_FLAGS,
} from "../actionTypes";

const initState = {
	loading: false,
	error: null,
	isInvestorCreated: false,
	investorData: null,
	isEmailVerified: false,
	isMobileVerified: false,
};

const investorReducer = (state = initState, action) => {
	switch (action.type) {
		case ADD_SINGLE_INVESTOR:
			return {
				...state,
				loading: true,
				error: null,
			};
		case ADD_SINGLE_INVESTOR_SUCCESS:
			return {
				...state,
				loading: false,
				isInvestorCreated: true,
			};
		case ADD_SINGLE_INVESTOR_ERROR:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case GET_EXCHANGE_INVESTOR_DATA:
			return {
				...state,
				loading: true,
				error: null,
			};
		case GET_EXCHANGE_INVESTOR_DATA_SUCCESS:
			return {
				...state,
				loading: false,
				investorData: action.response,
			};
		case GET_EXCHANGE_INVESTOR_DATA_ERROR:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case VERIFY_INVESTOR_EMAIL:
			return {
				...state,
				loading: true,
				error: null,
			};
		case VERIFY_INVESTOR_EMAIL_SUCCESS:
			return {
				...state,
				loading: false,
				isEmailVerified: true,
			};
		case VERIFY_INVESTOR_EMAIL_ERROR:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case VERIFY_INVESTOR_MOBILE:
			return {
				...state,
				loading: true,
				error: null,
			};
		case VERIFY_INVESTOR_MOBILE_SUCCESS:
			return {
				...state,
				loading: false,
				isMobileVerified: true,
			};
		case VERIFY_INVESTOR_MOBILE_ERROR:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case RESET_INVESTOR_FLAGS:
			return {
				...state,
				[action.flagName]: false,
			};
		default:
			return state;
	}
};

export default investorReducer;
