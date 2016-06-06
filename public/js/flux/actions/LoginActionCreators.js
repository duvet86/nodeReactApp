import { dispatch, dispatchAsync } from '../AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

import UserAPI from '../api/UserAPI';

const LoginActionsCreators = {

	login: function (email, password) {
		return new Promise((resolve, reject) => {
			dispatchAsync(UserAPI.login(email, password), {
				request: ActionTypes.REQUEST_LOGIN,
				success: ActionTypes.REQUEST_LOGIN_SUCCESS,
				failure: ActionTypes.REQUEST_LOGIN_ERROR
			}, { resolve: resolve || reject });
		});
	},
	
	getUserInfo: function (token) {
		return new Promise((resolve, reject) => {
			dispatchAsync(UserAPI.getUserInfo(token), {
				request: ActionTypes.REQUEST_USER,
				success: ActionTypes.REQUEST_USER_SUCCESS,
				failure: ActionTypes.REQUEST_USER_ERROR
			}, { resolve: resolve || reject });
		});
	},
	
	logout: function () {
		dispatch(ActionTypes.LOGOUT, UserAPI.logout());
	}
	
};

export default LoginActionsCreators;