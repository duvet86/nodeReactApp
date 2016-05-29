import React, { PropTypes, Component } from 'react';

import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

import TabActionCreators from '../flux/actions/TabActionCreators'

export default class SideBar extends Component {

	static propTypes = { activeKey: PropTypes.number.isRequired};
	
	handleSelect = (selectedKey) => {
		TabActionCreators.changeTab({ activeKey: selectedKey });
	}

	render() {
		
		const { activeKey } = this.props;
	
		return (
			<Nav className="nav-sidebar" activeKey={activeKey} onSelect={this.handleSelect}>
				<IndexLinkContainer to={{pathname: '/'}}>
					<NavItem eventKey={1}>Home</NavItem>
				</IndexLinkContainer>
				<LinkContainer to={{pathname: '/settings'}}>
					<NavItem eventKey={2}>Setting</NavItem>
				</LinkContainer>
				<LinkContainer to={{pathname: '/about'}}>
					<NavItem eventKey={3}>About</NavItem>
				</LinkContainer>
			</Nav>
		);
	}
}