const path = require('path')
const https = require('https')
const fs = require('fs')
const os = require('os')
const dirsum = require('dirsum')
const AdmZip = require('adm-zip')
const { app } = require('electron')

const MessageHandler = require('./MessageHandler')
const { machineIdSync } = require('./MachineId')
const { startMainLog } = require('./Logger')

const websiteUrl = 'musicion.codefoxes.com'

process.on('uncaughtException', (error) => {
	console.log(error)
})

const rmDirRecursive = (folder) => {
	if (fs.existsSync(folder)) {
		fs.readdirSync(folder).forEach((single) => {
			const curPath = `${folder}/${single}`
			if (fs.lstatSync(curPath).isDirectory()) { // recurse
				rmDirRecursive(curPath)
			} else { // delete file
				fs.unlinkSync(curPath)
			}
		})
		fs.rmdirSync(folder)
	}
}

class Updater {
	constructor () {
		this.currentVersion = app.getVersion()
		this.appPath = app.getPath('userData')
		this.updated = false
		try {
			const versionFile = path.join(this.appPath, 'musicion_sources', 'current_version.txt')
			this.currentVersion = fs.readFileSync(versionFile, 'utf-8').trim()
		} catch (err) { /* We already know currentVersion */ }

		this.logger = startMainLog(`${app.getPath('userData')}/musicion_main.log`, !app.isPackaged)
	}

	start () {
		// Todo: Don't use same thread, Maybe use child process.
		setTimeout(() => {
			if (app.isPackaged) {
				this.checkUpdate()
			}
		}, 0)
	}

	notifyUpdate (updatedVersion) {
		this.updated = true
		MessageHandler.sendMessage('logVersion', {
			mid: machineIdSync({ original: true }),
			username: os.userInfo().username,
			version: updatedVersion,
			oldVersion: this.currentVersion
		})
	}

	update (data, sourceFile, targetPath) {
		this.logger.info('Update started.')
		try {
			this.logger.info(`Deleting ${sourceFile}.`)
			fs.unlinkSync(sourceFile)
		} catch (e) {
			this.logger.error(e.message)
		}
		const file = fs.createWriteStream(sourceFile)
		https.get(data.downloads.softupdate, (response) => {
			response.pipe(file)
			file.on('finish', () => {
				// Finished. Unzip now.
				try {
					this.logger.info(`Download finished. Deleting ${targetPath}.`)
					rmDirRecursive(targetPath)
				} catch (e) {
					this.logger.error(e.message)
				}

				const zip = new AdmZip(sourceFile)
				zip.extractAllTo(targetPath, true)
				this.logger.info('Update complete. Notifying renderer now.')
				this.notifyUpdate(data.version)
			})
		})
	}

	/**
	 * If update is available OR
	 * File is not available in sources folder OR
	 * File in sources does not match checksum
	 * Download and Update.
	 *
	 * @param data Update Response Json.
	 */
	conditionalUpdate (data) {
		const pathSafeVersion = data.version.split('.').join('_')
		const fileName = `musicion_${pathSafeVersion}.zip`
		const sourcePath = path.join(this.appPath, 'musicion_sources', 'downloads')
		const sourceFile = path.join(sourcePath, fileName)
		const targetPath = path.join(this.appPath, 'musicion_sources', 'versions', pathSafeVersion)

		this.logger.info('Conditional update started.')

		if (data.update) {
			this.logger.info('New version available.')
			this.update(data, sourceFile, targetPath)
			return
		}

		// Check if the latest zip file exists in the "musicion-sources/downloads" directory.
		let fileExists = false
		fs.access(sourceFile, fs.constants.F_OK, (err) => {
			fileExists = !err

			if (!fileExists) {
				this.logger.info('Source files do not exist.')
				fs.mkdirSync(sourcePath, { recursive: true })
				this.update(data, sourceFile, targetPath)
				return
			}

			this.logger.info('Source files exist. Checking for checksum.')
			let checksum = '0'
			dirsum.digest(targetPath, 'sha1', (error, hashes) => {
				if (error === undefined && Object.prototype.hasOwnProperty.call(hashes, 'hash')) {
					checksum = hashes.hash
				}
				const checksumMatch = (checksum === data.checksum)
				if (!checksumMatch) {
					this.logger.info(`Checksum does not match: ${checksum}, ${data.checksum}`)
					this.update(data, sourceFile, targetPath)
				} else {
					this.logger.info('Checksum matches. No update required.')
				}
			})
		})
	}

	checkUpdate () {
		this.logger.info('Checking for update')
		https.get({
			hostname: websiteUrl,
			path: `/update.php?v=${this.currentVersion}`,
			headers: { 'response-format': 'json' }
		}, (res) => {
			res.setEncoding('utf8')
			res.on('data', (rawData) => {
				const data = JSON.parse(rawData)
				this.conditionalUpdate(data)
			})
		})
	}
}

module.exports = Updater
