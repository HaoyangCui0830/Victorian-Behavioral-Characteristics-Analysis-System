// import React, {Component} from "react";
// import {compose, withProps} from "recompose"
// // import MapComponent from "./map/MapComponent";
// import {GoogleMap, Polygon, withGoogleMap, withScriptjs} from "react-google-maps";
// import {mapStyle} from "./map/GoogleMapStyles";
//
// const MapComponent = compose(
//     withProps(
//         {
//             googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAG_5NO3XfLR-iiTrMfL7tVHR9vzF7DgWQ&v=3.exp&libraries=geometry,drawing,places",
//             loadingElement: <div style={{height: `100%`}}/>,
//             containerElement: <div style={{height: `800px`}}/>,
//             mapElement: <div style={{height: `100%`}}/>
//         }),
//     withScriptjs,
//     withGoogleMap
// )((props) =>
//     <GoogleMap
//         defaultZoom={11}
//         defaultCenter={{lat: -37.72116336626568, lng: 144.94041496744163}}
//         defaultOptions={{styles: mapStyle}}
//     >
//         <Polygon >
//
//         </Polygon>
//         {/*{props.isMarkerShown && <Marker position={{ lat: -37.72116336626568, lng:144.94041496744163 }} />}*/}
//     </GoogleMap>
// )
//
// class Map extends Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             melb_geo: ""
//         }
//     }
//
//     componentDidMount() {
//         this.fetchMelGeo()
//         this.renderPolygon()
//     }
//
//     fetchMelGeo() {
//         fetch('https://data.gov.au/geoserver/vic-local-government-areas-psma-administrative-boundaries/wfs?request=GetFeature&typeName=ckan_bdf92691_c6fe_42b9_a0e2_a4cd716fa811&outputFormat=json')
//             .then(res => res.json())
//             .then((resJson) => {
//                 console.log(resJson)
//                 this.setState({melb_geo: resJson})
//             })
//     }
//
//     renderPolygon(){
//         return this.state.melb_geo.map(regionJ=>{
//             let region = JSON.parse(regionJ.geoJson)
//             let coordinates = region.geometry.coodinates[0][0]
//             console.log(coordinates)
//         })
//     }
//
//     render() {
//         return (
//             <MapComponent isMarkerShown/>
//         )
//     }
// }
//
// export default Map;

import React, {Component} from 'react';
import {mapStyle} from "./map/GoogleMapStyles";

