import * as AppDispatcher from '../AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import { Store } from 'flux/utils';

import { Map } from 'immutable';

class TabStoreClass extends Store {

	constructor(dispatcher, store) {
		super(dispatcher, store);
		this._store = store;
	}
	
	getStore() {
		return this._store;
	}

	// @override
	__onDispatch(payload) {

		const { type, activeKey } = payload;
	
		switch (type) {
			case ActionTypes.CHANGE_TAB:
				this._store = this._store.update("activeKey", (activeKey) => activeKey);
				this.__emitChange();
				break;
		}
	}
}

let store = new Map({ activeKey: 1 });

const TabStore = new TabStoreClass(AppDispatcher, store);
	
export default TabStore;
