import { all } from 'redux-saga/effects';
// import { appInit } from './app/saga';

export function* rootSaga() {
	yield all([
		// fork(appInit),
	]);
}
