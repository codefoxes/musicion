import fs from 'graceful-fs'
import { remote, ipcRenderer } from 'electron'

const userPath = remote.app.getPath('userData')
const fileName = 'musicion-config.json'
const playlistsFileName = 'musicion-playlists.json'

export default class BackendService {
	static sendMessage (channel, message) {
		ipcRenderer.send(channel, message)
	}

	static onMessage (channel, callback) {
		ipcRenderer.on(channel, (event, albums) => {
			callback(event, albums)
		})
	}

	static selectFolder (onSuccess) {
		const folders = remote.dialog.showOpenDialog({
			properties: ['openDirectory']
		})
		if (folders !== undefined) {
			onSuccess(folders)
		}
	}

	static createConfig () {
		const config = { library: { folders: [], albums: [] } }
		fs.writeFileSync(`${userPath}/${fileName}`, JSON.stringify(config, null, '\t'), 'utf8')
		return config
	}

	static getConfig () {
		// Todo: Maybe asynchronous
		try {
			const configContent = fs.readFileSync(`${userPath}/${fileName}`, 'utf8')
			return JSON.parse(configContent)
		} catch (err) {
			if (err.message.includes('no such file')) {
				// Config file does not exist. Create one.
				return BackendService.createConfig()
			} else {
				return {}
				// Reading config failed.
			}
		}
	}

	static saveConfig (configuration) {
		try {
			fs.writeFileSync(`${userPath}/${fileName}`, JSON.stringify(configuration, null, '\t'), 'utf8')
		} catch (err) {
			if (err.code === 'EACCES') {
				err.message = `${err.message}\nYou don't have access to this file.\n`
			}
			throw err
		}
	}

	static savePlaylistsSync (playlists) {
		try {
			fs.writeFileSync(`${userPath}/${playlistsFileName}`, JSON.stringify(playlists, null, '\t'), 'utf8')
		} catch (err) {
			if (err.code === 'EACCES') {
				err.message = `${err.message}\nYou don't have access to this file.\n`
			}
			throw err
		}
	}

	static savePlaylists (playlists) {
		return new Promise((resolve, reject) => {
			fs.writeFile(`${userPath}/${playlistsFileName}`, JSON.stringify(playlists, null, '\t'), 'utf8', (err) => {
				if (err) {
					reject(err)
				} else {
					resolve()
				}
			})
		})
	}

	static getPlaylists () {
		try {
			const configContent = fs.readFileSync(`${userPath}/${playlistsFileName}`, 'utf8')
			return JSON.parse(configContent)
		} catch (err) {
			const playlists = [{ name: 'Default', files: [] }]
			if (err.message.includes('no such file')) {
				// Playlists file does not exist. Create one.
				BackendService.savePlaylistsSync(playlists)
				return playlists
			}
			return playlists
		}
	}
}
