import '../css/main.css';

import React from 'react';
import { render as ReactDOMRender } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import MyGrid from './component/my-grid.component';
import Hello from './component/hello.component';
import MyButton from './component/my-button.component';
import Home from './component/home.component';
import Settings from './component/Settings.component';
import Profile from './component/Profile.component';

ReactDOMRender((
		<Router history={browserHistory}>
			<Route path="/" component={MyGrid}>
				<IndexRoute component={Home}/>
				<Route path="hello" component={Hello}/>
				<Route path="button" component={MyButton}/>
				<Route path="settings" component={Settings}/>
				<Route path="profile" component={Profile}/>
			</Route>
		</Router>
	),
	document.getElementById('myGridContainer'));