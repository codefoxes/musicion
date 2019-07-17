jest.mock('firebase/app', () => ({
	initializeApp: jest.fn(),
	apps: [],
	auth: jest.fn(() => ({
		signInAnonymously: jest.fn(() => ({ catch: jest.fn(cb => cb({ message: 'Test Error' })) })),
		onAuthStateChanged: jest.fn(cb => cb({
			isAnonymous: true,
			uid: 'test'
		}))
	})),
	firestore: jest.fn(() => ({
		collection: jest.fn(() => ({
			doc: jest.fn(() => ({
				set: () => (new Promise((resolve) => { resolve() }))
			}))
		}))
	}))
}))

jest.mock('firebase/auth', () => ({
	auth: jest.fn()
}))

jest.mock('firebase/firestore', () => ({
	firestore: jest.fn()
}))
