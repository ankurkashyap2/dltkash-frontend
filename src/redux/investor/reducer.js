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
	GET_ALL_INVESTORS,
	GET_ALL_INVESTORS_SUCCESS,
	GET_ALL_INVESTORS_ERROR,
	MOBILE_REDIRECTION,
	MOBILE_REDIRECTION_SUCCESS,
	MOBILE_REDIRECTION_ERROR,
	RESET_ON_LOGOUT,
	RESET_EXCHANGE_DATA,
	SET_PREVIOUS_BOOKMARK,
} from "../actionTypes";

const initState = {
	loading: false,
	error: null,
	isInvestorCreated: false,
	investorData: null,
	isEmailVerified: false,
	isMobileVerified: false,
	investors: [],
	redirectionUrl: "",
	previousBookmark: "",
	newBookmark: "",
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
				investorData: action.response,
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
				investorData: action.response,
			};
		case VERIFY_INVESTOR_MOBILE_ERROR:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case GET_ALL_INVESTORS:
			return {
				...state,
				loading: true,
				error: null,
			};
		case GET_ALL_INVESTORS_SUCCESS:
			let investors = state.investors;
			if (action.typekey === "search") {
				investors = [action.response];
			} else {
				investors = [...state.investors, action.response];
			}
			return {
				...state,
				loading: false,
				isMobileVerified: true,
				investors: investors,
				previousBookmark:
					state.investors.length >= 2
						? state.investors[state.investors.length - 2].bookmark
						: "",
				newBookmark: action.response.bookmark,
			};
		case GET_ALL_INVESTORS_ERROR:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		case MOBILE_REDIRECTION:
			return {
				...state,
				loading: true,
				error: null,
				redirectionUrl: "",
			};
		case MOBILE_REDIRECTION_SUCCESS:
			return {
				...state,
				loading: false,
				redirectionUrl: action.response.data,
			};
		case MOBILE_REDIRECTION_ERROR:
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
		case RESET_ON_LOGOUT:
			return {
				...initState,
			};
		case RESET_EXCHANGE_DATA:
			return {
				...state,
				investorData: null,
			};
		case SET_PREVIOUS_BOOKMARK:
			let temp = state.investors;
			temp.splice(temp.length - 1, 1);
			return {
				...state,
				investors: temp,
				previousBookmark:
					state.investors.length >= 2
						? state.investors[state.investors.length - 2].bookmark
						: "",
				newBookmark: state.investors[state.investors.length - 1].bookmark,
			};
		default:
			return state;
	}
};

export default investorReducer;
