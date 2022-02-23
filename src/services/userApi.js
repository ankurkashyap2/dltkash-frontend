import request from "../utils/request";
import { API_URL } from "../configs";

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
			body: { password: payload.password },
		});
		return response;
	},

	async emailVerification(email) {
		const response = await request(
			`${API_URL}/auth/email-verification?email=${email}`,
			{
				method: "GET",
			}
		);
		return response;
	},

	async mobileVerification(payload) {
		const response = await request(
			`${API_URL}/auth/mobile-verification?mobile=${payload}`,
			{
				method: "GET",
			}
		);
		return response;
	},

	async otpVerification(payload) {
		const response = await request(`${API_URL}/auth/otp-verify`, {
			method: "POST",
			body: payload,
		});
		return response;
	},

	async addUser(payload) {
		const response = await request(`${API_URL}/auth/register-admin`, {
			method: "POST",
			body: payload,
		});
		return response;
	},
};
