import React, { PropTypes, Component, cloneElement } from 'react';

import LoginStore from '../flux/stores/LoginStore';
import TabStore from '../flux/stores/TabStore';

export default class AppContainer extends Component {

	static contextTypes = { router: PropTypes.object }
	static propTypes = {
		children: PropTypes.oneOfType([
			React.PropTypes.array,
			React.PropTypes.object
		])
	}
	
	constructor(props) {
		super(props);
		this.state = {
			loginStore: LoginStore.getStore(),
			tabSore: TabStore.getStore()
		};
	}

	componentDidMount() {
		LoginStore.addListener(this._onChangeLoginStore);
		TabStore.addListener(this._onChangeTabStore);
	}

	componentWillUnmount() {
		LoginStore.remove();
		TabStore.remove();
	}
	
	_onChangeLoginStore = () => {
		this.setState({ loginStore: LoginStore.getStore() });
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