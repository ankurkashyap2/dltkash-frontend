import { takeEvery, put, call } from "redux-saga/effects";
import { push } from "react-router-redux";
import {
	USER_REGISTER,
	USER_LOGIN,
	FORGOT_PASSWORD,
	USER_LOGOUT,
	RESET_PASSWORD,
	EMAIL_VERIFICATION,
	MOBILE_VERIFICATION,
	OTP_VERIFICATION,
} from "../actionTypes";
import {
	userRegisterSuccess,
	userRegisterError,
	userLoginSuccess,
	userLoginError,
	forgotPasswordSuccess,
	forgotPasswordError,
	resetPasswordSuccess,
	resetPasswordError,
	userLogoutSuccess,
	userLogoutError,
	emailVerificationSuccess,
	emailVerificationError,
	mobileVerificationSuccess,
	mobileVerificationError,
	otpVerificationSuccess,
	otpVerificationError,
} from "./actions";
import { USER_API } from "../../services/userApi";
import { setProfile, setToken } from "../../utils";

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
				yield put(userRegisterSuccess());
				navigation("/login");
			} else {
				yield put(userRegisterError(response.error.error.message));
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
				yield put(userLoginError(response.error.error.message));
			}
		} catch (ex) {
			yield put(userLoginError("Error while sign in"));
		}
	});
}

export function* forgotPassword() {
	yield takeEvery(FORGOT_PASSWORD, function* ({ payload }) {
		try {
			const response = yield call(USER_API.forgotPassword, payload);
			if (response.status === 200) {
				yield put(forgotPasswordSuccess(response));
			} else {
				yield put(forgotPasswordError(response.error.error.message));
			}
		} catch (ex) {
			yield put(forgotPasswordError("Error while fetching info"));
		}
	});
}

export function* resetPassword() {
	yield takeEvery(RESET_PASSWORD, function* ({ payload }) {
		try {
			const response = yield call(USER_API.resetPassword, payload);
			if (response.status === 200) {
				yield put(resetPasswordSuccess(response));
			} else {
				yield put(resetPasswordError(response.error.error.message));
			}
		} catch (ex) {
			yield put(resetPasswordError("Error while updating info"));
		}
	});
}

export function* emailVerification() {
	yield takeEvery(EMAIL_VERIFICATION, function* ({ payload }) {
		try {
			const response = yield call(USER_API.emailVerification, payload);
			if (response.status === 200) {
				yield put(emailVerificationSuccess(response.data));
			} else {
				yield put(emailVerificationError(response.error.error.message));
			}
		} catch (ex) {
			yield put(emailVerificationError("Error while verification"));
		}
	});
}

export function* mobileVerification() {
	yield takeEvery(MOBILE_VERIFICATION, function* ({ payload }) {
		try {
			const response = yield call(USER_API.mobileVerification, payload);
			if (response.status === 200) {
				yield put(mobileVerificationSuccess(response));
			} else {
				yield put(mobileVerificationError(response.error.error.message));
			}
		} catch (ex) {
			yield put(mobileVerificationError("Error while verification"));
		}
	});
}

export function* otpVerification() {
	yield takeEvery(OTP_VERIFICATION, function* ({ payload }) {
		try {
			const response = yield call(USER_API.otpVerification, payload);
			if (response.status === 200) {
				yield put(otpVerificationSuccess(response));
			} else {
				yield put(otpVerificationError(response.error.error.message));
			}
		} catch (ex) {
			yield put(otpVerificationError("Error while verification"));
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
