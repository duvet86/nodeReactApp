import * as AppDispatcher from '../AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import { Store } from 'flux/utils';

import { Map } from 'immutable';

//Initialize the singleton to register with the
//dispatcher and export for React components
class TabStoreClass extends Store {

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

		const { type, activeKey } = payload;
	
		switch (type) {
			case ActionTypes.CHANGE_TAB:
				this._store = this._store.update("activeKey", (activeKey) => activeKey);
				this.__emitChange();
				break;
		}
	}
}

let store = Map({ activeKey: 1 });

const TabStore = new TabStoreClass(AppDispatcher, store);
	
export default TabStore;
