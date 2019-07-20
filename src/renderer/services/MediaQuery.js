const callbacks = []

export const mediaQuery = {
	onChange: (cb) => {
		callbacks.push(cb)
	},
	currentMedia: 'mobile',
	currentSize: ''
}

const queryObjects = []

function listener (e, queryObject) {
	mediaQuery.currentSize = ''
	if (e.matches) {
		mediaQuery.currentMedia = queryObject.device
		if (queryObject.device === 'tablet-only') mediaQuery.currentSize = 'tablet'
		if (queryObject.device === 'desktop-only') mediaQuery.currentSize = 'tablet desktop'
		if (queryObject.device === 'widescreen') mediaQuery.currentSize = 'tablet desktop'
	}
	callbacks.forEach(cb => cb())
}

function useMediaQuery (queryInput, device) {
	queryObjects.forEach((queryObject) => {
		queryObject.queryList.removeListener((e) => { listener(e, queryObject) })
	})
	queryObjects.push({
		queryList: window.matchMedia(queryInput),
		device
	})
	queryObjects.forEach((queryObject) => {
		queryObject.queryList.addListener((e) => { listener(e, queryObject) })
		const { matches } = queryObject.queryList
		if (matches) {
			mediaQuery.currentMedia = queryObject.device
			if (queryObject.device === 'tablet-only') mediaQuery.currentSize = 'tablet'
			if (queryObject.device === 'desktop-only') mediaQuery.currentSize = 'tablet desktop'
			if (queryObject.device === 'widescreen') mediaQuery.currentSize = 'tablet desktop'
		}
	})
}

// Reference: https://bulma.io/documentation/overview/responsiveness/

useMediaQuery('(max-width:768px)', 'mobile')
useMediaQuery('(min-width:769px) and (max-width:1023px)', 'tablet-only')
useMediaQuery('(min-width:1024px) and (max-width:1215px)', 'desktop-only')
useMediaQuery('(min-width:1216px)', 'widescreen')

export default useMediaQuery
