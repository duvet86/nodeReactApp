import React, { Component, cloneElement } from 'react';

import { Map } from 'immutable';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import TopNavigation from './top-navigation.component';
import SideBar from './side-bar.component';

import TabStore from '../flux/stores/TabStore';
import LoginStore from '../flux/stores/LoginStore';

export default class AppContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			tabSore: TabStore.getStore(),
			loginStore: LoginStore.getStore()
		};
	}

	componentDidMount() {
		TabStore.addListener(this._onChangeTabStore);
		LoginStore.addListener(this._onChangeLoginStore);
	}

	componentWillUnmount() {
		TabStore.remove();
		LoginStore.remove();
	}

	render() {
		
		let loginProps = {
			loading: this.state.loginStore.get("loading"),
			error: this.state.loginStore.get("error")
		};
		
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
	
	_onChangeTabStore = () => {
		this.setState({ tabSore: TabStore.getStore() });
	}
	
	_onChangeLoginStore = () => {
		this.setState({ loginStore: LoginStore.getStore() });
	}
}