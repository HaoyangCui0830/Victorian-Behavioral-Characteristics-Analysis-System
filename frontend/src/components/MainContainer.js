import React, {Component} from "react";
import Header from "./HeaderComponent";
import Home from "./HomeContainer";
import Footer from "./FooterComponent";
import Map from "./MapContainer"
import axios from "axios"
import {Route, Redirect, Switch} from "react-router-dom"
import {chartFormatter} from "../Utilities";
import {ALCOHOL} from "../StaticData/aurin/alcohol";
import {MINCOME} from "../StaticData/aurin/medium_income";
import {SMOKER} from "../StaticData/aurin/smoker";
import {UNEMPLOYMENT} from "../StaticData/aurin/unemployment";
import {EMPLOYMENT} from "../StaticData/aurin/num-of-employed-people";
import {REGION} from "../StaticData/aurin/livingregion_result";


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
            regionData: "",
            selectedSource: "",
            selectedWord: "",
            wordSuburbData: "",
            map: null,
            commonData:''
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
                    case "Alcohol":
                        this.setState({commonData: chartFormatter["common"](ALCOHOL.rows), isLoading: false})
                        break;
                    case "Medium Income":
                        this.setState({commonData: chartFormatter["common"](MINCOME.rows), isLoading: false})
                        break;
                    case "Smoker":
                        this.setState({commonData: chartFormatter["common"](SMOKER.rows), isLoading: false})
                        break;
                    case "Unemployment":
                        this.setState({commonData: chartFormatter["common"](UNEMPLOYMENT.rows), isLoading: false})
                        break;
                    case "Employment":
                        this.setState({commonData: chartFormatter["common"](EMPLOYMENT.rows), isLoading: false})
                        break;
                    case "Living Region":
                        this.setState({regionData: chartFormatter["region"](REGION.rows), isLoading: false})
                    default:
                        this.setState({isLoading:false})
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