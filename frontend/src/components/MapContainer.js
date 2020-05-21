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
        const {timeData, isLoading, sentimentData,attitudeData,followerData,languageData,selectedSource} = data;

        return (
            <>
                <GoogleMapComponent sentiment={sentimentData} suburbDetail={attitudeData} followerData={followerData}/>
                <div className="page">
                    <Row>
                        <Col md={6}>
                            <SimpleBarChart loading={isLoading} data={timeData}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            {(!!sentimentData&&selectedSource==="Sentiment") && <SimpleBarChart loading={isLoading} data={sentimentData}/>}
                            {(!!followerData&&selectedSource==="Follower") && <SimpleBarChart loading={isLoading} data={followerData}/>}
                            {(!!languageData&&selectedSource==="Language") && <SimpleBarChart loading={isLoading} data={languageData}/>}
                        </Col>
                    </Row>
                </div>




            </>

        )
    }
}

export default withContext(Map);