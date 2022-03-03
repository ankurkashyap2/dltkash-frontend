import request from "../utils/request";
import { API_URL } from "../configs";

export const INVESTOR_API = {
	async addSingleInvestor(payload, token) {
		const response = await request(
			`${API_URL}/investors/create-investor`,
			{
				method: "POST",
				body: payload,
				headers: {
					Authorization: token,
				},
			},
			true
		);
		return response;
	},

	async getExchangeInvestorData(payload, token) {
		const response = await request(
			`${API_URL}/investors/get-data`,
			{
				method: "POST",
				body: payload,
				headers: {
					Authorization: token,
				},
			},
			true
		);
		return response;
	},

	async verifyInvestorEmail(payload, token) {
		const response = await request(
			`${API_URL}/investors/verify/email?status=${payload}`,
			{
				method: "GET",
				headers: {
					Authorization: token,
				},
			},
			true
		);
		return response;
	},

	async verifyInvestorMobile(payload, token) {
		const response = await request(
			`${API_URL}/investors/verify/mobile?status=${payload}`,
			{
				method: "GET",
				headers: {
					Authorization: token,
				},
			},
			true
		);
		return response;
	},

	async getAllInvestors(payload, token) {
		let queryString = "";

		for (const key in payload) {
			queryString = payload[key]
				? queryString.concat(key + "=" + payload[key] + "&")
				: queryString;
		}
		let url = queryString
			? `${API_URL}/exchange/search?${queryString}`
			: `${API_URL}/exchange/search`;
		const response = await request(
			url,
			{
				method: "GET",
				headers: {
					Authorization: token,
				},
			},
			true
		);
		return response;
	},

	async mobileRedirection(payload) {
		const response = await request("https://uat.dltkash.com" + payload, {
			method: "GET",
		});
		return response;
	},
};
