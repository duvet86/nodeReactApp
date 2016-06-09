import React, { PropTypes, Component } from 'react';
import { withRouter } from 'react-router';

import { IndexLink } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

import TabActionCreators from '../flux/actions/TabActionCreators';
import LoginActionsCreators from '../flux/actions/LoginActionsCreators';

class TopNavigation extends Component {

	static propTypes = {
		activeKey: PropTypes.number.isRequired,
		authenticated: PropTypes.bool.isRequired,
		userName: PropTypes.string.isRequired,
		router: React.PropTypes.shape({
			replace: React.PropTypes.func.isRequired
		}).isRequired
	}

	handleSelect = (selectedKey) => {
		TabActionCreators.changeTab({ activeKey: selectedKey });
	}

	handleLogoutButton = (e) => {
		e.preventDefault();

		LoginActionsCreators.logout()
			.then(() => {
				this.props.router.replace('/login');
			});
	}

	render() {

		const { activeKey, userName } = this.props;

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
						<LinkContainer to={{ pathname: `/user/${userName}` }}>
							<NavItem eventKey={2}>User</NavItem>
						</LinkContainer>
						<NavItem eventKey={3} onClick={this.handleLogoutButton}>Logout</NavItem>
						<NavDropdown eventKey={4} title="Help" id="basic-nav-dropdown">
							<MenuItem eventKey={4.1}>Action</MenuItem>
							<MenuItem eventKey={4.2}>Another action</MenuItem>
							<MenuItem eventKey={4.3}>Something else here</MenuItem>
							<MenuItem divider />
							<MenuItem eventKey={4.3}>Separated link</MenuItem>
						</NavDropdown>
					</Nav>
					<Navbar.Form pullRight>
						<FormGroup>
							<FormControl type="text" placeholder="Search" />
						</FormGroup>
						{' '}
						<Button type="submit">Submit</Button>
					</Navbar.Form>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default withRouter(TopNavigation);