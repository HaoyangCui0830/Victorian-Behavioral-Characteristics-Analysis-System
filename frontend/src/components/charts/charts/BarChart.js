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
        if (this.props.loading) {
            return (
                <ResponsiveContainer height={100} width='100%'>
                    <Spinner
                        style={center}
                        color="primary"/>
                </ResponsiveContainer>
            )
        }

        return (
            <div>
                {this.props.data.length > 0 ?
                    <ResponsiveContainer height={300} width='100%'>
                        <BarChart
                            width={600}
                            height={300}
                            data={this.props.data}
                            margin={{top: 20, left: -10}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name" height={80}
                                // tick={<CustomizedAxisTick/>}
                            />
                            <YAxis yAxisId="left" orientation="left" unit={this.props.unit}/>
                            <Tooltip/>
                            <Legend verticalAlign="top" margin={{bottom: 50}}/>
                            {this.props.keys.map((key, index) => (
                                    <Bar
                                        yAxisId="left"
                                        key={index}
                                        dataKey={key.label}
                                        fill="#3c71ba"/>
                                )
                            )}
                        </BarChart>
                    </ResponsiveContainer>
                    : <span className="text-center"><h3>No Sensor Data</h3></span>
                }
            </div>
        );
    }
}

export default SimpleBarChart;
