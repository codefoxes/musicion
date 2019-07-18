/* eslint func-names: 0 */
const path = require('path')
const fs = require('fs')
const util = require('util')

function Logger (logFilePath = '', stdout = false) {
	this.write = text => process.stdout.write(text)
	this.logLevelIndex = 3

	if (logFilePath !== '') {
		const normalizedPath = path.normalize(logFilePath)
		// Todo: Handle Max lines.
		this.stream = fs.createWriteStream(normalizedPath, { flags: 'a', encoding: 'utf8', mode: 0o666 })
		this.write = (text) => {
			this.stream.write(text)
			if (stdout) process.stdout.write(text)
		}
	}
}

Logger.levels = ['fatal', 'error', 'warn', 'info', 'debug']

Logger.prototype.format = (level, date, message) => [level, ' [', date, '] ', message].join('')

Logger.prototype.setLevel = (newLevel) => {
	const index = Logger.levels.indexOf(newLevel)
	if (index !== -1) {
		this.logLevelIndex = index
		return index
	}
	return false
}

Logger.prototype.log = function (...args) {
	let logIndex = Logger.levels.indexOf(args[0])
	let message = ''

	if (logIndex === -1) {
		logIndex = this.logLevelIndex
		if (logIndex === 9) this.setLevel('info') // Dummy
	} else {
		args.shift()
	}
	if (logIndex <= this.logLevelIndex) {
		args.forEach((arg) => {
			if (typeof arg === 'string') {
				message += ` ${arg}`
			} else {
				message += ` ${util.inspect(arg, false, null)}`
			}
		})
		message = this.format(Logger.levels[logIndex], new Date(), message)
		this.write(`${message}\n`)
		return message
	}
	return false
}

Logger.levels.forEach((level) => {
	Logger.prototype[level] = function (...args) {
		args.unshift(level)
		return this.log(...args)
	}
})

let mainLogger = null
function startMainLog (logFilePath = '', stdout = false) {
	const mainLogFile = (logFilePath === '') ? 'app.log' : logFilePath
	mainLogger = new Logger(mainLogFile, stdout)
	return mainLogger
}

exports.Logger = Logger
exports.createLogger = (logFilePath, stdout) => new Logger(logFilePath, stdout)
exports.startMainLog = startMainLog
exports.mainLogger = mainLogger
