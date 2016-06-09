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
			}, { resolve: resolve, reject: reject });
		});
	},
	
	getUserInfo: function (token) {
		return new Promise((resolve, reject) => {
			dispatchAsync(UserAPI.getUserInfo(token), {
				request: ActionTypes.REQUEST_USER,
				success: ActionTypes.REQUEST_USER_SUCCESS,
				failure: ActionTypes.REQUEST_USER_ERROR
			}, { resolve: resolve, reject: reject });
		});
	},

	validateToken: function (token) {
		return new Promise((resolve, reject) => {
			dispatchAsync(UserAPI.validateToken(token), {
				request: ActionTypes.REQUEST_VALIDATE_TOKEN,
				success: ActionTypes.REQUEST_VALIDATE_TOKEN_SUCCESS,
				failure: ActionTypes.REQUEST_VALIDATE_TOKEN_ERROR
			}, { resolve: resolve, reject: reject });
		});
	},
	
	logout: function () {
		return new Promise((resolve, reject) => {
			dispatch(ActionTypes.LOGOUT, {
				action: UserAPI.logout(),
				resolve: resolve,
				reject: reject
			});
		});
	}
	
};

export default LoginActionsCreators;