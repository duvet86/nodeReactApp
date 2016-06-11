import '../../css/app';

import React, { PropTypes, Component, cloneElement } from 'react';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import TopNavigation from './top-navigation.component';
import SideBar from './side-bar.component';

export default class AppContainer extends Component {
	
	static propTypes = {
		authenticated: PropTypes.bool,
		activeKey: PropTypes.number,
		userInfo: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.object
		]),
		children: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object
		])
	}
	
	constructor(props) {
		super(props);
	}

	render() {	
		return (
			<div>
				<TopNavigation
					authenticated={this.props.authenticated}
					activeKey={this.props.activeKey}
					userName={this.props.userInfo.email}
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
				<footer className="footer">
					<div className="container">
						<p className="text-muted">Created By <a target="_blank" href="https://it.linkedin.com/in/luca-marangon-b640b222">Luca</a> <span className="glyphicon glyphicon-copyright-mark" aria-hidden="true"></span></p>
					</div>
				</footer>
			</div>
		);
	}
}