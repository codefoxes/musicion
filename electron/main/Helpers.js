const { app } = require('electron')
const path = require('path')
const fs = require('fs')
const crypto = require('crypto')
const mm = require('music-metadata')

// Todo: music-metadata is huge, can optimize?

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

function formatTags (rawTags) {
	let formattedTags = {
		album: 'Untitled'
	}

	const hash = crypto.createHash('md5')
	if ('common' in rawTags) {
		formattedTags = rawTags.common
		const tagsObject = rawTags.common

		if ('picture' in tagsObject && tagsObject.picture !== undefined) {
			if (Array.isArray(tagsObject.picture) && tagsObject.picture.length > 0) {
				hash.update(tagsObject.picture[0].data)
			}
		}
		if ('format' in rawTags) {
			formattedTags.format = rawTags.format
		}
	}
	hash.update(formattedTags.album)
	formattedTags.albumId = hash.digest('hex')
	return formattedTags
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

function getMediaTags (media) {
	return new Promise((resolve, reject) => {
		mm.parseFile(media).then((metadata) => {
			const formatted = formatTags(metadata)
			resolve(formatted)
		}).catch((error) => {
			reject(error)
		})
	})
}

async function asyncForEach (array, callback) {
	const cbRes = []
	for (let index = 0; index < array.length; index += 1) {
		cbRes.push(callback(array[index], index, array))
	}
	await Promise.all(cbRes)
}

async function getAlbums (folders, cacheCover = true) {
	let files = []
	folders.forEach((folder) => {
		files = files.concat(getMusicFiles(folder))
	})
	const albums = []
	// Todo: Runs every time, optimize.
	await asyncForEach(files, async (file, i) => {
		let tags = {}
		try {
			tags = await getMediaTags(file)
		} catch (err) {
			if (err) return false
		}

		const imageName = file.replace(/\//g, '_')
		if (cacheCover && ('picture' in tags) && ('data' in tags.picture || Array.isArray(tags.picture))) {
			let pictureObject = null
			if (Array.isArray(tags.picture)) {
				[pictureObject] = tags.picture
			} else {
				pictureObject = tags.picture
			}
			const ext = pictureObject.format.split('/')[1]
			const imagePath = `${cachePath}/${imageName}.${ext}`
			// Todo: Handle error. Try Catch?
			try {
				await fs.writeFile(imagePath, pictureObject.data, 'binary', (err) => {
					if (err) { /**/ }
					if (files.length === i + 1) { /**/ }
				})
				tags.imagePath = imagePath
			} catch (e) { /**/ }

			if ('picture' in tags) delete tags.picture
			if ('APIC' in tags) delete tags.APIC
		} else if (!('picture' in tags)) {
			const folder = splitByLastChar(file, '/')[0]
			if (fs.existsSync(`${folder}/cover.jpg`)) {
				fs.copyFile(`${folder}/cover.jpg`, `${cachePath}/${imageName}.jpg`, () => {})
				tags.imagePath = `${cachePath}/${imageName}.jpg`
			} else if (fs.existsSync(`${folder}/cover.png`)) {
				fs.copyFile(`${folder}/cover.png`, `${cachePath}/${imageName}.png`, () => {})
				tags.imagePath = `${cachePath}/${imageName}.jpg`
			} else {
				// Scan for covers in the folder.
			}
		}

		let index
		const albumExists = albums.some((album, j) => {
			index = j
			return album.albumId === tags.albumId
		})
		if (albumExists && index !== undefined) {
			albums[index].files.push({
				file,
				tags
			})
		} else {
			albums.push({
				albumId: tags.albumId,
				album: tags.album,
				files: [{
					file,
					tags
				}]
			})
		}
		return true
	})
	return albums
}

function splitByLastChar (text, char) {
	const index = text.lastIndexOf(char)
	return [text.slice(0, index), text.slice(index + 1)]
}

module.exports = {
	walkSync,
	endsWithAny,
	getMusicFiles,
	getAlbums
}
