import '../../css/app';

import React, { Component, cloneElement } from 'react';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import TopNavigation from './top-navigation.component';
import SideBar from './side-bar.component';

export default class AppContainer extends Component {
	
	constructor(props) {
		super(props);
	}

	render() {	
		return (
			<div>
				<TopNavigation
					authenticated={this.props.authenticated}
					activeKey={this.props.activeKey}
					userName={this.props.userInfo.name}
				/>
				<Grid fluid>
					<Row>
						<Col className="sidebar" md={2}>
							<SideBar activeKey={this.props.activeKey} />
						</Col>
						<Col className="main" sm={9} smOffset={3} md={10} mdOffset={2}>
							{this.props.children && cloneElement(this.props.children, ...this.props)}
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}