import React from 'react';

import { IndexLink } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Input from 'react-bootstrap/lib/Input';

export default class TopNavigation extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = { activeKey: props.initialEventKey }
	}
	
	handleSelect = (selectedKey) => {
		this.setState({ activeKey: selectedKey });
	}
	
	render() {
		return (
			<Navbar fluid fixedTop>
				<Navbar.Header>
					<Navbar.Brand>
						<IndexLink to="/">React-Bootstrap</IndexLink>
					</Navbar.Brand>
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav pullRight activeKey={this.state.activeKey} onSelect={this.handleSelect}>
						<Navbar.Form pullLeft>
		        			<Input type="text" placeholder="Search"/>
		        		</Navbar.Form>
						<LinkContainer to={{pathname: '/settings'}}>
							<NavItem eventKey={2}>Setting</NavItem>
						</LinkContainer>
						<LinkContainer to={{pathname: '/profile'}}>
							<NavItem eventKey={3}>Profile</NavItem>
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
	
TopNavigation.propTypes = { initialEventKey: React.PropTypes.number };
TopNavigation.defaultProps = { initialEventKey: 1 };