import React, {Component} from "react";
import {Navbar, NavbarBrand, Nav, NavItem, Collapse, NavbarToggler} from "reactstrap"
import {NavLink} from "react-router-dom";
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem,Spinner} from 'reactstrap';
import withContext from "../WithContext";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            idDropdownOpen: false,
        }
    }

    toggleNav() {
        this.setState({isNavOpen: !this.state.isNavOpen});
    }

    toggleDropdown = () => {
        this.setState({idDropdownOpen: !this.state.idDropdownOpen})
    }

    render() {
        const {isNavOpen, idDropdownOpen} = this.state;
        const {data, actions} = this.props;
        const {selectedSource,isLoading} = data;
        const {onSelect}=actions;
        return (
            <Navbar dark expand="md">
                <div className="container">
                    <NavbarBrand className="mr-auto" href="/">
                        <span>The Melbourne Project</span>
                    </NavbarBrand>
                    <NavbarToggler onClick={() => this.toggleNav()}/>
                    <Collapse isOpen={isNavOpen} navbar>
                        <Nav navbar className="float-right">
                            <NavItem>
                                <NavLink className="nav-link" to="/home">
                                    <span className="fa fa-info fa-lg"/> Home
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/map">
                                    <span className="fa fa-home fa-lg"/> Map
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                    <Dropdown isOpen={idDropdownOpen} toggle={this.toggleDropdown}>
                        <DropdownToggle caret>
                            {selectedSource || "Data Source"}
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem header>Aurin</DropdownItem>
                            <DropdownItem onClick={onSelect}> Alcohol</DropdownItem>
                            <DropdownItem onClick={onSelect}> Living Region</DropdownItem>
                            <DropdownItem onClick={onSelect}> Medium Income</DropdownItem>
                            <DropdownItem onClick={onSelect}> Employment</DropdownItem>
                            <DropdownItem onClick={onSelect}> Unemployment</DropdownItem>
                            <DropdownItem onClick={onSelect}> Smoker</DropdownItem>
                            <DropdownItem divider/>
                            <DropdownItem header>Twitter</DropdownItem>
                            <DropdownItem onClick={onSelect}> Sentiment</DropdownItem>
                            <DropdownItem onClick={onSelect}> Follower</DropdownItem>
                            <DropdownItem onClick={onSelect}> Language</DropdownItem>
                            <DropdownItem onClick={onSelect}> Hot Words</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    {isLoading&&<Spinner color="primary"/>}
                </div>
            </Navbar>
        )
    }
}

export default withContext(Header);