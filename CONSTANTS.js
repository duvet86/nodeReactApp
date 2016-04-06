const webpack = require('webpack');
const path = require('path');

const PATHS = {
  entry: path.join(__dirname, 'public/js/source.jsx'),
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
		new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1}),
		new webpack.DefinePlugin({
			'process.env': { 'NODE_ENV': JSON.stringify('production') }
		})
	],
	dev: [ new webpack.HotModuleReplacementPlugin() ]
};

module.exports = {
	PATHS: PATHS,
	PLUGINS: PLUGINS
};