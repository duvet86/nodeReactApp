import React, { PropTypes, Component } from 'react';

import { IndexLink } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Input from 'react-bootstrap/lib/Input';

import * as AppActionCreator from '../flux/actions/AppActionCreator'

export default class TopNavigation extends Component {
	
	static propTypes = {
		activeKey: PropTypes.number.isRequired,
		authenticated: PropTypes.bool.isRequired
	};
	
	handleSelect = (selectedKey) => {
		AppActionCreator.changeTab({ activeKey: selectedKey });
	}
	
	render() {

		let label = "Logout";
		let path = "/logout";
		if (!this.props.authenticated) {
			label = "Login";
			path = "/login";
		}
	
		return (
			<Navbar fluid fixedTop>
				<Navbar.Header>
					<Navbar.Brand>
						<IndexLink to="/">React-Bootstrap</IndexLink>
					</Navbar.Brand>
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav pullRight activeKey={this.props.activeKey} onSelect={this.handleSelect}>
						<Navbar.Form pullLeft>
		        			<Input type="text" placeholder="Search"/>
		        		</Navbar.Form>
						<LinkContainer to={{pathname: '/settings'}}>
							<NavItem eventKey={2}>Setting</NavItem>
						</LinkContainer>
            			<LinkContainer to={{pathname: path}}>
							<NavItem eventKey={3}>{label}</NavItem>
						</LinkContainer>
						<NavDropdown eventKey={4} title="Help" id="basic-nav-dropdown">
							<MenuItem eventKey={4.1}>Action</MenuItem>
							<MenuItem eventKey={4.2}>Another action</MenuItem>
							<MenuItem eventKey={4.3}>Something else here</MenuItem>
							<MenuItem divider />
							<MenuItem eventKey={4.3}>Separated link</MenuItem>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}