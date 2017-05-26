let SlackBots = require("slackbots");
let twitter = require("twitter");
let fs = require("fs");
let slackInfo, twitterInfo;
let client;
let ignoreList = [];
let bot;
let lastTweetId;

let name = "吉開";
let slackName = "takuto.yoshikai";

function readSlackJSON() {
	slackInfo = JSON.parse(fs.readFileSync("./slack.json", {
		encoding: "utf-8"
	}));
}

function readTwitterJSON() {
	twitterInfo = JSON.parse(fs.readFileSync("./twitter.json", {
		encoding: "utf-8"
	}));
}

function readIgnoreList() {
	ignoreList = fs.readFileSync("ignore.txt", {
		encoding: "utf-8"
	}).split("\n");
	ignoreList.pop();
}

function readLastTweetId() {
	lastTweetId = parseInt(fs.readFileSync("last_tweet_id.txt", {
		encoding: "utf-8"
	}));
}

function initTwitter() {
	readTwitterJSON();
	client = new twitter(twitterInfo);
}

function initSlack() {
	readSlackJSON();
	bot = new SlackBots(slackInfo);
	bot.on("start", function() {
		console.log("slack started");
	});
}


function init() {
	initSlack();
	initTwitter();
	readIgnoreList();
	readLastTweetId();
}


function sendTweetsToSlack(tweets) {
	bot.postMessageToUser(slackName, "我が君、" + name + "の名を口にした者が" + tweets.length + "人おりました");
	setTimeout(function(){
		tweets.forEach(function(tweet){
			bot.postMessageToUser(slackName, tweet);
		});
	}, 3000);
}

function saveLastTweetId(id){
	fs.writeFileSync("last_tweet_id.txt", id.toString());
}

function start() {
	client.get("search/tweets",
			{
				q: name
			},
			function (error, tweets, response) {
				var targets = tweets.statuses.filter(function(tweet){
					if (tweet.user.name.indexOf(name) != -1){
						return false;
					}
					if (tweet.id <= lastTweetId){
						return false;
					}
					var result = true;
					ignoreList.forEach(function(ignoreWord){
						if (tweet.text.indexOf(ignoreWord) != -1){
							result = false;
						}
					});
					return result;
				});
				if (targets.length != 0) {
					saveLastTweetId(targets[0].id);
					sendTweetsToSlack(targets.map(function(tweet){
						return tweet.text;
					}));
				}
			}
	);
}

init();
start();
setTimeout(function(){
	process.exit();
}, 10 * 1000);
