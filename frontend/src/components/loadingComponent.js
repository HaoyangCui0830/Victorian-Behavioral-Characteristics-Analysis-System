import React from "react";
import {Spinner} from "reactstrap"

const Loading=()=>(
    <div className="loading-component text-center">
        <Spinner/>
        <h5>Loading</h5>
    </div>
)

export default Loading