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
	RESET_USER_FLAGS,
} from "../actionTypes";

export const userRegister = (payload, navigation) => {
	return { type: USER_REGISTER, payload, navigation };
};
export const userRegisterSuccess = (response) => {
	return { type: USER_REGISTER_SUCCESS, response };
};
export const userRegisterError = (error) => {
	return { type: USER_REGISTER_ERROR, error };
};
export const userLogin = (payload, navigation) => {
	return { type: USER_LOGIN, payload, navigation };
};
export const userLoginSuccess = (response) => {
	return { type: USER_LOGIN_SUCCESS, response };
};
export const userLoginError = (error) => {
	return { type: USER_LOGIN_ERROR, error };
};
export const forgotPassword = (payload) => {
	return { type: FORGOT_PASSWORD, payload };
};
export const forgotPasswordSuccess = (response) => {
	return { type: FORGOT_PASSWORD_SUCCESS, response };
};
export const forgotPasswordError = (error) => {
	return { type: FORGOT_PASSWORD_ERROR, error };
};
export const setToken = (token) => {
	return { type: SET_TOKEN, token };
};
export const setProfile = (profile) => {
	return { type: SET_PROFILE, profile };
};
export const userLogout = () => {
	return { type: USER_LOGOUT };
};
export const userLogoutSuccess = () => {
	return { type: USER_LOGOUT_SUCCESS };
};
export const userLogoutError = (error) => {
	return { type: USER_LOGOUT_ERROR, error };
};
export const resetUserFlags = (flagName) => {
	return { type: RESET_USER_FLAGS, flagName };
};
