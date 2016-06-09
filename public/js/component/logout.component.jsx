import React, { Component } from 'react';

import LoginStore from '../flux/stores/LoginStore';

export default class Logout extends Component {
	
	componentDidMount() {
		LoginStore.logout();
	}

	render() {
		return <p>You are now logged out</p>;
	}
}