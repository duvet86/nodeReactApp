import { dispatch, dispatchAsync } from '../AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
//import AppStore from '../stores/AppStore';

import auth from '../../utils/auth'

export function login(email, pass) {
	// Exit early if we know enough about this user
//	if (AppStore.contains(email, pass)) {
//		return;
//	}

	dispatchAsync(auth.login(email, pass), {
		request: ActionTypes.REQUEST_USER,
		success: ActionTypes.REQUEST_USER_SUCCESS,
		failure: ActionTypes.REQUEST_USER_ERROR
	}, {});
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