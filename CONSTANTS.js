const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
	entry: path.join(__dirname, 'public/js/source'),
	output: {
		path: path.join(__dirname, 'public/js/build'),
		filename: 'bundle.js',
		publicPath: '/js/build/'
	}
};

const PLUGINS = {
	prod: [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.DefinePlugin({
			'process.env': { 'NODE_ENV': JSON.stringify('production') }
		}),
		new ExtractTextPlugin('bundle.css')
	],
	dev: [
		new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('bundle.css')
	]
};

module.exports = {
	PATHS: PATHS,
	PLUGINS: PLUGINS
};