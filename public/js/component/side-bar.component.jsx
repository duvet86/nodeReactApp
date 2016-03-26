import React from 'react';

import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

export default class SideBar extends React.Component {

	constructor(props) {
		super(props);
		this.state = { activeKey: props.initialEventKey }
	}
	
	handleSelect = (selectedKey) => {
		this.setState({ activeKey: selectedKey });
	}

	render() {
		return (
			<Nav className="nav-sidebar" activeKey={this.state.activeKey} onSelect={this.handleSelect}>
				<IndexLinkContainer to={{pathname: '/'}}>
					<NavItem eventKey={1}>Home</NavItem>
				</IndexLinkContainer>
				<LinkContainer to={{pathname: '/hello'}}>
					<NavItem eventKey={2}>Hello</NavItem>
				</LinkContainer>
				<LinkContainer to={{pathname: '/button'}}>
					<NavItem eventKey={3}>Button</NavItem>
				</LinkContainer>
			</Nav>
		);
	}
}

SideBar.propTypes = { initialEventKey: React.PropTypes.number };
SideBar.defaultProps = { initialEventKey: 1 };