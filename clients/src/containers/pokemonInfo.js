import React from 'react'

class pokemonInfo extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      pokemonData: ''
    }
  }

  componentDidMount () {
    var pokemon = this.props.location.state

    this.setState({
      pokemonData: pokemon.test
    })
  }

    render = () => {
      return (
        <div>
            <p>??</p>
        </div>
        //   name = {this.state.pokemonData.name}
        //   image = {this.state.pokemonData.image}
      )
    }
}

export default pokemonInfo;
