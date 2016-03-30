import React, { Component } from 'react'

import auth from '../utils/auth'

export default class Logout extends Component {
	
	constructor(props) {
		super(props);
	}
	
	componentDidMount() {
		auth.logout();
	}

	render() {
		return <p>You are now logged out</p>;
	}
}