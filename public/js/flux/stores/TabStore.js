import * as AppDispatcher from '../AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import { Store } from 'flux/utils';

import { Map } from 'immutable';

class TabStoreClass extends Store {

	constructor(dispatcher) {
		super(dispatcher);
		this._store = new Map({ activeKey: 1 });
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

const TabStore = new TabStoreClass(AppDispatcher);
	
export default TabStore;
