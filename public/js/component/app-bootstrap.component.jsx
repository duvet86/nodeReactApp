import React, { Component, cloneElement } from 'react';

import { Map } from 'immutable';

import ActionTypes from '../flux/constants/ActionTypes';

import FacebookLoginStore from '../flux/stores/FacebookLoginStore';
import TabStore from '../flux/stores/TabStore';

import FacebookActionsCreator from '../flux/actions/FacebookActionsCreator';

export default class AppContainer extends Component {

	static contextTypes = { router: React.PropTypes.object };
	
	constructor(props) {
		super(props);
		this.state = {
			loginStore: FacebookLoginStore.getStore(),
			tabSore: TabStore.getStore()
		};
	}

	componentDidMount() {
		FacebookLoginStore.addListener(this._onChangeFacebookLoginStore);
		TabStore.addListener(this._onChangeTabStore);
		
		FacebookActionsCreator.initFacebook()
			.then((res) => {
				if (res == ActionTypes.FACEBOOK_LOGIN) {
					this.context.router.replace('/');
				} else {
					this.context.router.replace('/login');
				}
			});
	}

	componentWillUnmount() {
		FacebookLoginStore.remove();
		TabStore.remove();
	}
	
	_onChangeFacebookLoginStore = () => {
		this.setState({ loginStore: FacebookLoginStore.getStore() });
	}
	
	_onChangeTabStore = () => {
		this.setState({ tabSore: TabStore.getStore() });
	}

	render() {
		
		let loginProps = {
			error: this.state.loginStore.get("error"),
			authenticated: this.state.loginStore.get("authenticated"),
			initialized: this.state.loginStore.get("initialized"),
			userInfo: this.state.loginStore.get("userInfo"),
			activeKey: this.state.tabSore.get("activeKey")
		};
		
		return (
			<div>
				{this.props.children && cloneElement(this.props.children, loginProps)}
			</div>
		);
	}
}