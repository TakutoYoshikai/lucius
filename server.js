let express = require("express");
let app = express();
let fs = require("fs");
function stop() {
	fs.writeFileSync("state.txt", "stop", {
		encoding: "utf-8"
	});
}

function start() {
	fs.writeFileSync("state.txt", "start", {
		encoding: "utf-8"
	});
}

app.get("/stop", function(req, res) {
	stop();
});

app.get("/start", function(req, res) {
	start();
});

app.listen(3000);
stop();
