const PATHS = require('./CONSTANTS').PATHS;
const PLUGINS = require('./CONSTANTS').PLUGINS;

const config = {
	entry: [
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
	plugins: PLUGINS.prod,
	resolve: {
		// you can now require('file') instead of require('file.js')
		extensions: ['', '.js', '.jsx']
	}
};

module.exports = config;