import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Header } from './components/header'
import { Search } from './components/search'
import { PokeDetail } from './components/pokeDetail'
import { PokemonProvider } from './context'

function App() {
    return (
            <PokemonProvider>
                <Col md={{ span: 8, offset: 2 }} className='my-4'>
                    <Row id='header' className='justify-content-center'>
                        <Header />
                    </Row>
                    <Search />
                    <PokeDetail />
                </Col>
            </PokemonProvider>
    )
}

export default App;
