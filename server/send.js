require("dotenv").config();
const { PORT, AMQP_HOST } = require("./constants/server");

var amqp = require("amqplib");

const Twitter = require("twitter");

const twClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
const stream = twClient.stream("statuses/filter", {
  track:
    "เลือกตั้ง,พรรค,พรรค เลือก,หัวหน้าพรรค,ลุงตุ่,ฟ้ารักพ่อ,ธนาธร,อนาคตใหม่,อ.น.ค.,อนค,พ่อของฟ้า,ประชาธิปัตย์,อภิสิทธิ์ เวชชาชีวะ,ปชป,พลังท้องถิ่นไท,พรรคความหวังใหม่,เพื่อไทย,พท,ชาติพัฒนา,ชาติไทยพัฒนา,ภูมิใจไทย,ไทยรักษาชาติ,ประชาธิปไตยใหม่,พลังปวงชนไทย,พลังประชารัฐ,พปชร,คุณหญิงสุดารัตน์,เสรีรวมไทย,ประชาชาติ,เศรษฐกิจใหม่,พรรคเพื่อชาติ,พรรครวมพลังประชาชาติไทย"
});

const q = "tasks";


//Twiiter API

stream.on("data", function(event) {
  let obj = { user: {}, entities: {} };
  obj.user.name = event.user.name;
  obj.user.screen_name = event.user.screen_name;

  if (event.extended_tweet == undefined) {
    obj.text = event.text;
    obj.entities.hashtags = event.entities.hashtags;
  } else {
    obj.text = event.extended_tweet.full_text;
    obj.entities.hashtags = event.extended_tweet.entities.hashtags;
  }

  if (event.retweeted_status != undefined) {
    
    if(event.retweeted_status.extended_tweet != undefined){
      obj.retweeted_status = {entities:{}};
      obj.retweeted_status.text= event.retweeted_status.extended_tweet.full_text
      obj.retweeted_status.entities.hashtags = event.retweeted_status.extended_tweet.entities.hashtags;
    }else{
      obj.retweeted_status = event.retweeted_status;
    }
  }

  let data = JSON.stringify(obj);

  console.log(" [x] Sent '%s'", obj.text);

  amqp
    .connect(AMQP_HOST)
    .then(function(conn) {
      return conn
        .createChannel()
        .then(function(ch) {

          var ok = ch.assertQueue(q, { durable: true });

          return ok.then(function(_qok) {
            // NB: `sentToQueue` and `publish` both return a boolean
            // indicating whether it's OK to send again straight away, or
            // (when `false`) that you should wait for the event `'drain'`
            // to fire before writing again. We're just doing the one write,
            // so we'll ignore it.
            ch.sendToQueue(q, Buffer.from(data));


            return ch.close();
          });
        })
        .finally(function() {
          conn.close();
        });
    })
    .catch(console.warn);
});

stream.on("error", function(error) {
  throw error;
});