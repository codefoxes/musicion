const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

const isHot = path.basename(require.main.filename) === 'webpack-dev-server.js' || process.argv.includes('--watch')
const ver = require('./package.json').version

module.exports = {
	entry: './src/renderer/index.js',
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
				test: /\.(ttf|eot|woff|woff2)$/,
				loader: 'url-loader'
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'images'
				}
			}
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx']
	},
	output: {
		path: `${__dirname}/renderer`,
		// publicPath: '/',
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: 'src/renderer/index.html'
		}),
		new MiniCssExtractPlugin({
			filename: isHot ? 'css/[name].css' : `css/[name].${ver}.css`,
			chunkFilename: 'css/[id].css'
		})
	]
}
