const { app, BrowserWindow } = require('electron')
const url = require('url')
const path = require('path')

require('./library/Menu')

let instance

class Windows {
	constructor (mainWindow) {
		if (instance !== undefined) return instance
		this.mainWindow = mainWindow
		this.subWindows = {}
		instance = this
	}

	createMainWindow () {
		const options = {
			width: 1000,
			height: 700,
			webPreferences: {
				nodeIntegration: true,
				// Todo: Security Risk, Maybe use only for testing.
				webSecurity: false
			},
			frame: false,
			vibrancy: 'selection',
			titleBarStyle: 'hidden',
			webviewTag: true
		}

		if (app.isPackaged) {
			options.devTools = false
		}

		// Create the browser window.
		this.mainWindow = new BrowserWindow(options)

		const indexUrl = url.format({
			protocol: 'file',
			slashes: true,
			pathname: path.join(__dirname, '..', 'renderer', 'index.html')
		})

		if (app.isPackaged) {
			this.mainWindow.loadURL(indexUrl)
		} else {
			this.mainWindow.loadURL('http://localhost:3000')
		}

		this.mainWindow.on('closed', () => {
			this.mainWindow = null
		})

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
