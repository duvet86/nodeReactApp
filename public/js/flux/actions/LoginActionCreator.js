import { dispatch, dispatchAsync } from '../AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

import UserAPI from '../../api/UserAPI';

const LoginActionsCreator = {

	login: function (email, password) {
		return new Promise((resolve, reject) => {
			dispatchAsync(UserAPI.login(email, password), {
				request: ActionTypes.REQUEST_USER,
				success: ActionTypes.REQUEST_USER_SUCCESS,
				failure: ActionTypes.REQUEST_USER_ERROR
			}, { resolve: resolve });
		});
	},
	
	logout: function () {
		dispatch(ActionTypes.LOGOUT, UserAPI.logout());
	}
	
};

export default LoginActionsCreator;