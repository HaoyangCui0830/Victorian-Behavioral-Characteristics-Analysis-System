import React, {Component} from 'react';
import SimpleBarChart from "./charts/BarChart";
import {Row, Col} from "reactstrap"
import GoogleMapComponent from "./map/GoogleMapComponent";
import withContext from "../WithContext";
import SelectComponent from "./SelectComponent";


class Map extends Component {
    constructor(props) {
        super(props);
    }

    sum(obj) {
        var sum = 0;
        for (var el in obj) {
            if (obj.hasOwnProperty(el)) {
                sum += parseFloat(obj[el]);
            }
        }
        return sum;
    }


    render() {
        const {data, actions} = this.props;
        const {setWord, onSelect} = actions;
        const {timeData, isLoading, sentimentData, attitudeData, followerData, languageData, hotwordData, wordSuburbData, selectedSource, regionData, commonData} = data;
        let updatedRegionData;
        if (regionData) {
            updatedRegionData = regionData.map(suburb => ({name: suburb.name, value: this.sum(suburb.value)}))
        }
        return (
            <>
                <GoogleMapComponent sentiment={sentimentData}
                                    suburbDetail={attitudeData}
                                    followerData={followerData}
                                    wordSuburbData={wordSuburbData}
                                    languageData={languageData}
                                    commonData={commonData}
                                    regionData={regionData}
                                    isLoading={isLoading}
                                    selectedSource={selectedSource}/>
                <div className="page">
                    <SelectComponent selectedSource={selectedSource} onSelect={onSelect}/>
                    <Row>
                        <Col md={12}>
                            {(!!timeData && selectedSource === "Time") &&
                            <SimpleBarChart loading={isLoading} data={timeData}/>}
                            {(!!sentimentData && selectedSource === "Sentiment") &&
                            <SimpleBarChart data={sentimentData} selectedSource={selectedSource} onClick={() => {
                            }}/>}
                            {(!!followerData && selectedSource === "Follower") &&
                            <SimpleBarChart data={followerData} selectedSource={selectedSource} onClick={() => {
                            }}/>}
                            {(!!languageData && selectedSource === "Language") &&
                            <SimpleBarChart data={languageData} selectedSource={selectedSource} onClick={() => {
                            }}/>}
                            {(!!hotwordData && selectedSource === "Hot Words") &&
                            <SimpleBarChart data={hotwordData} selectedSource={selectedSource}
                                            onClick={(word) => setWord(word)}/>}
                            {(!!commonData && (selectedSource === "Alcohol" || selectedSource === "Medium Income" || selectedSource === "Employment" || selectedSource === "Unemployment" || selectedSource === "Smoker")) &&
                            <SimpleBarChart data={commonData} selectedSource={selectedSource} onClick={() => {
                            }}/>}
                            {(!!regionData && selectedSource === "Living Region") &&
                            <SimpleBarChart data={updatedRegionData} selectedSource={selectedSource} onClick={() => {
                            }}/>}
                        </Col>
                    </Row>
                </div>
            </>

        )
    }
}

export default withContext(Map);