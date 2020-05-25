import React, {Component} from "react";
import {Navbar, NavbarBrand, Nav, NavItem, Collapse, NavbarToggler} from "reactstrap"
import {NavLink} from "react-router-dom";

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
        const {isNavOpen} = this.state;
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
                </div>
            </Navbar>
        )
    }
}

export default Header;