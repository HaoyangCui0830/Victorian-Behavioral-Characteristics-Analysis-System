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
        const {suburbDetail, sentiment, followerData, wordSuburbData, selectedSource, commonData, regionData} = this.props
        const {map} = this.state

        map.data.forEach((feature) => {
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
                OpenInfoWindow(e.latLng, map, piedata)
            });
        }

        if (selectedSource === "Follower") {
            map.data.setStyle((feature) => {
                let target = followerData.filter(suburb => suburb.name === feature.getProperty("name"))
                if (target[0]) {
                    let value = target[0].value
                    let color
                    if (value < 1000)
                        color = Colors.blue
                    if (value < 10000 && value >= 1000)
                        color = Colors.green
                    if (value < 100000 && value >= 10000)
                        color = Colors.yellow
                    if (value < 1000000 && value >= 100000)
                        color = Colors.orange
                    if (value >= 1000000)
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
        if (selectedSource === "Hot Words"&&wordSuburbData.length>0) {
            map.data.setStyle((feature) => {
                let target = wordSuburbData.filter(suburb => suburb.name === feature.getProperty("name"))
                if (target[0]) {
                    let value = target[0].value
                    let color
                    if (value < 10)
                        color = Colors.blue
                    if (value < 50 && value >= 10)
                        color = Colors.green
                    if (value < 100 && value >= 50)
                        color = Colors.yellow
                    if (value < 200 && value >= 100)
                        color = Colors.orange
                    if (value >= 200)
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
            map.data.addListener('click', function (e) {
                let target = regionData.filter(suburb => suburb.name === e.feature.getProperty("name"))
                let arr = []
                let output = []
                Object.keys(target[0].value).forEach((key)=>{
                    arr.push(key);
                    output.push(
                    <tr>
                        <td>{key}</td>
                        <td>{target[0].value[key]} </td>
                    </tr>);
                })
                const myelement = (
                    <table>
                      <tr>
                        <th>{target[0].name}</th>
                        <th></th>
                      </tr>
                      {output}
                    </table>
                  );
                let div = document.createElement('div')
                ReactDOM.render(myelement, div)
                infoWindow = new window.google.maps.InfoWindow({
                    content: div,
                    position: e.latLng
                });
                infoWindow.open(map)   
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

                    }else return {
                        strokeColor: '#FFAE3B',
                        strokeWeight: 1,
                        fillColor: Colors.yellow,
                    }
                    })
            });

        }
        if (selectedSource === "Alcohol"||selectedSource === "Medium Income"||selectedSource === "Employment"||selectedSource === "Unemployment"||selectedSource === "Smoker") {
            map.data.setStyle((feature) => {
                let values =  commonData.map(suburb=>suburb.value)
                let max =Math.max(...values)
                let min =Math.min(...values)
                let gap = (max-min)/5
                let target = commonData.filter(suburb => suburb.name === feature.getProperty("name"))

                if (target[0]) {
                    let value = target[0].value
                    let color
                    if (value < min+gap)
                        color = Colors.blue
                    if (value < min+gap*2 && value >= min+gap)
                        color = Colors.green
                    if (value < min+gap*3 && value >= min+gap*2)
                        color = Colors.yellow
                    if (value < min+gap*4 && value >= min+gap*3)
                        color = Colors.orange
                    if (value >= min+gap*4)
                        color = Colors.green
                    return {
                        strokeColor: '#FFAE3B',
                        clickable: true,
                        fillColor: color,
                        strokeWeight: 1,
                        fillOpacity: 0.7,
                    }
                }else return {
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

        function OpenInfoWindow(latLng, map, data) {
            let div = document.createElement('div')
            ReactDOM.render(<SimplePieChart data={data}/>, div)
            infoWindow = new window.google.maps.InfoWindow({
                content: div,
                position: latLng
            });
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
        if (this.props.suburbDetail || this.props.sentiment || this.props.followerData || this.props.wordSuburbData || this.props.regionData || this.props.commonData) {
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