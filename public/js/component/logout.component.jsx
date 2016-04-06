import React, { Component } from 'react'

import FacebookActionCreators from '../flux/actions/FacebookActionsCreator'

export default class Logout extends Component {
	
	componentDidMount() {
		FacebookActionCreators.logout();
	}

	render() {
		return <p>You are now logged out</p>;
	}
}