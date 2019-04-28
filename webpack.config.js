const path = require('path');

module.exports = {
	mode: 'production',

	context: path.resolve('src'),

	entry: {
		'Subslot': './Subslot',
	},

	output: {
		filename: '[name].js',
		path: path.resolve('dist'),
		publicPath: '/',
		libraryTarget: 'umd',
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
		],
	},
};
