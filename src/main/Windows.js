const { BrowserWindow } = require('electron')

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
				nodeIntegration: true
			},
			// transparent:true,
			frame: false
		})

		// this.mainWindow.loadFile('dist/index.html')
		this.mainWindow.loadURL('http://localhost:3000')

		// Open the DevTools.
		this.mainWindow.webContents.openDevTools()

		this.mainWindow.on('closed', () => {
			this.mainWindow = null
		})

		// Todo: Better way to do this?
		mainWindow = this.mainWindow
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
