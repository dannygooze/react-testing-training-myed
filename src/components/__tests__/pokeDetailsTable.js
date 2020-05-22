import React from 'react'
import { render } from '@testing-library/react'
import { PokeDetailTable } from '../pokeDetailTable'
import { POKE_DATA_ONE, POKE_DATA_TWO, POKE_DATA_THREE,
        POKE_DESC, IMG_URL_PREFIX,
        IMG_URL_SUFFIX } from '../testingUtils/testingData'

describe('Test PokeDetailsTable copmonent renders with appropriate props and images', () => {
    test('Pokemon name renders capitalized and description renders', () => {
        const { getByText } = render(<PokeDetailTable pokemon={POKE_DATA_ONE} description={POKE_DESC} />)

        //Here I use toBeTruthy to assert this exists and returns something
        //I want to be sure I am actually validating something than just querying
        expect(getByText('Bulbasaur')).toBeTruthy()
        expect(getByText(POKE_DESC)).toBeTruthy()
    })

    test('Format pokeId function works with single digit ID', () => {
        const { container } = render(<PokeDetailTable pokemon={POKE_DATA_ONE} description={POKE_DESC} />)
        const url = `${IMG_URL_PREFIX}00${POKE_DATA_ONE.id}${IMG_URL_SUFFIX}`

        expect(container.querySelector(`img[src="${url}"]`)).toBeTruthy()
    })

    test('Format pokeId function works with double digit ID', () => {
        const { container } = render(<PokeDetailTable pokemon={POKE_DATA_TWO} description={POKE_DESC} />)
        const url = `${IMG_URL_PREFIX}0${POKE_DATA_TWO.id}${IMG_URL_SUFFIX}`

        expect(container.querySelector(`img[src="${url}"]`)).toBeTruthy()
    })

    test('Format pokeId function works with triple digit ID', () => {
        const { container } = render(<PokeDetailTable pokemon={POKE_DATA_THREE} description={POKE_DESC} />)
        const url = `${IMG_URL_PREFIX}${POKE_DATA_THREE.id}${IMG_URL_SUFFIX}`

        expect(container.querySelector(`img[src="${url}"]`)).toBeTruthy()
    })
})
