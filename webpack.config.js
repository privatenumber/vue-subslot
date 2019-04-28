const path = require('path');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
	mode: isProd ? 'production' : 'development',

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
