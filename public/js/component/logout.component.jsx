import React, { Component } from 'react'

import * as AppActionCreator from '../flux/actions/AppActionCreator'

export default class Logout extends Component {
	
	componentDidMount() {
		AppActionCreator.logout();
	}

	render() {
		return <p>You are now logged out</p>;
	}
}