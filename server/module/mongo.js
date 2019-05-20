const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
require("dotenv").config();
const _ = require("lodash");
const { MONGO_HOST } = require("../constants/server");

// Connection URL
const url = MONGO_HOST;
const dbName = "twitter";

const opts = {
  useNewUrlParser: true
};
// Create a new MongoClient
const client = new MongoClient(url, opts);

function insertData(collection_select, insert_data, callback) {
  // Use connect method to connect to the Server
  client.connect(function(err) {
    assert.equal(null, err);
    // console.log("Connected successfully to server");

    const db = client.db(dbName);

    // Get the documents collection
    const collection = db.collection(collection_select);

    // Insert some documents
    collection.insertOne(insert_data, function(err, result) {
      assert.equal(null, err);
      assert.equal(1, result.insertedCount);
    });
  });
  callback();
}
function bulk(collection_select, insert_data, callback) {
  // Use connect method to connect to the Server
  client.connect(function(err) {
    assert.equal(null, err);
    // console.log("Connected successfully to server");

    const db = client.db(dbName);

    // Get the documents collection
    const collection = db.collection(collection_select);

    var batch = collection.initializeOrderedBulkOp();
    
    for (let index = 0; index < insert_data.length; index++) {
      const element = insert_data[index];    
      batch.insert(element);
    }

    batch.execute(function(err, result) {
      // console.dir(err);
      callback(err);
    });
  });
  
}
module.exports = {
  insertData,
  bulk
};
