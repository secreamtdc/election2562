var amqp = require("amqplib");
const { bulk } = require("./module/search");
const sentiments = require("./module/sentiment");
const { AMQP_HOST } = require("./constants/server");

let arr = [];
amqp
  .connect(AMQP_HOST)
  .then(function(conn) {
    process.once("SIGINT", function() {
      conn.close();
    });
    return conn.createChannel().then(function(ch) {
      var ok = ch.assertQueue("tasks", { durable: true });

      ok = ok.then(function(_qok) {
        return ch.consume(
          "tasks",
          function(msg) {
            let data = { data: JSON.parse(msg.content) };
            let sentiment = 0;
            if (data.data.retweeted_status != undefined) {
              sentiment = sentiments.calc(data.data.retweeted_status.text);
            } else {
              sentiment = sentiments.calc(data.data.text);
            }
            data.sentiment = sentiment;

            if (arr.length != 100) {
              arr.push(data);
            } else {
              bulk("elect62", arr, function(data) {
                arr = [];
                console.log(data);
              });

            }
          },
          { noAck: true }
        );
      });
      return ok.then(function(_consumeOk) {
        console.log(" [*] Waiting for messages. To exit press CTRL+C");
      });
    });
  })
  .catch(console.warn);
