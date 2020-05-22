import React from 'react'
import { render } from '@testing-library/react'
import { Header } from '../header'

describe('Tests for header component', () => {
    test('Test component renders with proper text', () => {
        const { getByText } = render(<Header />)

        //getByText queries for a single element that matches the text provided
        //other ways to do queries can be found here: https://testing-library.com/docs/dom-testing-library/api-queries
        expect(getByText(/pokédex/i))
    })

    test('Test component renders with proper text', () => {
        const { container } = render(<Header />)

        //with the container you can use querSelectors if you are trying to find something very specific
        //in this example, we want to be specific about the attribute we get.
        expect(container.querySelector("img[alt='pokeball']"))
    })
})
