const { app, ipcMain } = require('electron')
const Windows = require('./src/main/Windows')
const MessageHandler = require('./src/main/MessageHandler')

const windowsManager = new Windows()

app.on('ready', () => {
	windowsManager.createMainWindow()
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (windowsManager.mainWindow === null) {
		windowsManager.createMainWindow()
	}
})

const messages = new MessageHandler()
messages.registerIpcListeners()

ipcMain.on('reload-window', () => mainWindow.reload())

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
