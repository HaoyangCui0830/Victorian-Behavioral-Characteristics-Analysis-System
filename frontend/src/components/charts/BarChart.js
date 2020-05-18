import React, {PureComponent} from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import {Spinner} from "reactstrap";

const CustomizedAxisTick = props => {
    const {x, y, payload} = props
    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} fill="#666">
                {payload.value.split(",").map((val, index) => (
                    <tspan key={index} textAnchor="middle" x="0" dy="20">{val}</tspan>)
                )}
            </text>
        </g>
    )
}

class SimpleBarChart extends PureComponent {


    render() {
        const center = {
            position: "absolute",
            margin: "auto",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        }
        // if (this.props.loading) {
        //     return (
        //         <ResponsiveContainer height={100} width='100%'>
        //             <Spinner
        //                 style={center}
        //                 color="primary"/>
        //         </ResponsiveContainer>
        //     )
        // }

        return (
            <div>
                {/*{this.props.data.length > 0 ?*/}
                <ResponsiveContainer height={300} width='100%'>
                    <BarChart
                        width={1200}
                        height={300}
                        data={this.props.data}

                    >
                        <XAxis dataKey="name"
                               interval={0}
                               angle={-45}
                               textAnchor="end"
                               height={100}

                        />
                        <YAxis yAxisId="left" orientation="left" />
                        <Tooltip/>
                        <Bar
                            yAxisId="left"
                            dataKey="a"
                            fill="#FFBB28"/>

                    </BarChart>
                </ResponsiveContainer>
                {/*     : <span className="text-center"><h3>No Sensor Sentiment</h3></span>*/}
                {/*}*/}
            </div>
        );
    }
}

export default SimpleBarChart;
