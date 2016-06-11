const ExtractTextPlugin = require('extract-text-webpack-plugin');

const path = require('path');

const PATHS = require('./CONSTANTS').PATHS;
const PLUGINS = require('./CONSTANTS').PLUGINS;

const config = {
	entry: {
		common: 'babel-polyfill',
		app: PATHS.entry
	},
	output: {
		path: PATHS.output.path,
		filename: PATHS.output.filename,
		publicPath: PATHS.output.publicPath
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				presets: ['react', 'es2015', 'stage-0'],
				plugins: ['transform-runtime', 'transform-class-properties']
			}
		},
		{
			test: /\.css$/,
			include: path.join(__dirname, 'public/css/'),
			loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
		}]
	},
	plugins: PLUGINS.prod,
	resolve: {
		// you can now require('file') instead of require('file.js')
		extensions: ['', '.js', '.jsx', '.css']
	}
};

module.exports = config;