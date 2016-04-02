import React, { Component } from 'react'

import auth from '../utils/auth'
import * as AppActionCreator from '../flux/actions/AppActionCreator'
//import LoginStore from '../flux/stores/LoginStore';

export default class Login extends Component {

	static contextTypes = { router: React.PropTypes.object };

	constructor(props) {
		super(props);
		//this.state = LoginStore.getStore();
	}

	handleSubmit = (event) => {
		event.preventDefault();

		const email = this.refs.email.value;
		const pass = this.refs.pass.value;
		
		const { location } = this.props;
//		AppActionCreator.requestUser(email, pass, location);
//		
//		if (this.state.authenticated) {
//			const { location } = this.props;
//			if (location.state && location.state.nextPathname) {
//				this.context.router.replace(location.state.nextPathname);
//			} else {
//				this.context.router.replace('/');
//			}
//		}
		
//		auth.login(email, pass)
//		.then((res) => {
//			if (!res.authenticated) {
//				return this.setState({ error: true });
//			}
//
//			const { location } = this.props;
//			if (location.state && location.state.nextPathname) {
//				this.context.router.replace(location.state.nextPathname);
//			} else {
//				this.context.router.replace('/');
//			}
//		})
//		.catch(// Log the rejection reason
//			function(reason) {
//				console.log('Handle rejected promise ('+reason+') here.');
//			}
//		);
		
	}

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label><input ref="email" placeholder="email" defaultValue="joe@example.com" /></label>
        <label><input ref="pass" placeholder="password" /></label> (hint: password1)<br />
        <button type="submit">login</button>
        {/*this.state.error && (
          <p>Bad login information</p>
        )*/}
      </form>
    )
  }

}