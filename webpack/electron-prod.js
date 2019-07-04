const merge = require('webpack-merge')
const path = require('path')
const common = require('../webpack.config.js')

module.exports = merge(common, {
	mode: 'production',
	resolve: {
		alias: {
			backend: path.resolve(__dirname, '../src/renderer/services/backend/Electron.js')
		}
	},
	target: 'electron-renderer'
})
