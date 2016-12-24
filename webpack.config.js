const path = require('path');
const $ = require('jquery');

module.exports = {
	entry: {
			js: path.join(__dirname, './server/client.js'),
		},
	resolveLoader: { root: path.join(__dirname, 'node_modules') },
	resolve: {
			root: path.join(__dirname, 'server'),
			modulesDirectories: ['node_modules'],
			extensions: ['', '.js', '.json']
		},
	output: {
			path: path.join(__dirname, 'static'),
			filename: 'bundle.js'
		},
	node: {
			child_process: 'empty',
			fs:  'empty',
			dns: 'empty',
			net: 'empty',
			tls: 'empty'
		},
	module: {
			exprContextRegExp: /$^/,
			exprContextCritical: false,
			loaders: [
						{ test: /\.js$/, loader: 'babel-loader' },
						{ test: /\.json$/, loader: 'json-loader' }
					]
		}
};
