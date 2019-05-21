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
		configuration.library.folders = configuration.library.folders.concat(
			folders.filter(item => configuration.library.folders.indexOf(item) < 0)
		)

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

	static addFilesToAlbum (album, i) {
		const songFiles = []
		configuration.library.albums[i].files.forEach((songFile) => {
			songFiles.push(songFile.file)
		})
		configuration.library.albums[i].files = configuration.library.albums[i].files.concat(
			album.files.filter(songFile => songFiles.indexOf(songFile.file) === -1)
		)
	}

	static addAlbumsToLibrary (albums) {
		// Todo: Different Albums can have same name.
		const albumNames = []
		configuration.library.albums.forEach((album) => {
			albumNames.push(album.album)
		})

		let albumExists = false
		albums.forEach((album) => {
			const configAlbumIndex = albumNames.indexOf(album.album)
			if (configAlbumIndex !== -1) {
				albumExists = true
				Config.addFilesToAlbum(album, configAlbumIndex)
			}
		})

		if (!albumExists) {
			configuration.library.albums = configuration.library.albums.concat(albums)
		}

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
