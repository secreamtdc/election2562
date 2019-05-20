import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
import { orderBy } from "lodash";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
const PieChart = (props) => {
	let arr_value = [];
	props.value.forEach(element => {
	  arr_value.push({ label: element.name, y: element.value });
	});
  
	arr_value = orderBy(arr_value, ["y"], ["desc"]);
  
		const options = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: "Most Popular พรรคการเมือง (ตั้งแต่ 21/3/2562)"
			},
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}",
				dataPoints: arr_value
			}]
		}
		
		return (
		<div>
			
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	
}

export default PieChart;