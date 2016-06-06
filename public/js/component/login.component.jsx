import '../../css/login';

import React, { Component, PropTypes } from 'react';

import Grid from 'react-bootstrap/lib/Grid';

import LoginActionCreators from '../flux/actions/LoginActionCreators';

export default class Login extends Component {

	static contextTypes = { router: PropTypes.object }
	static propTypes = { location: PropTypes.object }

	handleSubmit = (e) => {
		e.preventDefault()

		const email = this.refs.email.value
		const pass = this.refs.pass.value

		const { location } = this.props;
		LoginActionCreators.login(email, pass)
			.then((res) => {
				return LoginActionCreators.getUserInfo(res);
			})
			.then(() => {
				if (location.state && location.state.nextPathname) {
					this.context.router.replace(location.state.nextPathname);
				} else {
					this.context.router.replace('/');
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