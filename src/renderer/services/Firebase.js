import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import BackendService from 'backend'

const config = {
	apiKey: process.env.MUSICION_API_KEY,
	authDomain: process.env.MUSICION_AUTH_DOMAIN,
	databaseURL: process.env.MUSICION_DATABASE_URL,
	projectId: process.env.MUSICION_PROJECT_ID,
	storageBucket: process.env.MUSICION_STORAGE_BUCKET,
	messagingSenderId: process.env.MUSICION_MESSAGING_SENDER_ID,
	appId: process.env.MUSICION_APP_ID
}

class Firebase {
	constructor () {
		this.user = {}
	}

	initialize () {
		if (!firebase.apps.length) {
			firebase.initializeApp(config)
			this.signIn()
		}
		BackendService.onMessage('logVersion', this.logCurrentVersion.bind(this))
	}

	logCurrentVersion (e, userData) {
		const db = firebase.firestore()
		let userId = userData.mid
		if ('uid' in this.user) {
			userId = this.user.uid
		}
		// Todo: Retry if failed.
		db.collection('anonymousUsers').doc(userId).set(userData).then(() => {
			// console.log('Success')
		})
	}

	signIn () {
		firebase.auth().signInAnonymously().catch((error) => {
			// console.log(error.message)
		})

		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.user.isAnonymous = user.isAnonymous
				this.user.uid = user.uid
			} else {
				// User is signed out.
			}
		})
	}
}

export default Firebase
