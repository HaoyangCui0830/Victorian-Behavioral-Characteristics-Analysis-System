import React from "react";
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col} from 'reactstrap';

class SelectComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idDropdownSourceOpen1: false,
            idDropdownSourceOpen2: false,
            idDropdownMonitorOpen: false,
            selected: ""
        }
    }

    toggleDropdownSource1 = () => {
        this.setState({idDropdownSourceOpen1: !this.state.idDropdownSourceOpen1})
    }
    toggleDropdownSource2 = () => {
        this.setState({idDropdownSourceOpen2: !this.state.idDropdownSourceOpen2})
    }
    toggleDropdownMonitor = () => {
        this.setState({idDropdownMonitorOpen: !this.state.idDropdownMonitorOpen})
    }
    handleSelect = (event) => {
        this.setState({selected:event.target.innerText})
    }

    render() {
        const {selectedSource, onSelect} = this.props
        const {idDropdownSourceOpen1, idDropdownSourceOpen2, idDropdownMonitorOpen, selected} = this.state
        return (
            <div className="select-component">
                <div className="container text-center">
                    <h3>Console</h3>
                    <hr/>
                    <p>Select a data source here to load data.</p>
                    <Row>
                        <Col md={5}>
                            <Dropdown isOpen={idDropdownSourceOpen1} toggle={this.toggleDropdownSource1}>
                                <DropdownToggle caret>
                                    {selected || "Not Selected"}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={this.handleSelect}>Aurin</DropdownItem>
                                    <DropdownItem onClick={this.handleSelect}>Twitter</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Col>
                        <Col md={7}>
                            <Dropdown isOpen={idDropdownSourceOpen2} toggle={this.toggleDropdownSource2}>
                                <DropdownToggle caret>
                                    {selectedSource || "-"}
                                </DropdownToggle>
                                {selected === "Aurin" &&
                                <DropdownMenu>
                                    <DropdownItem onClick={onSelect}> Alcohol</DropdownItem>
                                    <DropdownItem onClick={onSelect}> Living Region</DropdownItem>
                                    <DropdownItem onClick={onSelect}> Medium Income</DropdownItem>
                                    <DropdownItem onClick={onSelect}> Employment</DropdownItem>
                                    <DropdownItem onClick={onSelect}> Unemployment</DropdownItem>
                                    <DropdownItem onClick={onSelect}> Smoker</DropdownItem>
                                </DropdownMenu>
                                }
                                {selected === "Twitter" &&
                                <DropdownMenu>
                                    <DropdownItem onClick={onSelect}> Time</DropdownItem>
                                    <DropdownItem onClick={onSelect}> Sentiment</DropdownItem>
                                    <DropdownItem onClick={onSelect}> Follower</DropdownItem>
                                    <DropdownItem onClick={onSelect}> Language</DropdownItem>
                                    <DropdownItem onClick={onSelect}> Hot Words</DropdownItem>
                                </DropdownMenu>
                                }
                            </Dropdown>
                        </Col>
                    </Row>
                    <hr/>
                    <p>System monitoring tools:</p>
                    <Dropdown isOpen={idDropdownMonitorOpen} toggle={this.toggleDropdownMonitor}>
                        <DropdownToggle caret>Monitors</DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Instance</DropdownItem>
                            <DropdownItem href="http://172.26.131.6:19999" target="_blank" >Instance 1</DropdownItem>
                            <DropdownItem href="http://172.26.132.72:19999" target="_blank">Instance 2</DropdownItem>
                            <DropdownItem href="http://172.26.130.221:19999" target="_blank">Instance 3</DropdownItem>
                            <DropdownItem href="http://172.26.133.57:19999" target="_blank">Instance 4</DropdownItem>
                            <DropdownItem header>API</DropdownItem>
                            <DropdownItem href="http://172.26.130.221:8080/swagger-ui.html" target="_blank">Backend API</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        )
    }


}

export default SelectComponent