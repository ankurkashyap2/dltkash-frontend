import { all, fork } from "redux-saga/effects";
import {
	userSignin,
	userSignup,
	forgotPassword,
	userLogout,
} from "./user/saga";

export function* rootSaga() {
	yield all([
		fork(userSignup),
		fork(userSignin),
		fork(forgotPassword),
		fork(userLogout),
	]);
}
