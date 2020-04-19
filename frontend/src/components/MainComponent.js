import React,{Component} from "react";
import Header from "./HeaderComponent";
import Home from "./HomeComponent";
import Footer from "./FooterComponent";
import Map from "./MapComponent"
import {Route, Redirect,Switch} from "react-router-dom"

class Main extends Component{
    constructor(props) {
        super(props);
        this.state={

        }
    }
    render() {
        return (
            <div>
                <Header/>
                <Switch>
                    <Route path="/home" component={Home}/>
                    <Route exact path="/map" component={Map}/>
                    <Redirect to={"/home"}/>
                </Switch>
                <Footer/>
            </div>
        )
    }
}
export default Main;