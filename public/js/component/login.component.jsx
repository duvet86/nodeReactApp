import React, { Component, PropTypes } from 'react'

import FacebookActionCreators from '../flux/actions/FacebookActionsCreator'

export default class Login extends Component {

	static contextTypes = { router: React.PropTypes.object };

	handleFacebookLoginButton = (e) => {
		e.preventDefault();
		
		const { location } = this.props;
		FacebookActionCreators.login()
			.then(() => {
				if (location.state && location.state.nextPathname) {
					this.context.router.replace(location.state.nextPathname);
				} else {
					this.context.router.replace('/');
				}
			});
		
	}

	render() {
		return (<button ref="loginButton" onClick={this.handleFacebookLoginButton}>Log Into Facebook</button>);
	}

}