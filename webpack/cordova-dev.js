const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const common = require('../webpack.config.js')

module.exports = merge(common, {
	mode: 'development',
	resolve: {
		alias: {
			backend: path.resolve(__dirname, '../src/renderer/services/backend/Browser.js')
		}
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './phonegap/www',
		hot: true,
		port: 8080,
		overlay: true,
		writeToDisk: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: 'src/cordova/index.html'
		})
	],
	output: {
		path: `${__dirname}/../phonegap/www`,
		// publicPath: '/',
		filename: 'bundle.js'
	}
})
