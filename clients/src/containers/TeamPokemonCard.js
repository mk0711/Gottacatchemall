import React from "react";
import { apiBaseURL } from "../global";


class TeamSpecificPokemonCard extends React.Component {
    constructor (props) {
        super(props)
    }

    render() {
        return(
            <div className="card" style={{"width": 400 + "px"}}> 
                <img src={apiBaseURL + "/v1/pokedex/image/" + this.props.pokemonName} alt={this.props.pokemonName + " image"} />
                <h3>{this.props.nickName}</h3>
                <h4>{"Species: " + this.props.pokemonName}</h4>
                <h4>{"level: " + this.props.level}</h4>
                <p>{"nature: " + this.props.nature}</p>

                <br/>
                <p>IV:</p>
                <p>{"HP: " + this.props.IV.hp}</p>
                <p>{"ATK: " + this.props.IV.atk}</p>
                <p>{"DEF: " + this.props.IV.def}</p>
                <p>{"SPA: " + this.props.IV.spa}</p>
                <p>{"SPD: " + this.props.IV.spd}</p>
                <p>{"SPE: " + this.props.IV.spe}</p>

                <br/>
                <p>Stats:</p>
                <p>{"HP: " + this.props.stats.hp}</p>
                <p>{"ATK: " + this.props.stats.atk}</p>
                <p>{"DEF: " + this.props.stats.def}</p>
                <p>{"SPA: " + this.props.stats.spa}</p>
                <p>{"SPD: " + this.props.stats.spd}</p>
                <p>{"SPE: " + this.props.stats.spe}</p>
                <br/>
            </div>
        );
    }
}

export default TeamSpecificPokemonCard;