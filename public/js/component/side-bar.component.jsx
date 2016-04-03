import React, { PropTypes, Component } from 'react';

import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

import * as AppActionCreator from '../flux/actions/AppActionCreator'

export default class SideBar extends Component {

	static propTypes = { activeKey: PropTypes.number.isRequired };
	
	handleSelect = (selectedKey) => {
		AppActionCreator.changeTab({ activeKey: selectedKey });
	}

	render() {
		return (
			<Nav className="nav-sidebar" activeKey={this.props.activeKey} onSelect={this.handleSelect}>
				<IndexLinkContainer to={{pathname: '/'}}>
					<NavItem eventKey={1}>Home</NavItem>
				</IndexLinkContainer>
				<LinkContainer to={{pathname: '/user/foo'}}>
					<NavItem eventKey={2}>User</NavItem>
				</LinkContainer>
				<LinkContainer to={{pathname: '/about'}}>
					<NavItem eventKey={3}>About</NavItem>
				</LinkContainer>
			</Nav>
		);
	}
}