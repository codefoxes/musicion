const { BrowserWindow } = require('electron')
const url = require('url')
const path = require('path')
const Updater = require('./Updater')

let instance

class Windows {
	constructor (mainWindow) {
		if (instance !== undefined) return instance
		this.mainWindow = mainWindow
		this.subWindows = {}
		instance = this
	}

	createMainWindow () {
		// Create the browser window.
		this.mainWindow = new BrowserWindow({
			width: 1000,
			height: 700,
			webPreferences: {
				nodeIntegration: true,
				// Todo: Security Risk, Maybe use only for testing.
				webSecurity: false
			},
			// transparent:true,
			frame: false,
			vibrancy: 'selection',
			titleBarStyle: 'hidden'
		})

		const indexUrl = url.format({
			protocol: 'file',
			slashes: true,
			pathname: path.join(__dirname, '..', 'renderer', 'index.html')
		})

		this.mainWindow.loadURL(indexUrl)
		// this.mainWindow.loadURL('http://localhost:3000')

		// Open the DevTools.
		// this.mainWindow.webContents.openDevTools()

		this.mainWindow.on('closed', () => {
			this.mainWindow = null
		})

		// Run Auto Updater
		const autoUpdater = new Updater()
		autoUpdater.start()

		return this.mainWindow
	}

	createWindow (name, file, options) {
		if (!this.subWindows[name]) {
			this.subWindows[name] = new BrowserWindow(options)
			this.subWindows[name].on('closed', () => { this.subWindows[name] = null })
			this.subWindows[name].loadFile(`${file}`)
			this.subWindows[name].setMenu(null)
			// subWindows[name].checkUpdate = (open) => checkUpdate(open)
		}
	}
}

module.exports = Windows
