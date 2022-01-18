import { takeEvery, put, call } from "redux-saga/effects";
import { push } from "react-router-redux";
import {
	USER_REGISTER,
	USER_LOGIN,
	FORGOT_PASSWORD,
	USER_LOGOUT,
} from "../actionTypes";
import {
	userRegisterSuccess,
	userRegisterError,
	userLoginSuccess,
	userLoginError,
	forgotPasswordSuccess,
	forgotPasswordError,
	userLogoutSuccess,
	userLogoutError,
} from "./actions";
import { USER_API } from "../../services/userApi";
import { setProfile, setToken, setRememberMe } from "../../utils";

export function* userSignup() {
	yield takeEvery(USER_REGISTER, function* ({ payload, navigation }) {
		try {
			const entity = new FormData();
			console.log(payload);
			for (const key in payload) {
				entity.append(key, payload[key]);
			}
			const response = yield call(USER_API.userRegister, entity);
			if (response.status === 200) {
				// const adminResponse = yield call(USER_API.adminRegister, {
				// 	...payload.admin,
				// 	exchangeId: response.data.data._id,
				// });
				// if (adminResponse.status === 200) {
				yield put(userRegisterSuccess());
				navigation("/login");
				// }
			} else {
				yield put(userRegisterError(response.data.error));
			}
		} catch (ex) {
			yield put(userRegisterError("Error while registration"));
		}
	});
}

export function* userSignin() {
	yield takeEvery(USER_LOGIN, function* ({ payload, navigation }) {
		try {
			const response = yield call(USER_API.userLogin, payload);
			if (response.status === 200) {
				const adminDetailsResponse = yield call(USER_API.getAdminDetails, response);
				if (adminDetailsResponse.status === 200) {
					const exchangeDetailsResponse = yield call(
						USER_API.getExchangeDetails,
						adminDetailsResponse.data.data.exchangeId,
						response.data.token
					);
					if (exchangeDetailsResponse.status === 200) {
						yield put(
							userLoginSuccess({
								token: response.data.token,
								admin: adminDetailsResponse.data.data,
								exchange: exchangeDetailsResponse.data.data,
							})
						);
						yield call(setToken, response.data.token);
						navigation("/dashboard");
					}
				}
			} else {
				yield put(userLoginError(response.data.error));
			}
		} catch (ex) {
			console.log("ex", ex);
			yield put(userLoginError("Error while sign in"));
		}
	});
}

export function* forgotPassword() {
	yield takeEvery(FORGOT_PASSWORD, function* ({ payload }) {
		try {
			const response = yield call(USER_API.forgotPassword, payload);

			if (response.data.status === "ok") {
				yield put(
					forgotPasswordSuccess({
						user: response.data.data.user,
					})
				);
				yield call(setProfile, response.data.data.user);
			} else {
				yield put(forgotPasswordError(response.data.error));
			}
		} catch (ex) {
			yield put(forgotPasswordError("Error while updating info"));
		}
	});
}

export function* userLogout() {
	yield takeEvery(USER_LOGOUT, function* () {
		try {
			yield put(userLogoutSuccess());
			yield call(setProfile, null);
			yield call(setToken, null);
		} catch (ex) {
			yield put(userLogoutError("Error while logout"));
		}
	});
}
