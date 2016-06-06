const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');
const compression = require('compression');

const isProduction = process.env.npm_lifecycle_event !== 'dev';
const PORT = process.env.OPENSHIFT_NODEJS_PORT || 8080;
const IP_ADDRESS = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

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
	app.all('/build/*', function (req, res) {
		proxy.web(req, res, {
			target : 'http://localhost:3000'
		});
	});

} else {
	console.log('Production');
}

// Any requests to localhost:8080/api/* is proxied
// to the lumen backend
app.all('/api/*', function (req, res) {
	
	console.log('Redirect to Lumen');
	
	proxy.web(req, res, {
		target : 'http://localhost/' + req.path
	});
});

// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling
proxy.on('error', function(e) {
	console.log('Could not connect to proxy, please try again...');
});

// send all requests to index.html so browserHistory in React Router works
app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, IP_ADDRESS, function () {
	console.log('Server running on port:' + PORT);
});