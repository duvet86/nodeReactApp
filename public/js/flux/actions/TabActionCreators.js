import { dispatch } from '../AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

const TabActionCreators = {
	changeTab: function (activeKey) {
		dispatch(ActionTypes.CHANGE_TAB, activeKey);
	}
};

export default TabActionCreators;