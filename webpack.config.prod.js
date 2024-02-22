const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const webpack = require('webpack')

const path = require('path')

module.exports = {
	mode: 'production',
	extends: path.resolve(__dirname, './webpack.config.base.js'),
	devServer: {
		compress: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				exclude: /\.module\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
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
				test: /\.(sass|scss)$/,
				exclude: /\.module\.(sass|scss)$/,
				use: [
					MiniCssExtractPlugin.loader,
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
	plugins: [
		new MiniCssExtractPlugin({
				filename: '[name].[contenthash].bundle.css',
				chunkFilename: '[name].[contenthash].chunk.css',
			}),
	],
	optimization: {
		usedExports: true,
		minimize: true,
		minimizer: [
			new TerserPlugin({
				extractComments: false,
			}),
			new CssMinimizerPlugin(),
			new CompressionPlugin(),
			new webpack.ids.HashedModuleIdsPlugin(),
		],
	},
}
