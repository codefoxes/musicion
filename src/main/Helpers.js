const { app } = require('electron')
const path = require('path')
const fs = require('graceful-fs')
const NodeID3 = require('node-id3')

const userPath = app.getPath('userData')
const cachePath = `${userPath}/musicion-cache`
// TODO: CREATE THIS DIRECTORY ON INSTALLATION.

function walkSync (dir, fileList = [], filter) {
	let newFileList = fileList
	fs.readdirSync(dir).forEach((file) => {
		if (fs.statSync(path.join(dir, file)).isDirectory()) {
			newFileList = walkSync(path.join(dir, file), newFileList, filter)
		} else {
			const filePath = path.join(dir, file)
			if ((filter === undefined) || (filter && filter.func(filePath, ...filter.args))) {
				newFileList.push(filePath)
			}
		}
	})
	return newFileList
}

function endsWithAny (string, suffixes) {
	return suffixes.some(suffix => string.endsWith(suffix))
}

function getMusicFiles (dir) {
	const supportedMusicExtensions = [
		'.mp3',
		'.flac'
	]
	const filter = {
		func: endsWithAny,
		args: [supportedMusicExtensions]
	}
	return walkSync(dir, [], filter)
}

function getAlbums (folders, cacheCover = true) {
	let promiseResolve
	let promiseReject

	const albumPromise = new Promise((resolve, reject) => {
		promiseResolve = resolve
		promiseReject = reject
	})

	let files = []
	folders.forEach((folder) => {
		files = getMusicFiles(folder)
	})
	const albums = []
	// Todo: Runs every time, optimize.
	files.forEach((file, i) => {
		const tags = NodeID3.read(file)
		if (cacheCover && tags.image && tags.image.imageBuffer) {
			const imageName = file.replace(/\//g, '_')
			const imagePath = `${cachePath}/${imageName}.${tags.image.mime}`
			fs.writeFile(imagePath, tags.image.imageBuffer, 'binary', (err) => {
				if (err) {
					promiseReject(err)
				}
				if (files.length === i + 1) {
					promiseResolve(albums)
				}
			})
			tags.imagePath = imagePath
			delete tags.image
			delete tags.raw
		}

		let index
		const albumExists = albums.some((album, j) => {
			index = j
			return album.album === tags.album
		})
		if (albumExists && index !== undefined) {
			albums[index].files.push({
				file,
				tags
			})
		} else {
			albums.push({
				album: tags.album,
				files: [{
					file,
					tags
				}]
			})
		}
	})
	return albumPromise
}

module.exports = {
	walkSync,
	endsWithAny,
	getMusicFiles,
	getAlbums
}
