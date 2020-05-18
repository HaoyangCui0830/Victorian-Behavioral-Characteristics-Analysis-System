import React, {Component} from 'react';
import SimpleBarChart from "./charts/BarChart";
import {Sentiment} from "../TestData/Sentiment"
import {SuburbDetail} from "../TestData/SuburbDetail";
import SimplePieChart from "./charts/PieChart";
import GoogleMapComponent from "./map/GoogleMapComponent";

const sentimentData = Sentiment.rows[0].value.data;
const suburbDetailData = SuburbDetail.rows
let sentiment = [], suburbDetail=[];
sentimentData.map((suburb) => sentiment.push({name: suburb.suburb, a: suburb.a}))

class Map extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <GoogleMapComponent sentiment={sentiment} suburbDetail={suburbDetailData}/>
                <SimpleBarChart data={sentiment}/>
                <SimplePieChart data={sentiment}/>
            </>
        )
    }
}
export default Map;