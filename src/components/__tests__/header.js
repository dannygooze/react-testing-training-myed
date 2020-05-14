import React from 'react'
import { render } from '@testing-library/react'
import { Header } from '../header'

describe('Tests for header component', () => {
    test('Test component renders with proper text', () => {
        const { getByText } = render(<Header />)

        expect(getByText(/pokédex/i))
    })

    test('Test component renders with proper text', () => {
        const { container } = render(<Header />)

        expect(container.querySelector("img[alt='pokeball']"))
    })
})
