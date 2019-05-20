import React from "react";
import Overview from "./overview";
import Pie from "./pie";

const QUANTITY = props => {
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
      <Pie value={props.quantity} />
      <br /><br />
      {/* <Overview value={props.quantity} /> */}
    </div>
  );
};

export default QUANTITY;
