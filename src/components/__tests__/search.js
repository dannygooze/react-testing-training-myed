import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Search } from '../search'
import { POKE_DATA_ONE, POKE_DESC } from '../testingUtils/testingData'
import * as AppContext from '../../context'
import axios from 'axios';
import { act } from 'react-dom/test-utils'

//Mocking modules always go at the top after the import
jest.mock('axios')
const MOCK_DATA = {
    data: {
        ...POKE_DATA_ONE,
        flavor_text_entries: [
            {
                language: {
                    name: 'en'
                },
                flavor_text: POKE_DESC
            }
        ]
    }
}
//This gives a default value to axios's get method
//Mock resolved value returns a value with a fulfilled promise
axios.get.mockResolvedValue(MOCK_DATA)

const ERROR_MESSAGE = {
    error: 'Error with pokeAPI'
}

//Simple custom render function that wraps all of our components with a context
const customRender = (ui, options) => render(ui, { wrapper: AppContext.PokemonProvider, ...options })

describe('Test search component makes appropriate dispatch calls', () => {
    test('Input component makes appropriate dispatches calls when submit button is clicked', async () => {
        //Create a mock function variable to check its calls later on
        const mockDispatch = jest.fn()
        //The spyOn will watch for any use of the usePokemonDispatch hook, the mock implementation method
        //passes a mock function as its return value.
        jest.spyOn(AppContext, 'usePokemonDispatch').mockImplementation(() => mockDispatch)

        const { container, getByText } = customRender(<Search />)

        //because we are waiting for a render change with input, we want to wrap this in an act
        //More info on act can be found here: https://reactjs.org/docs/test-utils.html#act
        await act(async () => {
            await fireEvent.change(container.querySelector('input'), { target: { value: POKE_DATA_ONE.name } })
            await fireEvent.click(getByText('Search'))
        })

        //With a mock function, I can check how many times it was called,
        //what each call had as its arguments, and a whole lot more
        expect(mockDispatch.mock.calls.length).toBe(3)
        expect(mockDispatch.mock.calls[0][0].type).toBe('SET_ERROR')
        expect(mockDispatch.mock.calls[0][0].payload).toBe('')
        expect(mockDispatch.mock.calls[1][0].type).toBe('SET_POKEMON')
        expect(mockDispatch.mock.calls[1][0].payload).toBe(MOCK_DATA.data)
        expect(mockDispatch.mock.calls[2][0].type).toBe('SET_FLAVOR_TEXT')
        expect(mockDispatch.mock.calls[2][0].payload).toBe(POKE_DESC)
    })

    test('Test that a bad search calls error dispatch', async () => {
        //This will change our default return value for our mocked axios library to throw an error with a bad promise
        axios.get.mockRejectedValue(ERROR_MESSAGE)
        const mockDispatch = jest.fn()
        jest.spyOn(AppContext, 'usePokemonDispatch').mockImplementation(() => mockDispatch)

        const { container, getByText } = customRender(<Search />)
        await act(async () => {
            await fireEvent.change(container.querySelector('input'), { target: { value: 'pika' } })
            await fireEvent.click(getByText('Search'))
        })

        expect(mockDispatch.mock.calls.length).toBe(2)
        expect(mockDispatch.mock.calls[0][0].type).toBe('SET_ERROR')
        expect(mockDispatch.mock.calls[0][0].payload).toBe('')
        expect(mockDispatch.mock.calls[1][0].type).toBe('SET_ERROR')
        expect(mockDispatch.mock.calls[1][0].payload).toBe(ERROR_MESSAGE)
    })
})
