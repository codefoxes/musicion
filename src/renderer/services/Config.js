import fs from 'graceful-fs'
import { remote } from 'electron'

const userPath = remote.app.getPath('userData')
const fileName = 'musicion-config.json'
const playlistsFileName = 'musicion-playlists.json'

let configuration
let playlists

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
				configuration = {}
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

	static get playlists () {
		return playlists
	}

	static createPlaylistsConfig () {
		const config = [{ name: 'Default', files: [] }]
		try {
			fs.writeFileSync(`${userPath}/${playlistsFileName}`, JSON.stringify(config, null, '\t'), 'utf8')
		} catch (err) {
			if (err.code === 'EACCES') {
				err.message = `${err.message}\nYou don't have access to this file.\n`
			}
			throw err
		}
	}

	static loadPlaylists () {
		if (playlists !== undefined) return
		try {
			const configContent = fs.readFileSync(`${userPath}/${playlistsFileName}`, 'utf8')
			playlists = JSON.parse(configContent)
		} catch (err) {
			if (err.message.includes('no such file')) {
				// Config file does not exist. Create one.
				Config.createPlaylistsConfig()
				playlists = [{ name: 'Default', files: [] }]
			} else {
				playlists = []
				// Reading config failed.
			}
		}
	}

	static addFilesToPlaylist (playlistName, files, deDuplicate = false) {
		let playlistExists = false
		let playlistIndex = null

		for (let i = 0; i < playlists.length; i += 1) {
			if (playlists[i].name === playlistName) {
				playlistExists = true
				playlistIndex = i
				break
			}
		}

		if (playlistExists) {
			let newFiles = files
			if (!Array.isArray(files)) {
				newFiles = [files]
			}

			if (deDuplicate) {
				const songFiles = []
				playlists[playlistIndex].files.forEach((songFile) => {
					songFiles.push(songFile.file)
				})
				playlists[playlistIndex].files = playlists[playlistIndex].files.concat(
					newFiles.filter(songFile => songFiles.indexOf(songFile.file) === -1)
				)
			}
			playlists[playlistIndex].files = playlists[playlistIndex].files.concat(newFiles)
		} else {
			const newPlaylist = {
				name: playlistName,
				files: []
			}
			if (files !== undefined) {
				if (Array.isArray(files)) {
					newPlaylist.files = files
				}
				if (typeof files === 'object' && files !== null) {
					newPlaylist.files = [files]
				}
			}
			playlists.push(newPlaylist)
		}

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

	static removeFileFromPlaylist (playlistName, index) {
		const playlistIndex = playlists.findIndex(playlist => playlist.name === playlistName)
		playlists[playlistIndex].files.splice(index, 1)

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

	static removePlaylist (playlistName) {
		playlists.forEach((playlist, i, original) => {
			if (playlist.name === playlistName) {
				original.splice(i, 1)
			}
		})

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
}
