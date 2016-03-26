import React from 'react';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import TopNavigation from './top-navigation.component';
import SideBar from './side-bar.component';
import MyButton from './my-button.component';
import Hello from './hello.component';

const MyGrid = (props) =>
	<div>
		<TopNavigation />
		<Grid fluid>
			<Row>
				<Col className="sidebar" sm={3} md={2}>
					<SideBar />
				</Col>
				<Col className="main" sm={9} smOffset={3} md={10} mdOffset={2}>
					{props.children}
				</Col>
			</Row>
		</Grid>
	</div>;

export default MyGrid;
