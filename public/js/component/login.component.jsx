import '../../css/login';

import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';

import Grid from 'react-bootstrap/lib/Grid';

import LoginActionsCreators from '../flux/actions/LoginActionsCreators';

class Login extends Component {

	static propTypes = {
		location: PropTypes.object,
		router: React.PropTypes.shape({
			replace: React.PropTypes.func.isRequired
		}).isRequired
	}

	handleSubmit = (e) => {
		e.preventDefault()

		const email = this.refs.email.value
		const pass = this.refs.pass.value

		const { location } = this.props;
		LoginActionsCreators.login(email, pass)
			.then((token) => {
				return LoginActionsCreators.getUserInfo(token);
			})
			.then(() => {
				if (location.state && location.state.nextPathname) {
					this.props.router.replace(location.state.nextPathname);
				} else {
					this.props.router.replace('/');
				}
			});
    }

	render() {
		return (
			<Grid className="grid-login">
				<div className="login">
					<form onSubmit={this.handleSubmit}>
						<label><input ref="email" placeholder="email" defaultValue="duvet86@gmail.com" /></label>
						<label><input ref="pass" placeholder="password" defaultValue="duvet86" /></label>
						<button type="submit">login</button>
					</form>
				</div>
			</Grid>
		);
	}

}

export default withRouter(Login);