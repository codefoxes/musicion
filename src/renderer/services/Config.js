import fs from 'graceful-fs'
import { remote } from 'electron'

const userPath = remote.app.getPath('userData')
const fileName = 'musicion-config.json'

let configuration

export default class Config {
	static get all () {
		return configuration
	}

	static createConfig () {
		const config = { library: { folders: [], albums: [] } }
		try {
			fs.writeFileSync(`${userPath}/${fileName}`, JSON.stringify(config, null, '\t'), 'utf8')
		} catch (err) {
			if (err.code === 'EACCES') {
				err.message = `${err.message}\nYou don't have access to this file.\n`
			}
			throw err
		}
	}

	static loadConfig () {
		// Todo: Maybe asynchronous
		try {
			const configContent = fs.readFileSync(`${userPath}/${fileName}`, 'utf8')
			configuration = JSON.parse(configContent)
		} catch (err) {
			if (err.message.includes('no such file')) {
				// Config file does not exist. Create one.
				Config.createConfig()
			} else {
				// Reading config failed.
			}
		}
	}

	static addFoldersToLibrary (folders) {
		// Todo: Don't simply concat. Only add if does not exist.
		configuration.library.folders = configuration.library.folders.concat(folders)
		try {
			fs.writeFileSync(`${userPath}/${fileName}`, JSON.stringify(configuration, null, '\t'), 'utf8')
		} catch (err) {
			if (err.code === 'EACCES') {
				err.message = `${err.message}\nYou don't have access to this file.\n`
			}
			throw err
		}
		return configuration.library
	}

	static addAlbumsToLibrary (albums) {
		// Todo: Don't simply concat. Only add if does not exist.
		configuration.library.albums = configuration.library.albums.concat(albums)
		try {
			fs.writeFileSync(`${userPath}/${fileName}`, JSON.stringify(configuration, null, '\t'), 'utf8')
		} catch (err) {
			if (err.code === 'EACCES') {
				err.message = `${err.message}\nYou don't have access to this file.\n`
			}
			throw err
		}
		return configuration.library
	}
}
