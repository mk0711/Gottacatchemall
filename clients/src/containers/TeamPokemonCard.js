import React from "react";
import { apiBaseURL } from "../global";
import { sendGetRequestWithAuthHeader, typeColorMap } from "../global";

class TeamSpecificPokemonCard extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            moves: [],
        }
    }

    async componentDidMount() {
        let moves = [];
        for (const moveName of this.props.moves) {
            const fullMove = await this.getMove(moveName);
            if (fullMove) {
                moves.push(fullMove);
            }
        }
        this.setState({
            moves: moves
        })
    }

    async getMove(moveName) {
        const teamPath = "/v1/moves/" + moveName;
        const response = await sendGetRequestWithAuthHeader(apiBaseURL + teamPath);
        if (response.status === 200) {
            return response.json();
        }
    }

    renderAllMoves = () => {
        const allMoves = this.state.moves.map(this.renderOneMove);
        return(
            <table style={{
                "marginLeft": "auto",
                "marginRight": "auto"
            }}>
                <thead>
                    <tr>
                        <th style={{"padding": 5+"px"}}>Move</th>
                        <th style={{"padding": 5+"px"}}>Type</th>
                        <th style={{"padding": 5+"px"}}>Category</th>
                        <th style={{"padding": 5+"px"}}>Power</th>
                        <th style={{"padding": 5+"px"}}>Accuracy</th>
                    </tr>
                </thead>
                <tbody>
                    {allMoves}
                </tbody>
            </table>
        )
    }

    renderOneMove = (moveInfo) => {
        const categoryColor = moveInfo === "physical" ? "#C92112" : "#4F5870"
        return(
            <tr key={moveInfo.name} >
                <td style={{
                    "padding": 5+"px"
                }}>{moveInfo.name}</td>
                <td style = {{
                    "backgroundColor": typeColorMap[moveInfo.type],
                    "color": "white",
                    "padding": 5+"px"
                }}>{moveInfo.type}</td>
                <td style ={{
                    "backgroundColor": categoryColor,
                    "color": "white",
                    "padding": 5+"px"
                }}>{moveInfo.category}</td>
                <td style={{
                    "padding": 5+"px"
                }}>{moveInfo.power}</td>
                <td style={{
                    "padding": 5+"px"
                }}>{moveInfo.acc}</td>
            </tr>
        )
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

                <p>Moves:</p>
                {this.renderAllMoves()}
            </div>
        );
    }
}

export default TeamSpecificPokemonCard;