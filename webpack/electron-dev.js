const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const common = require('../webpack.config.js')

module.exports = merge(common, {
	mode: 'development',
	resolve: {
		alias: {
			backend: path.resolve(__dirname, '../src/renderer/services/backend/Electron.js')
		}
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		hot: true,
		port: 3000,
		overlay: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	target: 'electron-renderer'
})
