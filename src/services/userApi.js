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
		const response = await request(`${API_URL}/auth/get-admin`, {
			method: "GET",
			headers: {
				Authorization: payload.data.token,
			},
		});
		return response;
	},

	async forgotPassword(payload) {
		const response = await request(
			`${API_URL}/auth/forget-password?email=${payload.email}`,
			{
				method: "GET",
			}
		);
		return response;
	},

	async resetPassword(payload) {
		const response = await request(`${API_URL}/auth/reset-password`, {
			method: "POST",
			headers: {
				Authorization: payload.token,
			},
			body: payload.email,
		});
		return response;
	},

	async emailVerification(payload) {
		const response = await request(
			`${API_URL}/auth/email-verification?email=${payload.email}`,
			{
				method: "GET",
			}
		);
		return response;
	},

	async mobileVerification(payload) {
		const response = await request(
			`${API_URL}/auth/mobile-verification?email=${payload.email}`,
			{
				method: "GET",
			}
		);
		return response;
	},
};
