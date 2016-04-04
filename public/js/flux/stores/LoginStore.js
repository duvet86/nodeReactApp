import { Store } from 'flux/utils';

import { Map } from 'immutable';

import ActionTypes from '../constants/ActionTypes';
import * as AppDispatcher from '../AppDispatcher';

import auth from '../../utils/auth';

function createStore() {
	
	let authenticated = false;
	let token = null; 
	if (auth.loggedIn()) {
		authenticated = true;
		token = auth.getToken();
	}
	
	return new  Map(
	{
		loading: false,
		error: false,
		authenticated: authenticated,
		token: token
	});
}

class LoginStoreClass extends Store {

	constructor(dispatcher, store) {
		super(dispatcher, store);
		this._store = store;
	}
	
	getStore() {
		return this._store;
	}
	
	isLoggedIn() {
		return this._store.get("authenticated");
	}

	// @override
	__onDispatch(payload) {

		const { resolve, response, type } = payload;
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
				updatedStore = new  Map(
				{
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

let store = createStore();

const LoginStore = new LoginStoreClass(AppDispatcher, store);

export default LoginStore;
