var Twitter = require('twitter');
var DDPush = require("dd-push-js");
var config = require("./config.json");
 
var client = new Twitter(config.twitter);

var push = DDPush(config["dd-bot"]);
push.append((new Date()).toISOString() + ",started");
 
client.stream('statuses/filter', {track: "raspberrypi, arduino"},  function(stream){
  stream.on('data', function(tweet) {
    console.log(tweet.text.replace(/\s+/g, " "));
    push.append((new Date()).toISOString() + ",@" + tweet.user.screen_name + ",\"" + tweet.text.replace(/\s+/g, " ") + "\"");
  });

  stream.on('error', function(error) {
    console.error(error);
  });
});