import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import FacebookLoginStore from './flux/stores/FacebookLoginStore';

import AppBootstrap from './component/app-bootstrap.component';

function redirectToLogin(nextState, replace) {
	if (!FacebookLoginStore.isLoggedIn()) {
		replace({
			pathname: '/login',
			state: { nextPathname: nextState.location.pathname }
		});
	}
}

function redirectToDashboard(nextState, replace) {
	if (FacebookLoginStore.isLoggedIn()) {
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
				}}
			/>
	
			<Route
				path="/"
				onEnter={redirectToLogin}
				getComponent={(location, cb) => {
					return require.ensure([], (require) => {
						cb(null, require('./component/app-container.component').default);
					});
				}}
			>
	
				<IndexRoute
					getComponent={(location, cb) => {
						return require.ensure([], (require) => {
							cb(null, require('./component/dashboard.component').default);
						});
					}}
				/>
		
				<Route
					path="/about"
					getComponent={(location, cb) => {
						require.ensure([], (require) => {
							cb(null, require('./component/about.component').default);
						});
					}}
				/>
		
				<Route
					path="/user/:id"
					getComponent={(location, cb) => {
						require.ensure([], (require) => {
							cb(null, require('./component/profile.component').default);
						});
					}}
				/>
		
				<Route
					path="/settings"
					getComponent={(location, cb) => {
						require.ensure([], (require) => {
							cb(null, require('./component/settings.component').default);
						});
					}}
				/>
		
			</Route>

		</Route>
	</Router>
		
	), document.getElementById('myGridContainer'));
