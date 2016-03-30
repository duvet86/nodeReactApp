import React, { PropTypes, Component } from 'react';

import { IndexLink } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Input from 'react-bootstrap/lib/Input';

import auth from '../utils/auth'

export default class TopNavigation extends Component {
	
	static propTypes = {
		initialEventKey: PropTypes.number,
		loggedIn: PropTypes.bool
	};
	
	static defaultProps = {
		initialEventKey: 1,
		loggedIn: auth.loggedIn()
	};
	
	constructor(props) {
		super(props);
		this.state = {
			activeKey: props.initialEventKey,
			loggedIn: props.loggedIn
		}
	}
	
	updateAuth = (loggedIn) => {
		this.setState({
			loggedIn: Boolean(loggedIn)
	    })
	}
	
	handleSelect = (selectedKey) => {
		this.setState({ activeKey: selectedKey });
	}
	
	componentWillMount() {
		auth.onChange = this.updateAuth;
	    auth.login();
	}
	
	render() {

		let label = "Logout";
		let path = "/logout";
		if (!this.state.loggedIn) {
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
					<Nav pullRight activeKey={this.state.activeKey} onSelect={this.handleSelect}>
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