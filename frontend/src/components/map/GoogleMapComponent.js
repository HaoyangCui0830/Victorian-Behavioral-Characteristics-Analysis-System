import React, {Component} from 'react';
import {mapStyle} from "./GoogleMapStyles";
import SimpleBarChart from "../charts/BarChart";
import ReactDOM from "react-dom"
import SimplePieChart from "../charts/PieChart";
import {isNumber} from "recharts/lib/util/DataUtils";

let map
let GeoUrl = "https://raw.githubusercontent.com/cn-wx/COMP90024-TrackHub/master/backend/backend/common/melb_geo.json"

export default class GoogleMapComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            selectedSuburb:"",
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

    createGoogleMap = () => {
        const {sentiment,suburbDetail}= this.props
        map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 11,
            center: {
                lat: -37.72116336626568, lng: 144.94041496744163
            },
            disableDefaultUI: true,
            styles: mapStyle
        });

        let infowindow = new window.google.maps.InfoWindow();
        map.data.loadGeoJson(GeoUrl)
        map.data.setStyle((feature) => {
            return {
                strokeColor: '#FFAE3B',
                clickable: true,
                name: feature.getProperty("name")
            }
        })

        map.data.addListener('click', function (e) {
            let piedata = FilterPieData(suburbDetail,e.feature.getProperty("name"))
            OpenInfoWindow(e.latLng, map,piedata)
        });

        map.data.addListener('mouseover', function (event) {
            map.data.revertStyle();
            map.data.overrideStyle(event.feature, {strokeWeight: 6});
        });
        map.data.addListener('mouseout', function (event) {
            map.data.revertStyle();
            infowindow.close()
        });

        function OpenInfoWindow(latLng, map,data) {
            let div = document.createElement('div')
            ReactDOM.render(<SimplePieChart data={data}/>, div)
            infowindow = new window.google.maps.InfoWindow({
                content: div,
                position: latLng
            });
            infowindow.open(map)
        }

        function FilterPieData(data,name){
            let test = data.filter(suburb=> suburb.key ===name.toUpperCase() )
            let pieData=[]
            if (test.length){
                let test1 = test[0].value[0]
                Object.keys(test1).map((sen)=> {
                    if (isNumber(test1[sen])){
                        pieData.push({name:sen,value:test1[sen]})
                    }
                })
            }
            else {
                pieData.push({name:"UNKNOWN", value:1})
            }
            return pieData;
        }
    }

    render() {
        return (
            <div id="map" style={{width: '100%', height: '1200px'}}/>
        )
    }
}