let map;
let GeoUrl = "https://api.maptiler.com/data/ba546f2c-c614-46cd-a3ce-92c85038a4a8/features.json?key=SRHa8sarYsHKRuSWfalI"
// let GeoUrl = "https://data.gov.au/geoserver/vic-suburb-locality-boundaries-psma-administrative-boundaries/wfs?request=GetFeature&typeName=ckan_af33dd8c_0534_4e18_9245_fc64440f742e&outputFormat=json"
let json_from_haoyang = {"rows":[{"key":null,"value":{"data":[{"s":0,"n":1,"suburb":"MERRICKS NORTH","a":0},{"s":0,"n":1,"suburb":"BLACKWOOD","a":0},{"s":1,"n":1,"suburb":"CROYDON SOUTH","a":1},{"s":0.25,"n":1,"suburb":"BENTLEIGH EAST","a":0.25},{"s":-0.3,"n":1,"suburb":"DANDENONG SOUTH","a":-0.3},{"s":5.520865800865801,"n":29,"suburb":"MELBOURNE","a":0.19037468278847589},{"s":0.75,"n":5,"suburb":"RINGWOOD NORTH","a":0.15},{"s":0.028787878787878782,"n":1,"suburb":"ABBOTSFORD","a":0.028787878787878782},{"s":0,"n":2,"suburb":"MORNINGTON","a":0},{"s":0,"n":1,"suburb":"PARKVILLE","a":0},{"s":0,"n":1,"suburb":"ALTONA MEADOWS","a":0},{"s":0.1,"n":2,"suburb":"BRUNSWICK","a":0.05},{"s":0,"n":1,"suburb":"CRANBOURNE EAST","a":0},{"s":0,"n":3,"suburb":"BRIGHTON EAST","a":0},{"s":0,"n":4,"suburb":"GLEN HUNTLY","a":0},{"s":0.2787878787878788,"n":2,"suburb":"ROSEBUD","a":0.1393939393939394},{"s":0.7,"n":1,"suburb":"CAULFIELD NORTH","a":0.7},{"s":-0.234375,"n":1,"suburb":"NORTHCOTE","a":-0.234375},{"s":0.41547619047619044,"n":4,"suburb":"SOUTH YARRA","a":0.10386904761904761},{"s":0.024999999999999994,"n":2,"suburb":"DOCKLANDS","a":0.012499999999999997},{"s":-0.05,"n":1,"suburb":"KEILOR EAST","a":-0.05},{"s":0,"n":1,"suburb":"FOOTSCRAY","a":0},{"s":-0.09375,"n":1,"suburb":"FRANKSTON","a":-0.09375},{"s":0.4,"n":1,"suburb":"CARRUM","a":0.4},{"s":0.125,"n":2,"suburb":"SYDENHAM","a":0.0625},{"s":0,"n":1,"suburb":"GLEN WAVERLEY","a":0},{"s":0.4,"n":2,"suburb":"TAYLORS LAKES","a":0.2},{"s":0,"n":1,"suburb":"KEALBA","a":0},{"s":0,"n":1,"suburb":"RESERVOIR","a":0},{"s":1,"n":1,"suburb":"GEELONG","a":1},{"s":0.1875,"n":1,"suburb":"PRESTON","a":0.1875},{"s":0,"n":1,"suburb":"BAXTER","a":0},{"s":0,"n":1,"suburb":"CAPE WOOLAMAI","a":0},{"s":-0.24166666666666667,"n":1,"suburb":"EAST MELBOURNE","a":-0.24166666666666667},{"s":0,"n":1,"suburb":"MALVERN","a":0},{"s":0.8,"n":1,"suburb":"FRYERSTOWN","a":0.8},{"s":0,"n":1,"suburb":"BALWYN NORTH","a":0},{"s":-0.7142857142857143,"n":1,"suburb":"IVANHOE EAST","a":-0.7142857142857143},{"s":0,"n":1,"suburb":"CRAIGIEBURN","a":0},{"s":0.8,"n":3,"suburb":"NARRE WARREN","a":0.26666666666666666},{"s":0,"n":1,"suburb":"MICKLEHAM","a":0},{"s":0,"n":1,"suburb":"HERNE HILL","a":0},{"s":0.13020833333333334,"n":1,"suburb":"COLLINGWOOD","a":0.13020833333333334},{"s":0,"n":1,"suburb":"BENTLEIGH","a":0},{"s":-0.1875,"n":1,"suburb":"HAWTHORN EAST","a":-0.1875},{"s":0,"n":1,"suburb":"KEW","a":0},{"s":0,"n":1,"suburb":"KEYSBOROUGH","a":0},{"s":0,"n":1,"suburb":"SOUTH MELBOURNE","a":0},{"s":0.22499999999999998,"n":1,"suburb":"BLAIRGOWRIE","a":0.22499999999999998},{"s":0,"n":1,"suburb":"SEAFORD","a":0},{"s":0.25,"n":1,"suburb":"CHELTENHAM","a":0.25},{"s":0,"n":1,"suburb":"COWES","a":0}],"sub":["MERRICKS NORTH","BLACKWOOD","CROYDON SOUTH","BENTLEIGH EAST","DANDENONG SOUTH","MELBOURNE","RINGWOOD NORTH","ABBOTSFORD","MORNINGTON","PARKVILLE","ALTONA MEADOWS","BRUNSWICK","CRANBOURNE EAST","BRIGHTON EAST","GLEN HUNTLY","ROSEBUD","CAULFIELD NORTH","NORTHCOTE","SOUTH YARRA","DOCKLANDS","KEILOR EAST","FOOTSCRAY","FRANKSTON","CARRUM","SYDENHAM","GLEN WAVERLEY","TAYLORS LAKES","KEALBA","RESERVOIR","GEELONG","PRESTON","BAXTER","CAPE WOOLAMAI","EAST MELBOURNE","MALVERN","FRYERSTOWN","BALWYN NORTH","IVANHOE EAST","CRAIGIEBURN","NARRE WARREN","MICKLEHAM","HERNE HILL","COLLINGWOOD","BENTLEIGH","HAWTHORN EAST","KEW","KEYSBOROUGH","SOUTH MELBOURNE","BLAIRGOWRIE","SEAFORD","CHELTENHAM","COWES"]}}]}

