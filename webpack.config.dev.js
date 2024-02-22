const path = require('path')
const webpack = require('webpack')

module.exports = {
	mode: 'development',
	extends: path.resolve(__dirname, './webpack.config.base.js'),
	devtool: 'inline-source-map',
	devServer: {
		overlay: true,
	},
	plugins: [
		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: path.join(__dirname, 'build', 'vendor-manifest.json'),
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				exclude: /\.module\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							url: true,
							import: true,
							modules: false,
						},
					},
					'postcss-loader',
				],
			},
			{
				test: /\.sass|scss$/,
				exclude: /\.module\.(sass|scss)$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							url: true,
							import: true,
							modules: false,
						},
					},
					'postcss-loader',
					'resolve-url-loader',
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
		],
	},
}
