import { apiBaseURL } from '../global';
import React from 'react';
import TeamSpecificPokemonCard from "./TeamPokemonCard";
import { sendGetRequestWithAuthHeader } from "../global";

class Team extends React.Component {
    state = {
        pokemons: [],
        errorMessage: ""
    };

    async componentDidMount() {
        const teamPath = "/v1/team";
        const response = await sendGetRequestWithAuthHeader(apiBaseURL + teamPath);
        if (response.status == 401) {
            this.setState({
              errorMessage: "Please log in."
            })
            return;
        }

        const team = await response.json();

        this.setState({
            pokemons: team
        })
    }

    getTeam() {
        return this.state.pokemons.map((pokemon => <TeamGeneralPokemonCard key={pokemon._id} {...pokemon} />));
    }

    render() {
        return(
            <div>
                {this.state.errorMessage && (
                    <p className="alert alert-danger">{this.state.errorMessage}</p>
                )}
                <div style={{"display": "flex", "flexWrap": "wrap"}}>
                    {this.getTeam()}
                </div>
            </div>

        );
    }
}

class TeamGeneralPokemonCard extends React.Component {
    constructor (props) {
        super(props)
        
        this.state = {
            general: true
        }
    }

    toggleSpecificRender = () => {
        this.setState({general: !this.state.general})
    }

    render() {
        return(
            this.state.general ? (
                <div className="card" style={{"width": 400 + "px"}} onClick={this.toggleSpecificRender}> 
                    <img src={apiBaseURL + "/v1/pokedex/image/" + this.props.pokemonName} alt={this.props.pokemonName + " image"} />
                    <h3>{this.props.nickName}</h3>
                    <h4>{"level: " + this.props.level}</h4>
                    <br/>
                </div>
            ):(
                <div onClick={this.toggleSpecificRender}>
                    <TeamSpecificPokemonCard key ={this.props._id} {...this.props}/>            
                </div>
            )

        );
    }
}

export default Team;