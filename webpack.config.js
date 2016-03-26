const PATHS = require('./CONSTANTS').PATHS;
const PLUGINS = require('./CONSTANTS').PLUGINS;
const path = require('path');

const config = {
	devtool: 'eval',
	entry: [
		'webpack-dev-server/client?http://localhost:3000',
		'webpack/hot/dev-server',
		PATHS.entry
	],
	output: {
		path: PATHS.output.path,
		filename: PATHS.output.filename,
		publicPath: PATHS.output.publicPath
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			include: path.join(__dirname, 'public/js/'),
			loader: 'babel',
			query: {
				presets: ['react', 'es2015', 'stage-0'],
				plugins: ['transform-runtime', 'transform-class-properties']
			}
		},
		{
			test: /\.css$/,
			loaders: ['style', 'css']
		}]
	},
	plugins: PLUGINS.dev,
	resolve: {
		// you can now require('file') instead of require('file.js')
		extensions: ['', '.js', '.jsx'] 
	}
};

module.exports = config;