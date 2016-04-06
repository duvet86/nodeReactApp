import { Store } from 'flux/utils';

import { Map } from 'immutable';

import ActionTypes from '../constants/ActionTypes';
import * as AppDispatcher from '../AppDispatcher';

class FacebookLoginStoreClass extends Store {

	constructor(dispatcher) {
		super(dispatcher);
		this._store = this.createStore();
	}
	
	createStore() {
		return new  Map({
			loading: false,
			initialized: false,
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
			case ActionTypes.FACEBOOK_INITIALIZED:
				updatedStore = new  Map({
					initialized: true,
					authenticated: true,
					token: data.authResponse.userID
				});
				this._store = this._store.merge(updatedStore);
				this.__emitChange();
				break;
		
			case ActionTypes.FACEBOOK_LOGIN:
				updatedStore = new  Map({
					initialized: true,
					authenticated: true,
					token: data.authResponse.userID
				});
				this._store = this._store.merge(updatedStore);
				this.__emitChange();
				resolve(ActionTypes.FACEBOOK_LOGIN);
				break;
		
			case ActionTypes.FACEBOOK_NOT_AUTHORIZED:
				updatedStore = new  Map({
					authenticated: false,
					token: null
				});
				this._store = this._store.merge(updatedStore);
				this.__emitChange();
				resolve(ActionTypes.FACEBOOK_NOT_AUTHORIZED);
				break;
				
			case ActionTypes.FACEBOOK_LOGIN_ERROR:
				updatedStore = new  Map({ error: true });
				this._store = this._store.merge(updatedStore);
				this.__emitChange();
				resolve(ActionTypes.FACEBOOK_LOGIN_ERROR);
				break;
				
			case ActionTypes.FACEBOOK_LOGOUT:
				this._store = this.createStore();
				this.__emitChange();
				resolve(ActionTypes.FACEBOOK_LOGIN_ERROR);
				break;
		}
	}
}

const FacebookLoginStore = new FacebookLoginStoreClass(AppDispatcher);

export default FacebookLoginStore;
