import { Store } from 'flux/utils';

import { Map } from 'immutable';

import ActionTypes from '../constants/ActionTypes';
import * as AppDispatcher from '../AppDispatcher';

class LoginStoreClass extends Store {

	constructor(dispatcher) {
		super(dispatcher);
		this._store = new Map({
			loading: false,
			error: false,
			authenticated: false,
			token: null
		});
	}
	
	getStore() {
		return this._store;
	}
	
	isLoggedIn() {
		return this._store.get("authenticated");
	}

	// @override
	__onDispatch(payload) {

		const { data, resolve, type } = payload;
		let updatedStore = {};

		switch (type) {
			case ActionTypes.REQUEST_USER:
				// loading
				updatedStore = new  Map({ loading: true });
				this._store = this._store.merge(updatedStore);
				this.__emitChange();
				break;
		
			case ActionTypes.REQUEST_USER_ERROR:
				// error
				updatedStore = new  Map({ error: true });
				this._store = this._store.merge(updatedStore);
				this.__emitChange();
				break;
		
			case ActionTypes.REQUEST_USER_SUCCESS:
				// process success
				const { authenticated, token } = response;
				updatedStore = new  Map({
					authenticated: authenticated,
					token: token
				});
				this._store = this._store.merge(updatedStore);
				this.__emitChange();
				resolve();
				break;
				
			case ActionTypes.LOGOUT:
				this._store = createStore();
				this.__emitChange();
				break;
		}
	}
}

const LoginStore = new LoginStoreClass(AppDispatcher);

export default LoginStore;
