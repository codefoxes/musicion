// Todo: Use same babel.config.js for different envs.
module.exports = {
	env: {
		test: {
			presets: [
				[
					'@babel/preset-env',
					{
						modules: 'commonjs',
						debug: false
					}
				],
				'@babel/preset-react'
			],
			plugins: [
				'@babel/plugin-proposal-class-properties'
			]
		}
	}
}
