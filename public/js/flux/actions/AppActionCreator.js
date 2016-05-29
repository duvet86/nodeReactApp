import { dispatch, dispatchAsync } from '../AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

import auth from '../../utils/auth';

const ActionsCreator = {

	login: function (email, pass) {
		return new Promise((resolve, reject) => {
			dispatchAsync(auth.login(email, pass), {
				request: ActionTypes.REQUEST_USER,
				success: ActionTypes.REQUEST_USER_SUCCESS,
				failure: ActionTypes.REQUEST_USER_ERROR
			}, { resolve: resolve });
		});
	},
	
	logout: function (email, pass) {
		dispatch(ActionTypes.LOGOUT, auth.logout());
	}
	
};

export default ActionsCreator;