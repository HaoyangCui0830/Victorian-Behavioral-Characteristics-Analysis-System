import React, {Component} from "react";
import Header from "./HeaderComponent";
import Home from "./HomeContainer";
import Footer from "./FooterComponent";
import Map from "./MapContainer"
import axios from "axios"
import {Route, Redirect, Switch} from "react-router-dom"

export const AppContext = React.createContext()

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            data: "",
            selectedSource:"",
        }
        const withLoading = (callback) => {
            return (...args) => {
                this.setState({isLoading: true})
                return callback(...args)
            }
        }
        this.actions = {
            getSentiment: withLoading(async () => {
                const result = await Promise.get('/api/categories')
            }),
            onSelect: withLoading((item) => {
                let val = item.target.innerText
                this.setState({selectedSource: val},async (val)=>{

                })
                this.setState({selectedSource: val,isLoading:false})
            }),

        }
    }

    render() {
        return (
            <AppContext.Provider value={{
                state: this.state,
                actions: this.actions
            }}>
                <div>
                    <Header/>
                    <Switch>
                        <Route path="/home" component={Home}/>
                        <Route exact path="/map" component={Map}/>
                        <Redirect to={"/home"}/>
                    </Switch>
                    <Footer/>
                </div>
            </AppContext.Provider>
        )
    }
}

export default Main;