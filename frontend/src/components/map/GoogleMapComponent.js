import React, {Component} from 'react';
import {mapStyle} from "./GoogleMapStyles";
import ReactDOM from "react-dom"
import SimplePieChart from "../charts/PieChart";
import {GEO} from "../../StaticData/geo.js";
import {Colors} from "../../Utilities";
import withContext from "../../WithContext";
import Loading from "../loadingComponent";

class GoogleMapComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSuburb: "",
            map: null,
        }
    }

    componentDidMount() {
        const googleMapScript = document.createElement('script')
        googleMapScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAG_5NO3XfLR-iiTrMfL7tVHR9vzF7DgWQ&v=3.exp&libraries=geometry,drawing,places'
        window.document.body.appendChild(googleMapScript)
        googleMapScript.addEventListener('load', () => {
            this.createGoogleMap()
        })
    }

    componentWillUnmount() {
        window.google = {}
    }

    createGoogleMap = () => {
        let map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 11,
            center: {
                lat: -37.72116336626568, lng: 144.94041496744163
            },
            disableDefaultUI: true,
            styles: mapStyle
        });
        this.setState({
            map: map,
        })
    }

    createDataLayer = () => {
        const {suburbDetail, sentiment, followerData, wordSuburbData, selectedSource, commonData, regionData, languageData} = this.props
        const {map} = this.state

        //clear existed event and features
        window.google.maps.event.clearListeners(map.data, 'click')
        map.data.forEach(function (feature) {
            map.data.remove(feature);
        });


        let infoWindow = new window.google.maps.InfoWindow();
        map.data.addGeoJson(GEO)

        if (selectedSource === "Sentiment") {
            map.data.setStyle((feature) => {
                let target = sentiment.filter(suburb => suburb.name === feature.getProperty("name"))
                let value = target[0].value
                let color
                if (value < 0)
                    color = Colors.blue
                if (value < 0.05 && value >= 0)
                    color = Colors.green
                if (value < 0.1 && value >= 0.05)
                    color = Colors.yellow
                if (value < 0.2 && value >= 0.1)
                    color = Colors.orange
                if (value >= 0.2)
                    color = Colors.red
                return {
                    strokeColor: '#FFAE3B',
                    clickable: true,
                    fillColor: color,
                    strokeWeight: 1,
                    fillOpacity: 0.7,
                }
            })
            map.data.addListener('click', function (e) {
                let piedata = FilterPieData(suburbDetail, e.feature.getProperty("name"))
                const myelement = (
                    <div>
                        <h3>{e.feature.getProperty("name")}</h3>
                        <hr/>
                        <SimplePieChart data={piedata}/>
                    </div>
                );
                OpenInfoWindow(e.latLng, map, myelement)
            });
        }

        if (selectedSource === "Follower" || selectedSource === "Hot Words") {
            let data;
            switch (selectedSource) {
                case "Follower":
                    data = followerData
                    break
                case "Hot Words":
                    data = wordSuburbData
                    break
                default:
                    data = ""
            }
            let values
            if (data.length > 0) {
                values = data.map(suburb => suburb.value)
            }
            let max = Math.max(...values)
            let min = Math.min(...values)
            let gap = (max - min) / 5
            map.data.setStyle((feature) => {
                let target = data.filter(suburb => suburb.name === feature.getProperty("name"))
                if (target[0]) {
                    let value = target[0].value
                    let color
                    if (value < min + gap)
                        color = Colors.blue
                    if (value < min + gap * 2 && value >= min + gap)
                        color = Colors.green
                    if (value < min + gap * 3 && value >= min + gap * 2)
                        color = Colors.yellow
                    if (value < min + gap * 4 && value >= min + gap * 3)
                        color = Colors.orange
                    if (value >= min + gap * 4)
                        color = Colors.red
                    return {
                        strokeColor: '#FFAE3B',
                        clickable: true,
                        fillColor: color,
                        strokeWeight: 1,
                        fillOpacity: 0.7,
                    }
                }else {
                    return {strokeColor: '#FFAE3B',
                        clickable: true,
                        fillColor: Colors.grey,
                        strokeWeight: 1,
                        fillOpacity: 0.7,}
                }
            })
        }
        if (selectedSource === "Language") {
            map.data.setStyle((feature) => {
                let target = languageData.filter(suburb => suburb.name === feature.getProperty("name"))
                if (target[0]) {
                    let value = target[0].value
                    let color
                    if (value < 10)
                        color = Colors.blue
                    if (value < 50 && value >= 10)
                        color = Colors.green
                    if (value < 100 && value >= 50)
                        color = Colors.yellow
                    if (value < 500 && value >= 100)
                        color = Colors.orange
                    if (value >= 500)
                        color = Colors.red
                    return {
                        strokeColor: '#FFAE3B',
                        clickable: true,
                        fillColor: color,
                        strokeWeight: 1,
                        fillOpacity: 0.7,
                    }
                }
            })
        }
        if (selectedSource === "Living Region") {
            map.data.setStyle({
                strokeColor: '#FFAE3B',
                clickable: true,
                fillColor: Colors.grey,
                strokeWeight: 1,
                fillOpacity: 0.7,
            })
            map.data.addListener('click', function (e) {
                let target = regionData.filter(suburb => suburb.name === e.feature.getProperty("name"))
                let arr = []
                let output = []

                Object.keys(target[0].value).forEach((key) => {
                    arr.push(key);
                    output.push(
                        <tr key={key}>
                            <td>{key}</td>
                            <td>{target[0].value[key]} </td>
                        </tr>);
                })
                const myelement = (
                    <table>
                        <tbody>
                        <tr>
                            <th>{target[0].name}</th>
                            <th/>
                        </tr>
                        {output}
                        </tbody>
                    </table>
                );
                OpenInfoWindow(e.latLng, map, myelement)
                map.data.setStyle((feature) => {
                    let sub_target = regionData.filter(suburb => suburb.name === feature.getProperty("name"))
                    if (target[0] && arr.includes(sub_target[0].name)) {
                        let value = target[0].value[sub_target[0].name]
                        let color
                        if (value < 10)
                            color = Colors.green
                        if (value < 20 && value >= 10)
                            color = Colors.blue
                        if (value < 30 && value >= 20)
                            color = Colors.orange
                        if (value >= 30)
                            color = Colors.red

                        return {
                            strokeColor: '#FFAE3B',
                            clickable: true,
                            fillColor: color,
                            strokeWeight: 1,
                            fillOpacity: 0.7,
                        }

                    } else return {
                        strokeColor: '#FFAE3B',
                        strokeWeight: 1,
                        fillColor: Colors.yellow,
                    }
                })
            });

        }
        if (selectedSource === "Alcohol" || selectedSource === "Medium Income" || selectedSource === "Employment" || selectedSource === "Unemployment" || selectedSource === "Smoker") {
            let values = commonData.map(suburb => suburb.value)
            let max = Math.max(...values)
            let min = Math.min(...values)
            let gap = (max - min) / 5
            map.data.setStyle((feature) => {
                let target = commonData.filter(suburb => suburb.name === feature.getProperty("name"))

                if (target[0]) {
                    let value = target[0].value
                    let color
                    if (value < min + gap)
                        color = Colors.blue
                    if (value < min + gap * 2 && value >= min + gap)
                        color = Colors.green
                    if (value < min + gap * 3 && value >= min + gap * 2)
                        color = Colors.yellow
                    if (value < min + gap * 4 && value >= min + gap * 3)
                        color = Colors.orange
                    if (value >= min + gap * 4)
                        color = Colors.red
                    return {
                        strokeColor: '#FFAE3B',
                        clickable: true,
                        fillColor: color,
                        strokeWeight: 1,
                        fillOpacity: 0.7,
                    }
                } else return {
                    strokeColor: '#FFAE3B',
                    strokeWeight: 1,
                    fillColor: Colors.yellow,
                }
            })
        }


        map.data.addListener('mouseover', function (event) {
            map.data.revertStyle();
            map.data.overrideStyle(event.feature, {strokeWeight: 6});
        });
        map.data.addListener('mouseout', function (event) {
            map.data.revertStyle();
            infoWindow.close()
        });

        function OpenInfoWindow(latLng, map, element) {
            let div = document.createElement('div')
            ReactDOM.render(element, div)
            infoWindow.setContent(div)
            infoWindow.setPosition(latLng)
            infoWindow.open(map)
        }

        function FilterPieData(data, name) {
            let target = data.filter(suburb => suburb.suburb === name)
            let pieData = []
            if (target.length) {
                let attitudes = target[0].attitude
                Object.keys(attitudes)
                    .map((attitude) => {
                        if (attitude !== "total") {
                            pieData.push({name: attitude, value: attitudes[attitude]})
                        }
                    })
            } else {
                pieData.push({name: "UNKNOWN", value: 1})
            }
            return pieData;
        }
    }

    render() {
        if (this.props.suburbDetail || this.props.sentiment || this.props.followerData || this.props.wordSuburbData || this.props.regionData || this.props.commonData || this.props.languageData) {
            this.createDataLayer()
        }
        return (
            <>
                <div id="map" style={{width: '100%', height: '1200px'}}/>
                {this.props.isLoading && <Loading/>}
            </>
        )
    }
}

export default withContext(GoogleMapComponent)