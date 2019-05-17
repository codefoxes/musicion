const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

const isHot = path.basename(require.main.filename) === 'webpack-dev-server.js'

module.exports = {
	entry: './src/index.js',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.(html)$/,
				use: ['html-loader']
			},
			{
				test: /\.(css|scss)$/,
				use: [
					'css-hot-loader',
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(ttf|eot|woff|woff2|svg)$/,
				loader: 'url-loader'
			}
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx']
	},
	output: {
		path: `${__dirname}/dist`,
		publicPath: '/',
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}),
		new MiniCssExtractPlugin({
			filename: isHot ? 'css/[name].css' : 'css/[name].[contenthash].css',
			chunkFilename: 'css/[id].css'
		})
	],
	devServer: {
		contentBase: './dist',
		hot: true,
		port: 3000,
		open: true,
		overlay: true
	}
}
