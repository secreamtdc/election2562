var elasticsearch = require("elasticsearch");
var client = new elasticsearch.Client({
  host: "localhost:9200"
});
let dataset = {
  อนาคตใหม่: ["อนาคตใหม่", "ฟ้ารักพ่อ", "พ่อของฟ้า", "ธนาธร", "อ.น.ค", "อนค"],
  เพื่อไทย: ["เพื่อไทย", "พท", "คุณหญิงสุดารัตน์"],
  ประชาธิปัตย์: ["ประชาธิปัตย์", "อภิสิทธิ์ เวชชาชีวะ", "ปชป"],
  พลังประชารัฐ: ["ลุงตุ่", "พลังประชารัฐ", "พปชร"],
  พรรคภูมิใจไทย: ["ภูมิใจไทย"],
  ชาติไทยพัฒนา: ["ชาติไทยพัฒนา"],
  ชาติพัฒนา: ["ชาติพัฒนา"],
  ประชาชาติ: ["ประชาชาติ"],
  เสรีรวมไทย: ["เสรีรวมไทย"],
  เศรษฐกิจใหม่: ["เศรษฐกิจใหม่"],
  เพื่อชาติ: ["เพื่อชาติ"],
  รวมพลังประชาชาติไทย: ["รวมพลังประชาชาติไทย"],
  พลังท้องถิ่นไท: ["พลังท้องถิ่นไท"],
  ไทยรักษาชาติ: ["ไทยรักษาชาติ"]
};

async function mount(req, res) {
  // console.log(req.body.dataset);
  let datasetQuality = [];
  const query = async dataq => {
    try {
      const response = await client.search({
        index: req.params.index,
        body: {
          query: {
            terms: {
              "data.text": dataq
            }
          }
        }
      });
      return response.hits.total;
    } catch (error) {
      console.trace(error.message);
    }
  };
  for (let key in dataset) {
    if (dataset.hasOwnProperty(key)) {
      let response = {};
      response.name = key;
      response.value = await query(dataset[key]);
      datasetQuality.push(response);
    }
  }
  return res.json({
    success: true,
    data: datasetQuality
  });
}
function input(req, res) {
  client.bulk(
    {
      body: [
        // action description
        { index: { _index: "elect62", _type: "default" } },
        // the document to index
        {
          data: {
            user: {
              name: "วิ้งขึ",
              screen_name: "PvPmVU6OZ3ItTlR"
            },
            entities: {
              hashtags: []
            },
            text: "จึ๊กป้ะคะเนชั่น"
          },
          sentiment: 0
        }
      ]
    },
    function(err, resp) {
      res.json(resp);
    }
  );
}

async function sentiment(req, res) {
  let datasetQuality = [];
  const query = async dataq => {
    try {
      const response = await client.search({
        index: req.params.index,
        body: {
          query: {
            terms: {
              "data.text": dataq
            }
          },
          aggs: {
            count_eiei: {
              sum: {
                field: "sentiment"
              }
            }
          }
        }
      });
      return response.aggregations.count_eiei.value;
    } catch (error) {
      console.trace(error.message);
    }
  };
  for (let key in dataset) {
    if (dataset.hasOwnProperty(key)) {
      let response = {};
      response.name = key;
      response.value = await query(dataset[key]);
      datasetQuality.push(response);
    }
  }
  return res.json({
    success: true,
    data: datasetQuality
  });
}
async function eachNegative(req, res) {
  let datasetQuality = [];
  const query = async dataq => {
    try {
      const response = await client.search({
        index: req.params.index,
        body: {
          "query": {
            "bool" : {
              "must": {
                    "terms": {
                  "data.text": dataq
                }
              },
              "filter": {
                "range" : {
                    "sentiment" : {
                        "gte" : -100,
                        "lte" : -1
                    }
                }
              }
            }
          }
        }
      });
      return response.hits.total;
    } catch (error) {
      console.trace(error.message);
    }
  };
  for (let key in dataset) {
    if (dataset.hasOwnProperty(key)) {
      let response = {};
      response.name = key;
      response.values = await query(dataset[key]);
      datasetQuality.push(response);
    }
  }
  return res.json({
    success: true,
    data: datasetQuality
  });
}
async function eachPlus(req, res) {
  let datasetQuality = [];
  const query = async dataq => {
    try {
      const response = await client.search({
        index: req.params.index,
        body: {
          "query": {
            "bool" : {
              "must": {
                    "terms": {
                  "data.text": dataq
                }
              },
              "filter": {
                "range" : {
                    "sentiment" : {
                        "gte" : 0,
                        "lte" : 100
                    }
                }
              }
            }
          }
        }
      });
      console.log("response.hits.total",response.hits.total);
      
      return response.hits.total;
    } catch (error) {
      console.trace(error.message);
    }
  };
  for (let key in dataset) {
    if (dataset.hasOwnProperty(key)) {
      let response = {};
      response.name = key;
      response.values = await query(dataset[key]);
      datasetQuality.push(response);
    }
  }
  return res.json({
    success: true,
    data: datasetQuality
  });
}

module.exports = {
  mount,
  input,
  sentiment,
  eachPlus,
  eachNegative
};
