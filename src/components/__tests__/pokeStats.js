import React from 'react'
import { render } from '@testing-library/react'
import { PokeStats } from '../pokeStats'
import { POKE_DATA_ONE } from '../testingUtils/testingData'

describe('Test PokeStats component functions and renders as expected', () => {
    test('Component renders table headers and name columns', () => {
        const { getByText } = render(<PokeStats pokemon={POKE_DATA_ONE} />)

        //Here I am using two different methods from expect, here are more that are available: https://jestjs.io/docs/en/expect
        expect(getByText(/^Stats/)).toBeTruthy()
        expect(getByText('Name')).toBeTruthy()
        expect(getByText('Speed')).toBeTruthy()
        expect(getByText('Special Defense')).toBeTruthy()
        expect(getByText('Special Attack')).toBeTruthy()
        expect(getByText(/^Defense/)).toBeTruthy()
        expect(getByText(/^Attack/)).toBeTruthy()
    })

    test('Component renders stats as passed in by props', () => {
        const { getByText, getAllByText } = render(<PokeStats pokemon={POKE_DATA_ONE} />)

        expect(getByText(String(POKE_DATA_ONE.stats[0].base_stat))).toBeTruthy()
        expect(getAllByText(String(POKE_DATA_ONE.stats[1].base_stat)).length).toBe(2)
        expect(getAllByText(String(POKE_DATA_ONE.stats[3].base_stat)).length).toBe(2)
    })
})
