const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
  entry: path.join(__dirname, 'public/js/source'),
  output: {
		path: path.join(__dirname, 'public/build'),
		filename: 'bundle.js',
		publicPath: '/build/'
  }
};

const PLUGINS = {
	prod: [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.DefinePlugin({
			'process.env': { 'NODE_ENV': JSON.stringify('production') },
			'APP_ID': JSON.stringify("1651933625025985"),
		}),
		new ExtractTextPlugin('bundle.css')
	],
	dev: [
	    new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
        	'APP_ID': JSON.stringify("1758294917723188")
        }),
        new ExtractTextPlugin('bundle.css', {
            allChunks: true
        })
	]
};

module.exports = {
	PATHS: PATHS,
	PLUGINS: PLUGINS
};