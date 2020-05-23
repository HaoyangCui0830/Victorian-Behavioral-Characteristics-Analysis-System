import React, {Component} from 'react';
import SimpleBarChart from "./charts/BarChart";
import {Spinner, Row, Col} from "reactstrap"
import SimplePieChart from "./charts/PieChart";
import GoogleMapComponent from "./map/GoogleMapComponent";
import withContext from "../WithContext";


class Map extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.getTime();
    }

    render() {
        const {data, actions} = this.props;
        const {setWord} = actions;
        const {timeData, isLoading, sentimentData, attitudeData, followerData, languageData, hotwordData, wordSuburbData, selectedSource} = data;
        console.log(wordSuburbData)
        return (
            <>
                <GoogleMapComponent sentiment={sentimentData} suburbDetail={attitudeData} followerData={followerData}
                                    wordSuburbData={wordSuburbData} isLoading={isLoading}/>
                <div className="page">
                    <Row>
                        <Col md={6}>
                            {/*<SimpleBarChart loading={isLoading} data={timeData}/>*/}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            {(!!sentimentData && selectedSource === "Sentiment") &&
                            <SimpleBarChart data={sentimentData} selectedSource={selectedSource}/>}
                            {(!!followerData && selectedSource === "Follower") &&
                            <SimpleBarChart data={followerData} selectedSource={selectedSource}/>}
                            {(!!languageData && selectedSource === "Language") &&
                            <SimpleBarChart data={languageData} selectedSource={selectedSource}/>}
                            {(!!hotwordData && selectedSource === "Hot Words") &&
                            <SimpleBarChart data={hotwordData} selectedSource={selectedSource}
                                            onClick={(word) => setWord(word)}/>}
                        </Col>
                    </Row>
                </div>
            </>

        )
    }
}

export default withContext(Map);