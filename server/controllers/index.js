const amqp = require("../module/que").que;
const { insertData } = require("../module/mongo");

function load(req, res) {
  res.send("load...");
}

function que(req, res) {
  let q = "tasks";
  let data = req.params.data;
  // Publisher

  amqp(q, data);
  res.send("send :" + data);
}
function test(req, res, next) {
  // console.log('test ::', )
  return res.send({
    success: true,
    data: req.body
  })
}
module.exports = {
  test,
  que
};
