import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
const each = props => {
  let data = [];
  let to1 = (
    <img
      src="https://www.rottentomatoes.com/assets/pizza-pie/images/icons/global/new-fresh-lg.12e316e31d2.png"
      width="48px"
      height="48px"
    />
  );
  let to2 = (
    <img
      src="https://www.rottentomatoes.com/assets/pizza-pie/images/icons/global/new-rotten-lg.ecdfcf9596f.png"
      width="48px"
      height="48px"
    />
  );
  
  const numberWithCommas =(x)=> {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  for (let index = 0; index < props.eachPlus.length; index++) {
    const element = props.eachPlus[index];
    let img = "";
    switch (element.name) {
      case "อนาคตใหม่":
        img =
          "https://pbs.twimg.com/profile_images/1045676763089518592/SJrT1TbA.jpg";
        break;
      case "เพื่อไทย":
        img = "https://news.mthai.com/app/uploads/2019/03/123338415.jpg";
        break;
      case "ประชาธิปัตย์":
        img = "https://mpics.mgronline.com/pics/Images/561000009758002.JPEG";
        break;
      case "พลังประชารัฐ":
        img =
          "https://img.tnews.co.th/userfiles/image/01_033(3).jpg";
        break;
      default:
        img =
          "data:image/jpeg;base64,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";
        break;
    }
    console.log("element.values", element.values);
    let tomatoes = element.values + props.eachNegative[index].values;
    let eplusPercen = parseInt((element.values * 100) / tomatoes);
    let eNegPercen = parseInt(
      (props.eachNegative[index].values * 100) / tomatoes
    );
    
    data.push([
      eplusPercen,
      eNegPercen,
      img,
      element.values,
      props.eachNegative[index].values,
      element.name
    ]);
  }
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
      <h2> Sentiments ของแต่ละพรรคการเมือง</h2>
      <br />
      {data.map((item, i) => {
        return (
          <div className="container">
            <div className="row equipo-item">
              <div className="col-md-3 separador-vertical">
                <img
                  style={{ width: "200px" }}
                  src={item[2]}
                  className="img-responsive center-block"
                />
              </div>
              <div className="col-md-9">
                <h2 className="titulo-equipo">พรรค{item[5]}</h2>
                <br/>
                <div
                  className="row"
                  style={{ fontWeight: "700", fontSize: "35px" ,textAlign:"center"}}
                >
                  <div className="col-md-6">
                   <p> {to1}{item[0] + "%"} </p>
                    <p style={{ fontWeight: "700", fontSize: "14px" }}>Counted: {numberWithCommas(item[3])}</p>
                  </div>
                  <div className="col-md-6" >
                  <p> {to2}{item[1]+1 + "%"}</p>
                  <p style={{ fontWeight: "700", fontSize: "14px" }}>Counted: {numberWithCommas(item[4])}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default each;
