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
	GET_ALL_INVESTORS,
	GET_ALL_INVESTORS_SUCCESS,
	GET_ALL_INVESTORS_ERROR,
	MOBILE_REDIRECTION,
	MOBILE_REDIRECTION_SUCCESS,
	MOBILE_REDIRECTION_ERROR,
	RESET_INVESTOR_FLAGS,
	RESET_ON_LOGOUT,
	RESET_EXCHANGE_DATA,
	SET_PREVIOUS_BOOKMARK,
} from "../actionTypes";

export const addSingleInvestor = (payload, token) => {
	return { type: ADD_SINGLE_INVESTOR, payload, token };
};
export const addSingleInvestorSuccess = (response) => {
	return { type: ADD_SINGLE_INVESTOR_SUCCESS, response };
};
export const addSingleInvestorError = (error) => {
	return { type: ADD_SINGLE_INVESTOR_ERROR, error };
};
export const getExchangeInvestorData = (payload, token) => {
	return { type: GET_EXCHANGE_INVESTOR_DATA, payload, token };
};
export const getExchangeInvestorDataSuccess = (response) => {
	return { type: GET_EXCHANGE_INVESTOR_DATA_SUCCESS, response };
};
export const getExchangeInvestorDataError = (error) => {
	return { type: GET_EXCHANGE_INVESTOR_DATA_ERROR, error };
};
export const verifyInvestorEmail = (payload, token) => {
	return { type: VERIFY_INVESTOR_EMAIL, payload, token };
};
export const verifyInvestorEmailSuccess = (response) => {
	return { type: VERIFY_INVESTOR_EMAIL_SUCCESS, response };
};
export const verifyInvestorEmailError = (error) => {
	return { type: VERIFY_INVESTOR_EMAIL_ERROR, error };
};
export const verifyInvestorMobile = (payload, token) => {
	return { type: VERIFY_INVESTOR_MOBILE, payload, token };
};
export const verifyInvestorMobileSuccess = (response) => {
	return { type: VERIFY_INVESTOR_MOBILE_SUCCESS, response };
};
export const verifyInvestorMobileError = (error) => {
	return { type: VERIFY_INVESTOR_MOBILE_ERROR, error };
};
export const getAllInvestors = (payload, token, typekey) => {
	return { type: GET_ALL_INVESTORS, payload, token, typekey };
};
export const getAllInvestorsSuccess = (response, typekey) => {
	return { type: GET_ALL_INVESTORS_SUCCESS, response, typekey };
};
export const getAllInvestorsError = (error) => {
	return { type: GET_ALL_INVESTORS_ERROR, error };
};
export const mobileRedirection = (payload) => {
	return { type: MOBILE_REDIRECTION, payload };
};
export const mobileRedirectionSuccess = (response) => {
	return { type: MOBILE_REDIRECTION_SUCCESS, response };
};
export const mobileRedirectionError = (error) => {
	return { type: MOBILE_REDIRECTION_ERROR, error };
};
export const resetInvestorFlags = (flagName) => {
	return { type: RESET_INVESTOR_FLAGS, flagName };
};
export const resetOnLogout = () => {
	return { type: RESET_ON_LOGOUT };
};
export const resetExchangeData = () => {
	return { type: RESET_EXCHANGE_DATA };
};
export const setPreviousBookmark = () => {
	return { type: SET_PREVIOUS_BOOKMARK };
};
