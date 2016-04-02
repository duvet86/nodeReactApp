import React, { Component } from 'react';

import TabStore from '../flux/stores/TabStore';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import TopNavigation from './top-navigation.component';
import SideBar from './side-bar.component';

export default class AppContainer extends Component {

	constructor(props) {
		super(props);
		this.state = TabStore.getStore();
	}

	componentDidMount() {
		TabStore.addListener(this._onChange);
	}

	componentWillUnmount() {
		TabStore.remove();
	}

	_onChange = () => {
		debugger;
		this.setState(TabStore.getStore());
	}
	 
	 render() {
		 debugger;
		 console.log("state", this.state);
		 
		 return (
			 <div>
				<TopNavigation activeKey={this.state.get("activeKey")} />
				<Grid fluid>
					<Row>
						<Col className="sidebar" md={2}>
							<SideBar activeKey={this.state.get("activeKey")} />
						</Col>
						<Col className="main" sm={9} smOffset={3} md={10} mdOffset={2}>
							{this.props.children}
						</Col>
					</Row>
				</Grid>
			</div>
		);
	 }
}