import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const styles = require("./GoogleMapStyles.json")
const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={11}
        defaultCenter={{ lat: -37.72116336626568, lng: 144.94041496744163 }}
        defaultOptions={{style:styles}}
    >
        {props.isMarkerShown && <Marker position={{ lat: -37.72116336626568, lng:144.94041496744163 }} />}
    </GoogleMap>
))

export default MyMapComponent;
