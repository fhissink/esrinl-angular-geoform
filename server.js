//"use strict";

//const
//	http = require("http"),
//	httpHelper = require("./http-helper"),
//	options = JSON.parse(require("fs").readFileSync("config.json")),
//	app = httpHelper(options.webServer);

////app.use("/api", require("./widget-api-routes"));

//http.createServer(app).listen(options.webServer.port, function(err) {

//	if (err) {
//		console.log(err.message);
//		return;
//	}

//	console.log(`web server started on port ${options.webServer.port}`);

//});

"use strict"

var connect = require('connect');
var compiler = require('connect-compiler');
var statc = require('serve-static');

var server = connect();

server.use(
  compiler({
      enabled: ['coffee', 'uglify'],
      src: 'src',
      dest: 'public'
  })
);

server.use(statc(__dirname + '/public'));

server.listen(3000);

livereload = require('livereload');
server = livereload.createServer();
server.watch(__dirname + "/public");