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
    
    sum ( obj ) {
        var sum = 0;
        for( var el in obj ) {
          if( obj.hasOwnProperty( el ) ) {
            sum += parseFloat( obj[el] );
          }
        }
        return sum;
      }
          

    render() {
        const {data, actions} = this.props;
        const {setWord} = actions;
        const {timeData, isLoading, sentimentData, attitudeData, followerData, languageData, hotwordData, wordSuburbData, selectedSource, regionData, commonData} = data;
        let updatedRegionData;
        if (regionData){
            updatedRegionData = regionData.map(suburb => ({name:suburb.name, value:this.sum(suburb.value)}))
        }
        return (
            <>
                <GoogleMapComponent sentiment={sentimentData}
                                    suburbDetail={attitudeData}
                                    followerData={followerData}
                                    wordSuburbData={wordSuburbData}
                                    commonData={commonData}
                                    regionData = {regionData}
                                    isLoading={isLoading}
                                    selectedSource={selectedSource}/>
                <div className="page">
                    <Row>
                        <Col md={6}>
                            {/*<SimpleBarChart loading={isLoading} data={timeData}/>*/}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            {(!!sentimentData && selectedSource === "Sentiment") &&
                            <SimpleBarChart data={sentimentData} selectedSource={selectedSource} onClick={()=>{}}/>}
                            {(!!followerData && selectedSource === "Follower") &&
                            <SimpleBarChart data={followerData} selectedSource={selectedSource} onClick={()=>{}}/>}
                            {(!!languageData && selectedSource === "Language") &&
                            <SimpleBarChart data={languageData} selectedSource={selectedSource} onClick={()=>{}}/>}
                            {(!!hotwordData && selectedSource === "Hot Words") &&
                            <SimpleBarChart data={hotwordData} selectedSource={selectedSource}
                                            onClick={(word) => setWord(word)}/>}
                            {(!!commonData)&& <SimpleBarChart data={commonData} selectedSource={selectedSource} onClick={()=>{}}/>}
                            {(!!regionData && selectedSource == "Living Region") &&
                            <SimpleBarChart data={updatedRegionData} selectedSource={selectedSource} onClick={()=>{}}/>}
                        </Col>
                    </Row>
                </div>
            </>

        )
    }
}

export default withContext(Map);