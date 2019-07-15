import '@testing-library/react/cleanup-after-each'
import '@testing-library/jest-dom/extend-expect'

/* eslint import/no-unresolved: 0 */
import React from 'react'
import { render } from '@testing-library/react'
import TitleBar from 'renderer/components/header/TitleBar'

describe('Titlebar', () => {
	it('has musicion', () => {
		const { container } = render(
			<TitleBar />
		)

		expect(container).toHaveTextContent('Musicion')
	})
})
