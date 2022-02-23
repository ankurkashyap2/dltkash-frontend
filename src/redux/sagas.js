import { all, fork } from "redux-saga/effects";
import {
	userSignin,
	userSignup,
	forgotPassword,
	resetPassword,
	emailVerification,
	mobileVerification,
	userLogout,
	addUser,
} from "./user/saga";
import {
	addInvestor,
	getInvestorData,
	verifyInvestorEmail,
	verifyInvestorMobile,
	getAllInvestors,
} from "./investor/saga";

export function* rootSaga() {
	yield all([
		fork(userSignup),
		fork(userSignin),
		fork(forgotPassword),
		fork(resetPassword),
		fork(emailVerification),
		fork(mobileVerification),
		fork(userLogout),
		fork(addInvestor),
		fork(getInvestorData),
		fork(verifyInvestorEmail),
		fork(verifyInvestorMobile),
		fork(getAllInvestors),
		fork(addUser),
	]);
}
