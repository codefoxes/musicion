import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// const config = {
// 	apiKey: process.env.REACT_APP_API_KEY,
// 	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
// 	databaseURL: process.env.REACT_APP_DATABASE_URL,
// 	projectId: process.env.REACT_APP_PROJECT_ID,
// 	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
// 	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
// }

const config = {
}

class Firebase {
	constructor () {
		if (!firebase.apps.length) {
			firebase.initializeApp(config)
		}
	}

	signIn () {
		firebase.auth().signInAnonymously().catch((error) => {
			console.log(error.code)
			console.log(error.message)
		})

		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				const isAnonymous = user.isAnonymous
				const uid = user.uid
				console.log(user)
			} else {
				// User is signed out.
			}
		})
	}

	logCurrentVersion () {
		const db = firebase.firestore()
		db.collection('users').doc('uniqueid123').set({
			name: 'Anonymous',
			currentVersion: '0.1.0'
		})
			.then((docRef) => {
				console.log('Document written with ID: ', docRef.id)
			})
			.catch((error) => {
				console.error('Error adding document: ', error)
			})
	}
}

export default Firebase
