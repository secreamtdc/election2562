import React, { Component } from "react";
import CanvasJSReact from "../../assets/canvasjs.react";
import { orderBy } from "lodash";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

const BarChart = props => {
  let arr_value = [];
  let colorSet = [];
  props.value.forEach(element => {
    arr_value.push({ label: element.name, y: element.value });
  });

  arr_value = orderBy(arr_value, ["y"], ["desc"]);

arr_value.forEach(element => {
    if(element.y >=0 ){
        colorSet.push("#99A1C6")
    }else{
        colorSet.push("#E9A19B")
    }
});
CanvasJS.addColorSet("customColorSet1",colorSet); 
  const options = {
    animationEnabled: true,
    theme: "light2",
    colorSet:"customColorSet1",
    title: {
      text: "การพูดถึงพรรคการเมือง ในแง่บวกและลบ (ตั้งแต่ 21/3/2562)"
    },
    axisX: {
      title: "พรรคการเมือง",
      reversed: true,
      interval: 1,
      labelFontSize: 16
      
    },
    axisY: {
        title: "จำนวน tweet",
      labelFormatter: props.addSymbols,
      labelFontSize: 16
    },
    height:500,
    data: [
      {
        type: "bar",
        dataPoints: arr_value
      }
    ]
  };

  return (
    <div>
      <br />
      <img
        src={
          "https://png.pngtree.com/element_our/md/20180506/md_5aeee44e137e1.png"
        }
        alt="logo"
        style={{ width: "78px" }}
      />
      <h2> เลือกตั้ง 2562 By สีครีม</h2>
      <br />
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
};

export default BarChart;
