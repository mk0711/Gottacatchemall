import React from 'react'
import { Link } from 'react-router-dom'

class pokemon extends React.Component {
    render = () => {
      return (
        <div className="card">
          <Link to={{
            pathname: '/pokemonInfo',
            state: {
              test: this.props.pokemon,
            
            }
          }}>
            <img src={this.props.recipe.image} alt="image_source" />
            <h4 className="card-title">{this.props.pokemon}</h4>
          </Link>
        </div>
      )
    }
}

export default pokemon;
