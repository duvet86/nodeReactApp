import { Store } from 'flux/utils';

import { Map } from 'immutable';

import ActionTypes from '../constants/ActionTypes';
import * as AppDispatcher from '../AppDispatcher';

class LoginStoreClass extends Store {

	constructor(dispatcher) {
		super(dispatcher);
		this._store = this._createStore()
	}

	_createStore() {
		return new Map({
			loading: false,
			error: false,
			authenticated: false,
			token: null,
			userInfo: {}
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

		const { response, resolve, type } = payload;
		let updatedStore = {};

		switch (type) {
			case ActionTypes.REQUEST_LOGIN:
				// loading
				updatedStore = new Map({ loading: true });
				this._store = this._store.merge(updatedStore);
				this.__emitChange();
				break;

			case ActionTypes.REQUEST_LOGIN_ERROR:
				// error
				updatedStore = new Map({ error: true });
				this._store = this._store.merge(updatedStore);
				this.__emitChange();
				break;

			case ActionTypes.REQUEST_LOGIN_SUCCESS:
				// process success
				updatedStore = new Map({
					authenticated: response.authenticated,
					token: response.token
				});
				this._store = this._store.merge(updatedStore);
				this.__emitChange();
				resolve(response.token);
				break;

			case ActionTypes.REQUEST_USER:
				// loading
				updatedStore = new Map({ loading: true });
				this._store = this._store.merge(updatedStore);
				this.__emitChange();
				break;

			case ActionTypes.REQUEST_USER_ERROR:
				// error
				updatedStore = new Map({ error: true });
				this._store = this._store.merge(updatedStore);
				this.__emitChange();
				break;

			case ActionTypes.REQUEST_USER_SUCCESS:
				// process success
				updatedStore = new Map({
					userInfo: response.body.user
				});
				this._store = this._store.merge(updatedStore);
				this.__emitChange();
				resolve();
				break;

			case ActionTypes.LOGOUT:
				this._store = this._createStore();
				this.__emitChange();
				break;
		}
	}
}

const LoginStore = new LoginStoreClass(AppDispatcher);

export default LoginStore;
