import { apiBaseURL } from '../global';
import React from 'react';
import TeamSpecificPokemonCard from "./TeamPokemonCard";
import { sendGetRequestWithAuthHeader } from "../global";
import ItemInventory from "./ItemInventory"

class Team extends React.Component {
    state = {
        pokemons: [],
        current: [],
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
            pokemons: team,
            current: team
        })
    }

    filter = (id) => {
        let filtered = this.state.pokemons.filter((pokemon) => {

            return pokemon._id === id;
        });
        

        this.setState({
            current: filtered
        });
    }

    reset = () => {
        this.setState({
            current: this.state.pokemons
        });
    }

    requery = async () => {
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
            pokemons: team,
        })
    }

    getTeam() {
        return this.state.current.map((pokemon => <TeamGeneralPokemonCard 
                                                        filter={this.filter} 
                                                        reset = {this.reset} 
                                                        requery=  {this.requery}
                                                        key={pokemon._id} {...pokemon} />));
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
            general: true, 
            nickName: this.props.nickName,
            level: this.props.level,
            stats: this.props.stats,
            moves: this.props.moves,
            pokemonName: this.props.pokemonName,
            selectedItem: "",
        }
    }


    toggleSpecificRender = () => {
        this.setState({general: !this.state.general})
    }

    submitNickname = async (nickName) => {
        const teamPath = "/v1/team/" + this.props._id;
        const body = {
            "nickName": nickName
        }

        const authToken = localStorage.getItem("authHeader");
        const response = await fetch(apiBaseURL + teamPath, {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": authToken
              },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        
        this.setState(
            {nickName: data.nickName,}
        )
    }

    selectSpecificItem = (itemName) => {
        this.setState({
          selectedItem: itemName
        })
    }

    useItem = async () => {
        const teamPath = "/v1/team/" + this.props._id;
        const body = {
            "useItem": this.state.selectedItem
        }

        const authToken = localStorage.getItem("authHeader");
        const response = await fetch(apiBaseURL + teamPath, {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": authToken
              },
            body: JSON.stringify(body)
        });

        if (response.status === 200) {
            const data = await response.json();

            if (this.state.pokemonName != data.pokemonName) {
                //pokemon evolved, so we need to change the parent
                this.props.requery();
            }

            this.setState({
                level: data.level,
                stats: data.stats,
                moves: data.moves,
                pokemonName: data.pokemonName,
                nickName: data.nickName
            })
        } else {
            alert("Can't use this item. Check your inventory");
        }
    }


    render() {
        return(
            this.state.general ? (
                <div className="card" style={{"width": 400 + "px"}} onClick={() => {
                    this.toggleSpecificRender();
                    this.props.filter(this.props._id);
                }}> 
                    <img src={apiBaseURL + "/v1/pokedex/image/" + this.state.pokemonName} alt={this.props.pokemonName + " image"} />
                    <h3>{this.state.nickName}</h3>
                    <h4>{"level: " + this.state.level}</h4>
                    <br/>
                </div>
            ):(

                <div style={{
                    "display": "flex",
                    "justifyContent": "space-between"
                }}>
                    <div onClick={() => {
                        this.toggleSpecificRender();
                        this.props.reset();
                    }}>
                        <TeamSpecificPokemonCard key ={this.props._id} {...this.props} 
                                                 nickName={this.state.nickName}
                                                 level={this.state.level}
                                                 stats={this.state.stats}
                                                 moves={this.state.moves}
                                                 pokemonName={this.state.pokemonName}/>            
                    </div>
                    <div>
                        <NicknameForm
                            placeholderText="Submit new nickname..."
                            onSubmit={this.submitNickname}
                        />
                        <ItemInventory selectSpecificItem={this.selectSpecificItem} selected={this.state.selectedItem}/>
                        <button onClick={this.useItem}>Use Item</button>
                    </div>

                </div>
            )

        );
    }
}

class NicknameForm extends React.Component {
    constructor (props) {
      super(props)
  
      this.state = {
        inputValue: ''
      }
    }
  
      render = () => {
        return (
          <div className="input_form">
            <form
  
              onSubmit={(e) => {
                e.preventDefault()
  
                this.props.onSubmit(this.state.inputValue)
              }}
            >
  
              <input
                className="input_text"
                type="text"
                placeholder={this.props.placeholderText}
                onChange={(e) => {
                  var value = e.target.value
  
                  this.setState({
                    inputValue: value
                  })
                }}
              />
            </form>
          </div>
  
        )
    }
}

export default Team;