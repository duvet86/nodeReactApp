import '../../css/login';

import React, { Component, PropTypes } from 'react'

import Grid from 'react-bootstrap/lib/Grid';
import Input from 'react-bootstrap/lib/Input';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';

import FacebookActionCreators from '../flux/actions/FacebookActionsCreator'

export default class Login extends Component {

	static contextTypes = { router: React.PropTypes.object };

	handleFacebookLoginButton = (e) => {
		e.preventDefault();
		
		const { location } = this.props;
		FacebookActionCreators.login()
			// get user info
			.then(() => {
				return FacebookActionCreators.getUserInfo();
			})
			// redirect
			.then(() => {
				if (location.state && location.state.nextPathname) {
					this.context.router.replace(location.state.nextPathname);
				} else {
					this.context.router.replace('/');
				}
			});
		
	}

	render() {
		
		let loginText = 'Loading App';
		let disabled = true;
		if (this.props.initialized) {
			loginText = 'Login using Facebook';
			disabled = false;
		}
	
		return (
			<Grid className="grid-login">
				<div className="login">
					<Button
						bsStyle="success"
						bsSize="large"
						block
						disabled={disabled}
						onClick={this.handleFacebookLoginButton}
					>{loginText}</Button>
				</div>
			</Grid>
		);
	}

}