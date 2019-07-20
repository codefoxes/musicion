const path = require('path')
const merge = require('webpack-merge')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const common = require('../webpack.config.js')

module.exports = merge(common, {
	mode: 'production',
	optimization: {
		minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
	},
	resolve: {
		alias: {
			backend: path.resolve(__dirname, '../src/renderer/services/backend/Electron.js')
		}
	},
	output: {
		path: `${__dirname}/../electron/renderer`,
		filename: 'bundle.js'
	},
	target: 'electron-renderer'
})
