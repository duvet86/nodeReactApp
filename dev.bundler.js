var Webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

module.exports = function () {

	var bundleStart = null;
	var compiler = new Webpack(config);

	// We give notice in the terminal when it starts bundling and
	// set the time it started
	compiler.plugin('compile', function () {
		console.log('Bundling...');
		bundleStart = Date.now();
	});

	// We also give notice when it is done compiling, including the
	// time it took. Nice to have
	compiler.plugin('done', function () {
		console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
	});

	var bundler = new WebpackDevServer(compiler, {
		publicPath : config.output.publicPath,
		hot : true,
		historyApiFallback : true,
		// The rest is terminal configurations
		quiet : false,
		noInfo : true,
		stats : {
			colors : true
		}
	});

	bundler.listen(3000, 'localhost', function (err, result) {
		if (err) {
			return console.log(err);
		}
		console.log('Bundling project, please wait...');
	});
};