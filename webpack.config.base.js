const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/index.js',
	output: {
		filename: '[name].[contenthash].bundle.js',
		path: path.resolve(__dirname, './dist'),
		chunkFilename: '[name].[contenthash].chunk.js',
		clean: true,
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'build'),
		port: 3000,
	},
	optimization: {
		runtimeChunk: 'single',
		moduleIds: 'deterministic',
		splitChunks: {
			chunks: 'all',
			hidePathInfo: true,
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
	},
	module: {
		rules: [
            {
				test: /\.(svg|png|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i,
				type: 'asset',
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
						configFile: path.resolve(__dirname, 'babel.config.js'),
					},
				},
			}
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './template/index.html'),
		}),
	],
	resolve: {
		alias: {
			'@Utils': path.resolve(__dirname, 'src/utils'),
			'@Css': path.resolve(__dirname, 'src/styles/css'),
			'@Scss': path.resolve(__dirname, 'src/styles/scss'),
			'@Images': path.resolve(__dirname, 'src/assets/img'),
			'@Svg': path.resolve(__dirname, 'src/assets/svg'),
		},
		extensions: [
			'.css',
			'.js',
			'.svg',
			'.png',
			'.jpg',
			'.jpeg',
			'.gif',
			'.sass',
			'.scss',
			'...',
		],
	},
}
