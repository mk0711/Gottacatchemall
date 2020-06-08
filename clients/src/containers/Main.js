import React from 'react'
import { Link } from 'react-router-dom'

import Form from './Form.js'
import Results from './Results.js'

class MainPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      searchResults: [],
      names: [],
      one: '', // one is just a test variable
      images: [],
      pokemon: [],
      savedPokemon: new Map() 
    }
  }

        render = () => {
          var keys = Array.from(this.state.savedPokemon.keys())
          var i = ""
          var qrs = []
          for(i = 0; i<keys.length; i++) {
            qrs[i] = this.state.savedPokemon.get(keys[i])
          }

          const listItems = keys.map((pokemonName, index) =>
          <Link to = {{
            pathname: '/pokemonInfo',
            state: {
              test: qrs[index],
            }
          }}>
          <li>{pokemonName}</li>
          </Link>
        )
          return (
            <div>
              <Form
                placeholderText="Search for a pokemon..."
                onSubmit={(query) => {
                  this.makeApiRequest(query)
                }}
              />
              <br>
              </br>
              <hr />

              {this.state.pokemon ? (
                <Results
                  searchResults = {this.state.searchResults}
                  names = {this.state.names}
                  one = {this.state.one}
                  images = {this.state.images}
                  pokemon = {this.state.pokemon}
                />
              ) : (
                <p>Please type in valid pokemon name</p>
              )}

              <ul>{listItems}</ul>
            
            </div>
          )
        }

        // makeApiRequest = (ingredients) => {
        //   //var url = idk 
        //   var fetchPromise = fetch(url)
        //   fetchPromise.then((response) => {
        //     response.json().then((data) => {
        //       if (response.status === 200 && data.length > 0) { // Hits has something in it
        //         console.log('response.status', response.status)

        //         const loop = []
        //         const loop2 = []

        //         for (var i = 0; i < data.hits.length; i++) {
        //           console.log(loop[i])
        //           loop[i] = data.hits[i].recipe.label
        //           loop2[i] = data.hits[i].recipe
        //         }

        //         this.setState({
        //           one: data.hits[0].recipe.label,
        //           names: loop,
        //           searchResults: data,
        //           recipes: loop2
        //         })
        //       } else {
        //         this.setState({
        //           names: null,
        //           searchResults: null,
        //           pokemon: null
        //         })
        //       }
        //     })
        //   })
        // }
}

export default MainPage
