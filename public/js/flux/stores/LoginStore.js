import * as AppDispatcher from '../AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import { Store } from 'flux/utils';

import { Map } from 'immutable';

//Initialize the singleton to register with the
//dispatcher and export for React components
class LoginStoreClass extends Store {

	constructor(dispatcher, store) {
		super(dispatcher, store);
		this._store = store;
	}
	
	getStore() {
		return this._store;
	}

//Register each of the actions with the dispatcher
//by changing the store's data and emitting a
//change
	__onDispatch(payload) {

		const { type, response } = payload;

		switch (type) {
			case ActionTypes.REQUEST_USER:
				// loading
				this.__emitChange();
				break;
		
			case ActionTypes.REQUEST_USER_ERROR:
				// error
				this.__emitChange();
				break;
		
			case ActionTypes.REQUEST_USER_SUCCESS:
				// process success
				//this._store = this._store.update("activeKey", (activeKey) => activeKey);
				this.__emitChange();
				break;
				
			case ActionTypes.LOGOUT:
				// loading
				this.__emitChange();
				break;
		}
	}
}

let store = Map({
	error: false,
	authenticated: false,
	token: null
});

const LoginStore = new LoginStoreClass(AppDispatcher, store);

export default LoginStore;
