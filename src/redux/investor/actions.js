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
export const resetInvestorFlags = (flagName) => {
	return { type: RESET_INVESTOR_FLAGS, flagName };
};