import React, {Component} from "react";
import Header from "./HeaderComponent";
import Home from "./HomeContainer";
import Footer from "./FooterComponent";
import Map from "./MapContainer"
import axios from "axios"
import {Route, Redirect, Switch} from "react-router-dom"
import {dataFormatter} from "../Utilities";
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
            commonData: ''
        }
        const withLoading = (callback) => {
            return (...args) => {
                this.setState({isLoading: true})
                return callback(...args)
            }
        }
        this.actions = {
            onSelect: withLoading(async (item) => {
                let val = item.target.innerText
                let result;
                switch (val) {
                    case "Time":
                        result = await axios.get('/api/time')
                        this.setState({timeData: dataFormatter["time"](result.data), isLoading: false})
                        break;
                    case "Sentiment":
                        result = await Promise.all([axios.get('/api/attitude'), axios.get('/api/sentiment')])
                        let [attitudeData, sentimentData] = result
                        this.setState({
                            attitudeData: attitudeData.data,
                            sentimentData: dataFormatter["sentiment"](sentimentData.data),
                            isLoading: false
                        })
                        break;
                    case "Follower":
                        result = await axios.get('/api/follower')
                        this.setState({followerData: dataFormatter["follower"](result.data), isLoading: false})
                        break;
                    case "Language":
                        result = await axios.get('/api/no_english')
                        this.setState({languageData: dataFormatter["lang"](result.data), isLoading: false})
                        break;
                    case "Hot Words":
                        result = await axios.get('/api/hotword')
                        this.setState({hotwordData: dataFormatter["word"](result.data), isLoading: false})
                        break;
                    case "Alcohol":
                        this.setState({commonData: dataFormatter["common"](ALCOHOL.rows), isLoading: false})
                        break;
                    case "Medium Income":
                        this.setState({commonData: dataFormatter["common"](MINCOME.rows), isLoading: false})
                        break;
                    case "Smoker":
                        this.setState({commonData: dataFormatter["common"](SMOKER.rows), isLoading: false})
                        break;
                    case "Unemployment":
                        this.setState({commonData: dataFormatter["common"](UNEMPLOYMENT.rows), isLoading: false})
                        break;
                    case "Employment":
                        this.setState({commonData: dataFormatter["common"](EMPLOYMENT.rows), isLoading: false})
                        break;
                    case "Living Region":
                        this.setState({regionData: dataFormatter["region"](REGION.rows), isLoading: false})
                        break;
                    default:
                        this.setState({isLoading: false})
                }
                this.setState({selectedSource: val})
            }),
            setWord: withLoading(async (word) => {
                let result = await axios.get(`/api/hotword/suburb?word=${word}`)
                this.setState({
                    selectedWord: word,
                    isLoading: false,
                    wordSuburbData: dataFormatter["wordSuburb"](result.data)
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
                        <Route exact path="/home" component={Home}/>
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