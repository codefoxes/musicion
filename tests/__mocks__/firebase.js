jest.mock('firebase/app', () => ({
	initializeApp: jest.fn(),
	apps: [],
	auth: jest.fn(() => ({
		signInAnonymously: jest.fn(() => ({ catch: jest.fn() })),
		onAuthStateChanged: jest.fn()
	}))
}))

jest.mock('firebase/auth', () => ({
	auth: jest.fn()
}))

jest.mock('firebase/firestore', () => ({
	firestore: jest.fn()
}))
