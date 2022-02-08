import { USER_TOKEN_KEY, USER_KEY, USER_REMEMBER_KEY } from "../configs";

export const getRememberMe = () => {
	return localStorage.getItem(USER_REMEMBER_KEY) || "false";
};

export const setRememberMe = (rememberMe) => {
	return localStorage.setItem(USER_REMEMBER_KEY, rememberMe || "false");
};

export const getToken = () => {
	// if (getRememberMe() === "true") {
	// 	return localStorage.getItem(USER_TOKEN_KEY) || null;
	// } else {
	return sessionStorage.getItem(USER_TOKEN_KEY) || null;
	// }
};

export const setToken = (token) => {
	// if (getRememberMe() === "true") {
	// 	return localStorage.setItem(USER_TOKEN_KEY, token || null);
	// } else {
	return sessionStorage.setItem(USER_TOKEN_KEY, token || null);
	// }
};

export const getProfile = () => {
	// if (getRememberMe() === "true") {
	// 	const profile = localStorage.getItem(USER_KEY) || null;
	// 	if (profile) {
	// 		return JSON.parse(profile);
	// 	}
	// 	return null;
	// } else {
	const profile = sessionStorage.getItem(USER_KEY) || null;
	if (profile) {
		return JSON.parse(profile);
	}
	// 	return null;
	// }
};

export const setProfile = (profile) => {
	// if (getRememberMe() === "true") {
	// 	return localStorage.setItem(USER_KEY, JSON.stringify(profile || null));
	// } else {
	return sessionStorage.setItem(USER_KEY, JSON.stringify(profile || null));
	// }
};
