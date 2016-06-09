import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import LoginStore from './flux/stores/LoginStore';

import AppBootstrap from './component/app-bootstrap.component';

import LoginActionsCreators from './flux/actions/LoginActionsCreators';

function redirectToLogin(nextState, replace, next) {

	let token = localStorage.getItem('token');
	if (!LoginStore.isLoggedIn() && token) {
		LoginActionsCreators.validateToken(token)
			.then(
				() => next(),
				() => {
					replace({
						pathname: '/login',
						state: { nextPathname: nextState.location.pathname }
					});
					next();
				});

	} else if (!LoginStore.isLoggedIn()) {
		replace({
			pathname: '/login',
			state: { nextPathname: nextState.location.pathname }
		});
		next();
	} else {
		next();
	}
}

function redirectToDashboard(nextState, replace) {
	if (LoginStore.isLoggedIn()) {
		replace('/');
	}
}

render((
	<Router history={browserHistory}>
		<Route component={AppBootstrap}>

			<Route
				path="/login"
				onEnter={redirectToDashboard}
				getComponent={(location, cb) => {
					require.ensure([], (require) => {
						cb(null, require('./component/login.component').default);
					});
				} }
				/>

			<Route
				path="/"
				onEnter={redirectToLogin}
				getComponent={(location, cb) => {
					return require.ensure([], (require) => {
						cb(null, require('./component/app-container.component').default);
					});
				} }
				>

				<IndexRoute
					getComponent={(location, cb) => {
						return require.ensure([], (require) => {
							cb(null, require('./component/dashboard.component').default);
						});
					} }
					/>

				<Route
					path="/about"
					getComponent={(location, cb) => {
						require.ensure([], (require) => {
							cb(null, require('./component/about.component').default);
						});
					} }
					/>

				<Route
					path="/user/:id"
					getComponent={(location, cb) => {
						require.ensure([], (require) => {
							cb(null, require('./component/profile.component').default);
						});
					} }
					/>

				<Route
					path="/settings"
					getComponent={(location, cb) => {
						require.ensure([], (require) => {
							cb(null, require('./component/settings.component').default);
						});
					} }
					/>

			</Route>

		</Route>
	</Router>

), document.getElementById('myGridContainer'));
