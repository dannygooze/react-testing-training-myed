import React from 'react'

const PokemonContext = React.createContext()

const initialState = {
    pokemon: {},
    pokemonDescription: '',
    error: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_POKEMON': {
            return { ...state, pokemon: action.payload }
        }
        case 'SET_FLAVOR_TEXT': {
            return { ...state, pokemonDescription: action.payload }
        }
        case 'SET_ERROR': {
            return { ...state, pokemon: {}, error: action.payload}
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function PokemonProvider({children}) {
    const [state, dispatch] = React.useReducer(reducer, initialState)

    return (
        <PokemonContext.Provider value={{state, dispatch}}>
            {children}
        </PokemonContext.Provider>
    )
}

function usePokemonState() {
    const context = React.useContext(PokemonContext)
    if (context === undefined) {
        throw new Error('useCountState must be used within a CountProvider')
    }
    return context
}

export{PokemonProvider, usePokemonState}
