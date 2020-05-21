import React, {PureComponent} from 'react';
import {
    BarChart,
    Bar,
    Pie,
    XAxis,
    YAxis,
    PieChart,
    Tooltip,
    Brush,
    ResponsiveContainer
} from 'recharts';

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
    handleClick=(data,index)=>{
        this.props.onClick(data.name)
    }
    render() {
        const center = {
            position: "absolute",
            margin: "auto",
            top: "120px",
            left: 0,
            right: 0
        }
        const CustomTooltip = ({active, payload, label}) => {
            if (active) {
                let data = payload[0].payload
                let data1 = [
                    {name: "Positive", value: data.pos},
                    {name: "Neutral", value: data.neu},
                    {name: "Negative", value: data.neg}
                ]
                const RADIAN = Math.PI / 180;
                const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index,}) => {

                    const sin = Math.sin(-RADIAN * midAngle);
                    const cos = Math.cos(-RADIAN * midAngle);
                    const mx = cx + (outerRadius) * cos;
                    const ex = mx + (cos >= 0 ? 1 : -1) * 12;
                    const ey = cy + (outerRadius + 30) * sin;
                    return (
                        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} fill="black"
                              textAnchor={cos >= 0 ? 'start' : 'end'} dominantBaseline="central">
                            {`${data1[index].name}: ${data1[index].value}`}
                        </text>
                    );
                };
                return (
                    <div className="custom-tooltip">
                        <h3>{data.name.toUpperCase()}</h3>
                        <ResponsiveContainer height={200}>
                            <PieChart margin={{top: 30, left: 30, right: 30, bottom: 30}}>
                                <Pie isAnimationActive={false} dataKey="value" data={data1} fill="#FFBB28"
                                     label={renderCustomizedLabel} labelLine/>
                            </PieChart>
                        </ResponsiveContainer>

                    </div>
                );
            }

            return null;
        };

        return (
            <div>
                {this.props.data.length > 0 ?
                    <ResponsiveContainer height={400} width='100%'>
                        <BarChart
                            data={this.props.data}
                        >
                            <XAxis dataKey="name"
                                   interval={0}
                                   angle={-45}
                                   textAnchor="end"
                                   height={150}
                                   stroke="#98a5be"
                            />
                            <YAxis stroke="#98a5be"/>
                            {this.props.selectedSource === "Hot Words" ? <Tooltip content={<CustomTooltip/>}/> :
                                <Tooltip/>
                            }

                            <Bar
                                dataKey="value"
                                fill="#FFBB28"
                                onClick={this.handleClick}
                            />
                            <Brush dataKey="name" height={30} stroke="#304a7d"/>
                        </BarChart>
                    </ResponsiveContainer>
                    : <span className="text-center"><h3>No Data</h3></span>
                }
            </div>
        );
    }
}

export default SimpleBarChart;
