import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { usePokemonState } from '../context'
import axios from 'axios'

export function Search(props) {
    const { dispatch } = usePokemonState()

    const getPokemon = async (searchTerm) => {
        try {
            let resp = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}/`)
            dispatch({ type: 'SET_POKEMON', payload: resp.data })
            getPokemonFlavorText(resp.data.id)
        } catch(err) {
            console.error(err)
            dispatch({ type: 'SET_ERROR', payload: err})
        }

    }

    const getPokemonFlavorText = async (id) => {
        try {
            let resp = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)

            let pokeTextArr = resp.data.flavor_text_entries.filter((lang) => {
                return lang.language.name === 'en'
            })

            dispatch({ type: 'SET_FLAVOR_TEXT', payload: pokeTextArr[0].flavor_text })
        } catch(err) {
            console.error(err)
            dispatch({ type: 'SET_FLAVOR_TEXT', payload: 'Error fetching pokémon description.'})
        }
    }

    return (
        <div className='justify-content-center mt-3'>
            <Formik
                initialValues={{ search: '' }}
                validate={values => {
                    const errors = {}

                    if (!values.search) {
                        errors.email = 'Enter a pokemon name or ID';
                    }

                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    dispatch({ type: 'SET_ERROR', payload: '' })
                    getPokemon(values.search)
                    setSubmitting(false)
                }}
                >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="search" placeholder="Pokémon name or ID" className='form-control mb-2'/>
                        <ErrorMessage name="email" component="div" />
                        <button type="submit" disabled={isSubmitting} className='btn btn-danger'>
                            Search
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
