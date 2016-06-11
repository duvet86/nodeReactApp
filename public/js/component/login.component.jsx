import '../../css/login';

import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';

import Grid from 'react-bootstrap/lib/Grid';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Button from 'react-bootstrap/lib/Button';

import Loader from 'react-loader';

import LoginActionsCreators from '../flux/actions/LoginActionsCreators';

class Login extends Component {

	static propTypes = {
		location: PropTypes.object,
		loaded: PropTypes.bool.isRequired,
		router: React.PropTypes.shape({
			replace: React.PropTypes.func.isRequired
		}).isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			email: 'duvet86@gmail.com',
			password: 'duvet86'
		};
	}

	getEmailValidationState = () => {
		const length = this.state.email.length;
		if (length > 8) return 'success';
		else if (length > 0) return 'error';
	}

	getPasswordValidationState = () => {
		const length = this.state.password.length;
		if (length > 6) return 'success';
		else if (length > 0) return 'error';
	}

	handleEmailChange = (e) => {
		this.setState({ email: e.target.value });
	}

	handlePasswordChange = (e) => {
		this.setState({ password: e.target.value });
	}

	handleDisabled = () => {
		return !this.state.password && !this.state.password;
	}

	handleSubmit = (e) => {
		e.preventDefault()

		const email = this.state.email;
		const pass = this.state.password;

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

		let { loaded } = this.props;

		return (
			<Grid className="grid-login">
				<Loader loaded={loaded}>
					<Form className="form-signin" onSubmit={this.handleSubmit} autoComplete="off">
						<h2 className="form-signin-heading">Please sign in</h2>
						<FormGroup controlId="email" validationState={this.getEmailValidationState() }>
							<ControlLabel srOnly>Email</ControlLabel>
							<FormControl
								value={this.state.email}
								onChange={this.handleEmailChange}
								type="email"
								placeholder="Email"
							/>
							<FormControl.Feedback />
						</FormGroup>
						<FormGroup controlId="password" validationState={this.getPasswordValidationState() }>
							<ControlLabel srOnly>Password</ControlLabel>
							<FormControl
								value={this.state.password}
								onChange={this.handlePasswordChange}
								type="password"
								placeholder="Password"
							/>
							<FormControl.Feedback />
						</FormGroup>
						<Checkbox>Remember me</Checkbox>
						<Button type="submit" bsStyle="primary" block disabled={this.handleDisabled() }>
							Sign in
						</Button>
					</Form>
				</Loader>
			</Grid>
		);
	}

}

export default withRouter(Login);