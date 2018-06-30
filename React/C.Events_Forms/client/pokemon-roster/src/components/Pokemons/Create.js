import React from 'react'
import Pokemons from './Pokemons'
const CREATE_POKEMON_URL = 'http://localhost:5000/pokedex/create'
const POKEMONS_URL = 'http://localhost:5000/pokedex/pokedex'


class CreatePokemon extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pokemonName: '',
      pokemonImg: '',
      pokemonInfo: '',
      pokemons: []
    }
  }

  componentDidMount = () => {
    this.getPokemons()
  }

  handleSubmit = () => {
    let payLoad = {
      pokemonName: this.state.pokemonName,
      pokemonImg: this.state.pokemonImg,
      pokemonInfo: this.state.pokemonInfo
    }

    fetch(CREATE_POKEMON_URL, {
      method: 'POST',
      body: JSON.stringify(payLoad),
      headers: {
        'content-type': 'application/json'
      }
    })
      .catch(err => {
        console.log(err)
      })
    this.setState({
      pokemonName: '',
      pokemonImg: '',
      pokemonInfo: ''
    })
    this.getPokemons()
  }

  getPokemons = () => {
    fetch(POKEMONS_URL)
      .then(pokemons => pokemons.json())
      .then(data => this.setState({ pokemons: data.pokemonColection }))
  }

  updateProps = (event) => {
    let property = this.state
    property[event.target.id] = event.target.value
    this.setState(property)
  }

  render() {
    return (
      <div className='row'>
        <div className='col-sm-8'>
          <Pokemons pokemons={this.state.pokemons} />
        </div>
        <div className='col-sm-4 mt-5' style={{backgroundColor: '#F2F2F2'}}>
          <form>
            <h1>Create pokemon</h1>
            <div className='form-group'>
              <label htmlFor='pokemonName' className='col-form-label'>Pokemon name</label>
              <input type='text' className='form-control' id='pokemonName' placeholder='Enter pokemon name'
                value={this.state.pokemonName}
                onChange={this.updateProps} />
            </div>
            <div className='form-group'>
              <label htmlFor='pokemonImg'>Pokemon image</label>
              <input type='text' className='form-control' id='pokemonImg' placeholder='Pokemon image'
                onChange={this.updateProps}
                value={this.state.pokemonImg} />
            </div>
            <div className='form-group'>
              <label htmlFor='pokemonInfo'>Password</label>
              <input type='text' className='form-control' id='pokemonInfo' placeholder='Pokemon Info'
                onChange={this.updateProps}
                value={this.state.pokemonInfo} />
            </div>
            <div>{this.state.error}</div>
            <button type='button' className='btn btn-primary'
              onClick={this.handleSubmit}>Create</button>
          </form>
        </div>
      </div>
    )
  }
}

export default CreatePokemon