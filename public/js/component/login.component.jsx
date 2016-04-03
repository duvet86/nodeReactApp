import React, { Component, PropTypes } from 'react'

import * as AppActionCreator from '../flux/actions/AppActionCreator'

export default class Login extends Component {

	static contextTypes = { router: React.PropTypes.object };
	static propTypes =
	{
		loading: PropTypes.bool,
		error: PropTypes.bool
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const email = this.refs.email.value;
		const pass = this.refs.pass.value;

		const { location } = this.props;
		AppActionCreator.login(email, pass, () => {
			if (location.state && location.state.nextPathname) {
				this.context.router.replace(location.state.nextPathname);
			} else {
				this.context.router.replace('/');
			}
		});
		
	}

	render() {
		
		let html = <div>Loading</div>;
		
		if (!this.props.loading) {
			html =
				<form onSubmit={this.handleSubmit}>
					<label><input type="text" ref="email" placeholder="email" defaultValue="joe@example.com" /></label>
					<label><input type="text" ref="pass" placeholder="password" defaultValue="password1" /></label> (hint: password1)<br />
					<button type="submit">login</button>
					{this.props.error && (<p>Bad login information</p>)}
				</form>;
		}
			
		return (html)
	}

}