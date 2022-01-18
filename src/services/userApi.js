import request from "../utils/request";
import { API_URL } from "../configs";
import { getToken } from "../utils";

const token = getToken();

export const USER_API = {
	async userRegister(payload) {
		const response = await request(
			`${API_URL}/auth/register-exchange`,
			{
				method: "POST",
				headers: {
					"Content-Type": "multipart/form-data",
				},
				body: payload,
			},
			true
		);
		return response;
	},

	async adminRegister(payload) {
		const response = await request(`${API_URL}/auth/register-admin`, {
			method: "POST",
			body: payload,
		});
		return response;
	},

	async userLogin(payload) {
		const response = await request(`${API_URL}/auth/login`, {
			method: "POST",
			body: payload,
		});
		return response;
	},

	async getExchangeDetails(exchangeId, token) {
		const response = await request(
			`${API_URL}/auth/get-exchange?exchangeId=${exchangeId}`,
			{
				method: "GET",
				headers: {
					Authorization: token,
				},
			}
		);
		return response;
	},

	async getAdminDetails(payload) {
		const response = await request(
			`${API_URL}/auth/get-admin`,
			{
				method: "GET",
				headers: {
					Authorization: payload.data.token,
				},
			},
			true
		);
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
