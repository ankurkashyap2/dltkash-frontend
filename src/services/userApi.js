import request from "../utils/request";
import { API_URL } from "../configs";
import { getToken } from "../utils";

const token = getToken();

export const USER_API = {
	async userRegister(payload) {
		const response = await request(`${API_URL}/auth/register-exchange`, {
			method: "POST",
			body: { ...payload },
		});
		return response;
	},

	async userLogin(payload) {
		const response = await request(`${API_URL}/api/users/login`, {
			method: "POST",
			body: {
				...payload,
			},
		});
		return response;
	},

	// async userUpdate(payload) {
	// 	const response = await request(`${API_URL}/api/users/update`, {
	// 		method: 'POST',
	// 		headers: { Authorization: `Bearer ${token}` },
	// 		body: {
	// 			...payload,
	// 		},
	// 	});
	// 	return response;
	// },

	async userUpdatePassword(payload) {
		const response = await request(`${API_URL}/api/users/update-password`, {
			method: "POST",
			headers: { Authorization: `Bearer ${token}` },
			body: {
				...payload,
			},
		});
		return response;
	},
};
