import React, {PureComponent} from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import {Spinner} from 'reactstrap';

const colors = {
  'Temperature':'#f3c363',
  'Moisture 50 cm underground':'#8884d8',
  'Moisture 100 cm underground':'#82ca9d',
  'Moisture 150 cm underground':'#fc3903'
}

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

const unitTransformer = {
    "Voltage": "V",
    "Temperature": "℃",
    "Moisture 50 cm underground": "%",
    "Moisture 100 cm underground": "%",
    "Moisture 150 cm underground": "%",
    "Precipitation": "mm",
    "evaporation": "kJ/㎡",
}

const oneDigit = value => {
    let v = value.toFixed(1)
    return v
}

class SimpleLineChart extends PureComponent {
    static propTypes = {
        data: PropTypes.array,
        keys: PropTypes.array,
        unit: PropTypes.string,
        tick: PropTypes.object,
        unitRight: PropTypes.string,
        loading: PropTypes.bool
    }

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
                    <ResponsiveContainer height={400} width='100%'>
                        <LineChart
                            data={this.props.data}
                            margin={{top: 20, left: -10}}>
                            <XAxis
                                dataKey="name"
                                height={80}
                                tick={<CustomizedAxisTick/>}
                            />
                            <YAxis width={80} yAxisId="left" unit={this.props.unit}/>
                            <YAxis yAxisId="right" orientation="right" unit={this.props.unitRight}/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip formatter={(value, name) => ` ${oneDigit(value)} ${unitTransformer[name]}`}/>
                            <Legend verticalAlign="top" margin={{bottom: 50}}/>
                            {this.props.keys &&
                            this.props.keys.map((key, index) => (
                                    <Line
                                        yAxisId={key.yAxis ? "right" : "left"}
                                        key={index}
                                        type="monotone"
                                        dataKey={key.label}
                                        stroke={key.color || colors[key.label]}
                                        strokeWidth={2}
                                        dot={false}/>
                                )
                            )}
                        </LineChart>
                    </ResponsiveContainer>
                    : <span className="text-center"><h3>No Sensor Data</h3></span>
                }
            </div>
        );
    }
}

export default SimpleLineChart;
