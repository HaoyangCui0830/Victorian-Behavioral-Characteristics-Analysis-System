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
let GeoUrl = "https://api.maptiler.com/data/6b57b783-6867-4e5a-9aa8-a3d92967edbc/features.json?key=SRHa8sarYsHKRuSWfalI"
// let GeoUrl = "https://data.gov.au/geoserver/vic-suburb-locality-boundaries-psma-administrative-boundaries/wfs?request=GetFeature&typeName=ckan_af33dd8c_0534_4e18_9245_fc64440f742e&outputFormat=json"

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
        let infowindow = new window.google.maps.InfoWindow({content:"test"});
        map.data.loadGeoJson(GeoUrl)
        map.data.setStyle({
                strokeColor:'#FFAE3B',
                clickable:true

        })
        marker.addListener('click',function () {
            infowindow.open(map,marker);
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