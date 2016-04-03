const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');
const compression = require('compression');

console.log("npm_lifecycle_event", process.env.npm_lifecycle_event);

const isProduction = process.env.npm_lifecycle_event === 'start:prod';
const PORT = 8080;

console.log('isProduction', isProduction);

const proxy = httpProxy.createProxyServer();
const app = express();
app.use(compression());

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

if (!isProduction) {

	console.log('Development');

	// We require the bundler inside the if block because
	// it is only needed in a development environment. Later
	// you will see why this is a good idea
	const bundler = require('./dev.bundler.js');
	bundler();

	// Any requests to localhost:8080/js/build is proxied
	// to webpack-dev-server
	app.all('/js/build/*', function (req, res) {
		
		console.log('Redirect');
		
		proxy.web(req, res, {
			target : 'http://localhost:3000'
		});
	});

} else {
	console.log('Production');
}

// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling
proxy.on('error', function(e) {
	console.log('Could not connect to proxy, please try again...');
});

// send all requests to index.html so browserHistory in React Router works
app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.listen(PORT, function () {
	console.log('Server running on port:' + PORT)
});