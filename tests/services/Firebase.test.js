/* eslint import/no-unresolved: 0 */
import '../__mocks__/firebase'
import firebase from 'firebase/app'
import FirebaseService from 'renderer/services/Firebase'

describe('Firebase Manager', () => {
	it('logs current version', () => {
		jest.spyOn(firebase, 'firestore')
		const fb = new FirebaseService()
		fb.user.uid = 'test'
		fb.logCurrentVersion('', { uid: 'test' })
		expect(firebase.firestore).toHaveBeenCalled()
	})
})
