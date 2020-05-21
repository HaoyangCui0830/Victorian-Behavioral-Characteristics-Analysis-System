import React, { Component } from 'react';
import ReactDOM from "react-dom";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Column2D from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import GammelTheme from 'fusioncharts/themes/fusioncharts.theme.gammel';
import CandyTheme from 'fusioncharts/themes/fusioncharts.theme.candy';
import ZuneTheme from 'fusioncharts/themes/fusioncharts.theme.zune';
import OceanTheme from 'fusioncharts/themes/fusioncharts.theme.ocean';
import CarbonTheme from 'fusioncharts/themes/fusioncharts.theme.carbon';

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, CandyTheme);


class SimpleBarChart extends Component  {
    render() {
        const my_data = this.props.data
        const update_my_data = my_data.map(({ a, name }) => {
            return { label: name, value: a }
          })
        const chartConfigs = {
            type: "column2d", // The chart type
            width: "100%", // Width of the chart
            height: "600", // Height of the chart
            dataFormat: "json", // Data type
            dataSource : {
                "chart": {
                  "caption": "Lorem Ipsum",
                  "subCaption": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                  "xAxisName": "Suburbs",
                  "yAxisName": "Lorem Ipsum",
                  "theme": "candy"
                },
                "data": update_my_data
              },
            };

        return <ReactFC {...chartConfigs} />;

    }
}

export default SimpleBarChart;
