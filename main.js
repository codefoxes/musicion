/* eslint global-require: 0, import/no-dynamic-require: 0, import/no-extraneous-dependencies: 0 */
const { app } = require('electron')
const fs = require('fs')
const path = require('path')

// THIS FILE DOES NOT SOFT UPDATE
// EDIT THIS FILE ONLY IF FACILITATING HARD UPDATE.

// Keep global reference to window object, else window will close when garbage collected
let mainWindow = null
let Initiator = () => {}

if (app.isPackaged) {
	const appPath = app.getPath('userData')
	const versionFile = path.join(appPath, 'musicion_sources', 'current_version.txt')
	let currentVersion = app.getVersion()
	try {
		currentVersion = fs.readFileSync(versionFile, 'utf-8').trim()
	} catch (err) { /* We already know currentVersion */ }
	const pathSafeVersion = currentVersion.split('.').join('_')
	const targetPath = path.join(appPath, 'musicion_sources', 'versions', pathSafeVersion, 'electron', 'main', 'Initiator.js')
	if (fs.existsSync(targetPath)) {
		Initiator = require(targetPath)
	} else {
		Initiator = require('./electron/main/Initiator')
	}
} else {
	Initiator = require('./electron/main/Initiator')

	try {
		require('electron-reload')(__dirname, {
			electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
			hardResetMethod: 'exit'
		})
	} catch (err) { /* electron-reload unavailable */ }
}

Initiator.startApp(mainWindow).then((win) => {
	mainWindow = win
})
