import React from "react";
import CanvasJSReact from "../../assets/canvasjs.react";
import { orderBy } from "lodash";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

const BarChart = props => {
  let arr_value = [];
  props.value.forEach(element => {
    arr_value.push({ label: element.name, y: element.value });
  });

  arr_value = orderBy(arr_value, ["y"], ["desc"]);

  const options = {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Most Popular พรรคการเมือง (ตั้งแต่ 21/3/2562)"
    },
    axisX: {
      title: "พรรคการเมือง",
      reversed: true
    },
    axisY: {
      title: "จำนวน tweet",
      labelFormatter: props.addSymbols
    },
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
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
};

export default BarChart;
