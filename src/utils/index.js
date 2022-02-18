import { USER_TOKEN_KEY, USER_KEY } from "../configs";

export const getToken = () => {
	return sessionStorage.getItem(USER_TOKEN_KEY) || null;
};

export const setToken = (token) => {
	return sessionStorage.setItem(USER_TOKEN_KEY, token || null);
};

export const getProfile = () => {
	const profile = sessionStorage.getItem(USER_KEY) || null;
	if (profile) {
		return JSON.parse(profile);
	}
};

export const setProfile = (profile) => {
	return sessionStorage.setItem(USER_KEY, JSON.stringify(profile || null));
};

export const generateOTP = () => {
	let otp = Math.floor(100000 + Math.random() * 900000);
	return otp;
};
