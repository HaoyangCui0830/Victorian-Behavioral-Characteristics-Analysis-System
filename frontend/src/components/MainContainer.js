import React, {Component} from "react";
import Header from "./HeaderComponent";
import Home from "./HomeContainer";
import Footer from "./FooterComponent";
import Map from "./MapContainer"
import axios from "axios"
import {Route, Redirect, Switch} from "react-router-dom"
import {chartFormatter} from "../Utilities";

export const AppContext = React.createContext()

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            timeData: "",
            sentimentData: "",
            attitudeData: "",
            languageData: "",
            hotwordData: "",
            selectedSource: "",
            selectedWord: "",
            wordSuburbData: "",
            map: null
        }
        const withLoading = (callback) => {
            return (...args) => {
                this.setState({isLoading: true})
                return callback(...args)
            }
        }
        this.actions = {
            getTime: withLoading(async () => {
                const result = await axios.get('/api/time')
                this.setState({timeData: chartFormatter["time"](result.data), isLoading: false})
            }),
            onSelect: withLoading(async (item) => {
                let val = item.target.innerText
                let result;
                switch (val) {
                    case "Sentiment":
                        result = await Promise.all([axios.get('/api/attitude'), axios.get('/api/sentiment')])
                        let [attitudeData, sentimentData] = result
                        console.log(result)
                        this.setState({
                            attitudeData: attitudeData.data,
                            sentimentData: chartFormatter["sentiment"](sentimentData.data),
                            isLoading: false
                        })
                        break;
                    case "Follower":
                        result = await axios.get('/api/follower')
                        this.setState({followerData: chartFormatter["follower"](result.data), isLoading: false})
                        break;
                    case "Language":
                        result = await axios.get('/api/no_english')
                        this.setState({languageData: chartFormatter["lang"](result.data), isLoading: false})
                        break;
                    case "Hot Words":
                        result = await axios.get('/api/hotword')
                        this.setState({hotwordData: chartFormatter["word"](result.data), isLoading: false})
                        break;
                    default:
                }
                this.setState({selectedSource: val})
            }),
            setWord: withLoading(async (word) => {
                let result = await axios.get(`/api/hotword/suburb?word=${word}`)
                this.setState({
                    selectedWord: word,
                    isLoading: false,
                    wordSuburbData: chartFormatter["wordSuburb"](result.data)
                })
            })
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