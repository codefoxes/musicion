module.exports = {
	moduleDirectories: [
		'node_modules',
		'src/node_modules'
	],
	modulePathIgnorePatterns: [
		'<rootDir>/dist',
		'<rootDir>/build',
		'<rootDir>/build_scripts',
		'<rootDir>/phonegap',
		'<rootDir>/node_modules'
	],
	moduleNameMapper: {
		'^renderer(.*)$': '<rootDir>/src/renderer/$1',
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/tests/__mocks__/fileMock.js',
		'\\.(css|scss)$': '<rootDir>/tests/__mocks__/styleMock.js'
	},
	rootDir: '../',
	transform: {
		'^.+\\.(js|jsx)?$': '<rootDir>/tests/transformer.js'
	},
	setupFilesAfterEnv: ['<rootDir>/tests/enzyme.setup.js'],
	collectCoverageFrom: [
		'**/*.{js,jsx}',
		'src/renderer/**/*.js',
		'!**/node_modules/**',
		'!**/vendor/**',
		'!**/tests/**',
		'!**/coverage/**',
		'!**/electron/**',
		'!**/phonegap/**',
		'!**/dist/**',
		'!**/build**',
		'!**/webpack**',
		'!**/webpack/**'
	],
	coverageDirectory: 'coverage'
}
