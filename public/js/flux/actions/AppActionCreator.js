import { dispatch, dispatchAsync } from '../AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

import auth from '../../utils/auth';

export function login(email, pass, cb) {
	// Exit early if we know enough about this user
//	if (AppStore.contains(email, pass)) {
//		return;
//	}
	return new Promise((resolve, reject) => {
		dispatchAsync(auth.login(email, pass), {
			request: ActionTypes.REQUEST_USER,
			success: ActionTypes.REQUEST_USER_SUCCESS,
			failure: ActionTypes.REQUEST_USER_ERROR
		}, { resolve: resolve });
	});
}

export function logout(email, pass) {
	// Exit early if we know enough about this user
//	if (AppStore.contains(email, pass)) {
//		return;
//	}

	dispatch(ActionTypes.LOGOUT, auth.logout());
}

export function changeTab(activeKey) {
	dispatch(ActionTypes.CHANGE_TAB, activeKey);
}