class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            melb_geo: null
        }
    }

    componentDidMount() {
        // this.fetchMelGeo()
        const googleMapScript = document.createElement('script')
        googleMapScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAG_5NO3XfLR-iiTrMfL7tVHR9vzF7DgWQ&v=3.exp&libraries=geometry,drawing,places'
        window.document.body.appendChild(googleMapScript)
        googleMapScript.addEventListener('load', () => {
            this.createGoogleMap()
        })
    }

    fetchMelGeo() {
        fetch(GeoUrl)
            .then(res => res.json())
            .then((resJson) => {
                console.log(resJson)
                this.setState({melb_geo: resJson})
            })
    }

    createGoogleMap = () => {
        map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 11,
            center: {
                lat: -37.72116336626568, lng: 144.94041496744163
            },
            disableDefaultUI: true,
            styles: mapStyle
        });
        let marker = new window.google.maps.Marker({
            position:{
                lat: -37.72116336626568, lng: 144.94041496744163
            },
            map:map,
            title:"test"
        })
        let marker1 = new window.google.maps.Marker({
            position:{
                lat: -37.72, lng: 144.94
            },
            map:map,
            title:"test1"
        })
        let infowindow = new window.google.maps.InfoWindow({content:"test"});
        map.data.loadGeoJson(GeoUrl)
        map.data.setStyle({
                strokeColor:'#FFAE3B',
                clickable:true

        })
        marker.addListener('click',function () {
            infowindow.open(map,marker);
        })

        marker1.addListener('click',function () {
            infowindow.open(map,marker1);
        })
        // map.data.addListener('click', function(event) {
        //     info.open(map,map.data)
        //     event.feature.setProperty('isColorful', true);
        // });
        map.data.addListener('mouseover', function(event) {
            map.data.revertStyle();
            map.data.overrideStyle(event.feature, {strokeWeight: 6});
        });
        map.data.addListener('mouseout', function(event) {
            map.data.revertStyle();
        });
    }


    render() {
        return (
            <div id="map" style={{width: '100%', height: '800px'}}/>
        )

    }
}


//     // dataHandler = (getJson) => {
//     //     // FIRST I REMOVE THE CURRENT LAYER (IF THERE IS ONE)
//     //     for (var i = 0; i < dataLayer.length; i++) {
//     //         map.data.remove(dataLayer[i])
//     //     }
//     //     // THEN I FETCH MY JSON FILE, IN HERE I'M USING A PROP BECAUSE
//     //     // I WANT TO USE THIS DATAHANDLER MULTIPLE TIMES & DYNAMICALLY
//     //     // I CAN NOW DO SOMETHING LIKE THIS:
//     //     // onClick(this.dataHandler(www.anotherlinktojsonfile.com/yourjsonfile.json))
//     //     // ON EACH BUTTON AND CHOOSE WHICH JSON FILE NEEDS TO BE FETCHED IN MY DATAHANDLER.
//     //     fetch(getJson)
//     //         .then(response => response.json())
//     //         .then(featureCollection => {
//     //                 dataLayer = map.data.addGeoJson(featureCollection)
//     //                 // ADD SOME NEW STYLE IF YOU WANT TO
//     //                 map.data.setStyle({strokeWeight: 0.5, fillOpacity: 0 });
//     //             }
//     //         );
//     //     map.data.addListener('mouseover', (event) => {
//     //         map.data.revertStyle();
//     //         // ADD A STYLE WHEN YOU HOVER OVER A SPECIFIC POLYGON
//     //         map.data.overrideStyle(event.feature, {strokeWeight: 1, fillOpacity: 0.1 });
//     //         // IN CONSOLE LOG, YOU CAN SEE ALL THE DATA YOU CAN RETURN
//     //         console.log(event.feature)
//     //     });
//     //     map.data.addListener('mouseout', (event) => {
//     //         // REVERT THE STYLE TO HOW IT WAS WHEN YOU HOVER OUT
//     //         map.data.revertStyle();
//     //     });
//     // }


export default Map;