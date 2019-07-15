module.exports = {
	moduleDirectories: [
		'node_modules',
		'src/node_modules'
	],
	modulePathIgnorePatterns: [
		'dist',
		'build',
		'build_scripts',
		'phonegap',
		'node_modules'
	],
	moduleNameMapper: {
		'renderer(.*)$': '<rootDir>/src/renderer/$1',
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/tests/__mocks__/fileMock.js',
		'\\.(css|scss)$': '<rootDir>/tests/__mocks__/styleMock.js'
	},
	rootDir: '../',
	transform: {
		'^.+\\.(js|jsx)?$': '<rootDir>/tests/transformer.js'
	},
	collectCoverageFrom: [
		'**/*.{js,jsx}',
		'src/renderer/**/*.js',
		'!**/node_modules/**',
		'!**/vendor/**',
		'!**/tests/**',
		'!**/electron/**',
		'!**/phonegap/**',
		'!**/dist/**',
		'!**/build**',
		'!**/webpack/**'
	],
	coverageDirectory: 'dist/coverage'
}
