var elasticsearch = require("elasticsearch");
var client = new elasticsearch.Client({
  host: "localhost:9200"
});

function bulk(_index_select, insert_data, callback){

    let data = []
    for (let index = 0; index < insert_data.length; index++) {
        const element = insert_data[index];    
        // batch.insert(element);
        data.push({ index:  { _index: _index_select, _type: 'default' } });
        data.push(element);
      }
  
    client.bulk({
        body: data
      }, function (err, resp) {
        callback('add');
      });

      
}

module.exports = {
    bulk
};
