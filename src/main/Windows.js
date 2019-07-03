const { BrowserWindow } = require('electron')
const Updater = require('./Updater')

// Keep global reference to window object, else window will close when garbage collected
// Todo: Usually reference in main.js. Does this work here?
let mainWindow

class Windows {
	constructor () {
		this.mainWindow = mainWindow
		this.subWindows = {}
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

		this.mainWindow.loadFile('dist/index.html')
		// this.mainWindow.loadURL('http://localhost:3000')

		// Open the DevTools.
		// this.mainWindow.webContents.openDevTools()

		this.mainWindow.on('closed', () => {
			this.mainWindow = null
		})

		// Todo: Better way to do this?
		mainWindow = this.mainWindow

		// Run Auto Updater
		const autoUpdater = new Updater()
		autoUpdater.start()
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
