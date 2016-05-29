import React, { PropTypes, Component } from 'react';

import { IndexLink } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Input from 'react-bootstrap/lib/Input';

import TabActionCreators from '../flux/actions/TabActionCreators'

import FacebookActionCreators from '../flux/actions/FacebookActionsCreator'

export default class TopNavigation extends Component {
	
	static contextTypes = { router: React.PropTypes.object };
	
	static propTypes = {
		activeKey: PropTypes.number.isRequired,
		authenticated: PropTypes.bool.isRequired,
		userName: PropTypes.string
	};
	
	handleSelect = (selectedKey) => {
		TabActionCreators.changeTab({ activeKey: selectedKey });
	}
	
	handleFacebookLoginButton = (e) => {
		e.preventDefault();
		
		FacebookActionCreators.login()
			.then((res) => {
				this.context.router.replace('/');
			});
		
	}
	
	handleFacebookLogoutButton = (e) => {
		e.preventDefault();
		
		FacebookActionCreators.logout()
			.then((res) => {
				this.context.router.replace('/login');
			});
	}
	
	render() {
		
		const { activeKey, userName } = this.props;
		
		let link = <NavItem eventKey={3} onClick={this.handleFacebookLoginButton}>Login Facebook</NavItem>;
		if (this.props.authenticated) {
			link = <NavItem eventKey={3} onClick={this.handleFacebookLogoutButton}>Logout Facebook</NavItem>;
		}
		
		return (
			<Navbar fluid fixedTop>
				<Navbar.Header>
					<Navbar.Brand>
						<IndexLink to="/">React-Bootstrap</IndexLink>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav pullRight activeKey={activeKey} onSelect={this.handleSelect}>
						<LinkContainer to={{pathname: `/user/${userName}`}}>
							<NavItem eventKey={2}>User</NavItem>
						</LinkContainer>
						{link}
						<NavDropdown eventKey={4} title="Help" id="basic-nav-dropdown">
							<MenuItem eventKey={4.1}>Action</MenuItem>
							<MenuItem eventKey={4.2}>Another action</MenuItem>
							<MenuItem eventKey={4.3}>Something else here</MenuItem>
							<MenuItem divider />
							<MenuItem eventKey={4.3}>Separated link</MenuItem>
						</NavDropdown>
					</Nav>
					<Navbar.Form pullRight>
						<Input type="text" placeholder="Search"/>
					</Navbar.Form>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}