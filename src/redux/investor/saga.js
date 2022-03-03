import { takeEvery, put, call } from "redux-saga/effects";
import {
	ADD_SINGLE_INVESTOR,
	GET_EXCHANGE_INVESTOR_DATA,
	VERIFY_INVESTOR_EMAIL,
	VERIFY_INVESTOR_MOBILE,
	GET_ALL_INVESTORS,
	MOBILE_REDIRECTION,
} from "../actionTypes";
import {
	addSingleInvestorSuccess,
	addSingleInvestorError,
	getExchangeInvestorDataSuccess,
	getExchangeInvestorDataError,
	verifyInvestorEmailSuccess,
	verifyInvestorEmailError,
	verifyInvestorMobileSuccess,
	verifyInvestorMobileError,
	getAllInvestorsSuccess,
	getAllInvestorsError,
	mobileRedirectionSuccess,
	mobileRedirectionError,
} from "./actions";
import { INVESTOR_API } from "../../services/investorApi";

export function* addInvestor() {
	yield takeEvery(ADD_SINGLE_INVESTOR, function* ({ payload, token }) {
		try {
			const response = yield call(INVESTOR_API.addSingleInvestor, payload, token);
			if (response.status === 200) {
				yield put(addSingleInvestorSuccess());
			} else {
				yield put(addSingleInvestorError(response.error.error.message));
			}
		} catch (ex) {
			yield put(addSingleInvestorError("Error while adding Investor"));
		}
	});
}

export function* getInvestorData() {
	yield takeEvery(GET_EXCHANGE_INVESTOR_DATA, function* ({ payload, token }) {
		try {
			const response = yield call(
				INVESTOR_API.getExchangeInvestorData,
				payload,
				token
			);
			if (response.status === 200) {
				yield put(getExchangeInvestorDataSuccess(response.data.data));
			} else {
				yield put(getExchangeInvestorDataError(response.error.error.message));
			}
		} catch (ex) {
			yield put(
				getExchangeInvestorDataError("Error while fetching Exchange Investor data")
			);
		}
	});
}

export function* verifyInvestorEmail() {
	yield takeEvery(VERIFY_INVESTOR_EMAIL, function* ({ payload, token }) {
		try {
			const response = yield call(
				INVESTOR_API.verifyInvestorEmail,
				payload,
				token
			);
			if (response.status === 200) {
				yield put(verifyInvestorEmailSuccess(response.data.data));
			} else {
				yield put(verifyInvestorEmailError(response.error.error.message));
			}
		} catch (ex) {
			yield put(verifyInvestorEmailError("Error while verifying Email"));
		}
	});
}

export function* verifyInvestorMobile() {
	yield takeEvery(VERIFY_INVESTOR_MOBILE, function* ({ payload, token }) {
		try {
			const response = yield call(
				INVESTOR_API.verifyInvestorMobile,
				payload,
				token
			);
			if (response.status === 200) {
				yield put(verifyInvestorMobileSuccess(response.data.data));
			} else {
				yield put(verifyInvestorMobileError(response.error.error.message));
			}
		} catch (ex) {
			yield put(verifyInvestorMobileError("Error while verifying mobile"));
		}
	});
}

export function* getAllInvestors() {
	yield takeEvery(GET_ALL_INVESTORS, function* ({ payload, token, typekey }) {
		try {
			const response = yield call(INVESTOR_API.getAllInvestors, payload, token);
			if (response.status === 200) {
				yield put(getAllInvestorsSuccess(response.data.data, typekey));
			} else {
				yield put(getAllInvestorsError(response.error.error.message));
			}
		} catch (ex) {
			yield put(getAllInvestorsError("Error while fetching investors"));
		}
	});
}

export function* mobileRedirection() {
	yield takeEvery(MOBILE_REDIRECTION, function* ({ payload }) {
		try {
			const response = yield call(INVESTOR_API.mobileRedirection, payload);
			if (response.status === 200) {
				yield put(mobileRedirectionSuccess(response.data));
			} else {
				yield put(mobileRedirectionError(response.error.error.message));
			}
		} catch (ex) {
			yield put(mobileRedirectionError("Error while redirecting"));
		}
	});
}
