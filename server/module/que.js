const open = require("amqplib").connect(process.env.AMQP);

function que(q,data,callback) {
    // Publisher
    open
      .then(function(conn) {
        return conn.createChannel();
      })
      .then(function(ch) {
        return ch.assertQueue(q).then(function(ok) {
          return ch.sendToQueue(q, Buffer.from(data));
        });
      })
      .catch(console.warn);
      
      callback(data);

  }

  module.exports = {
    que
  };
  