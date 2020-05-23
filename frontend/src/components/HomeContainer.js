import React from "react";
import {Jumbotron} from "reactstrap";

function Home() {
    const jumbotronStyle = {
        "backgroundImage":"url('/assets/images/photo-1446776653964-20c1d3a81b06.jpg')"
    }
    return(
        <div>
            <Jumbotron style={jumbotronStyle}>
                <div className="container">
                    <div className="row">
                        <div className="col-12 ">
                            <h1>Explore Melbourne Using Twitter Data</h1>
                            <h2>Cluster and Cloud Computing</h2>
                            <p>Group -</p>
                            <p>Haoyang Cui / Xin Wu /Dongming Li / Mayan Agarwal / Ziyue Wang</p>
                        </div>
                    </div>
                </div>
            </Jumbotron>
        </div>
    )
}

export default Home;