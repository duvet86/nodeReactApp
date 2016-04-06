import React, { Component, cloneElement } from 'react';

import { Map } from 'immutable';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import TopNavigation from './top-navigation.component';
import SideBar from './side-bar.component';

import ActionTypes from '../flux/constants/ActionTypes';

import TabStore from '../flux/stores/TabStore';
import FacebookLoginStore from '../flux/stores/FacebookLoginStore';
import FacebookActionsCreator from '../flux/actions/FacebookActionsCreator';

export default class AppContainer extends Component {

	static contextTypes = { router: React.PropTypes.object };
	
	constructor(props) {
		super(props);
		this.state = {
			tabSore: TabStore.getStore(),
			loginStore: FacebookLoginStore.getStore()
		};
	}

	componentDidMount() {
		TabStore.addListener(this._onChangeTabStore);
		FacebookLoginStore.addListener(this._onChangeFacebookLoginStore);
		
		const { location } = this.props;
		FacebookActionsCreator.initFacebook()
			.then((res) => {
				console.log(location);
				if (res == ActionTypes.FACEBOOK_LOGIN) {
					this.context.router.replace('/');
				} else {
					this.context.router.replace('/login');
				}
			});
	}

	componentWillUnmount() {
		TabStore.remove();
		FacebookLoginStore.remove();
	}
	
	_onChangeTabStore = () => {
		this.setState({ tabSore: TabStore.getStore() });
	}
	
	_onChangeFacebookLoginStore = () => {
		this.setState({ loginStore: FacebookLoginStore.getStore() });
	}

	render() {
		
		let loginProps = { error: this.state.loginStore.get("error") };
		
		return (
			<div>
				<TopNavigation authenticated={this.state.loginStore.get("authenticated")} activeKey={this.state.tabSore.get("activeKey")} />
				<Grid fluid>
					<Row>
						<Col className="sidebar" md={2}>
							<SideBar activeKey={this.state.tabSore.get("activeKey")} />
						</Col>
						<Col className="main" sm={9} smOffset={3} md={10} mdOffset={2}>
							{this.props.children && cloneElement(this.props.children, loginProps)}
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}