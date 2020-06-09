import { apiBaseURL } from '../global';
import React from 'react';
import DexSpecificPokemonCard from "./DexSpecificPokemonCard";
import Form from './Form.js';
import { sendGetRequestWithAuthHeader } from "../global";


class Dex extends React.Component {
    state = {
        dex: [],
        current: [],
        errorMessage: "",
    };

    async componentDidMount() {
        const dexPath = '/v1/pokedex';
        const response = await sendGetRequestWithAuthHeader(apiBaseURL + dexPath);
        if (response.status == 401) {
            this.setState({
              errorMessage: "Please log in."
            })
            return;
        }

        const dex = await response.json();
  
        let monInDex = [];
        for (const pokemonName of Object.keys(dex)) {
            const caught = dex[pokemonName]
            if (caught) {
                const pokemonInfo = await this.getPokemonInDex(pokemonName);
                pokemonInfo.imageName = pokemonName;
                monInDex.push(pokemonInfo);
            }
        }
        this.setState({
            dex: monInDex,
            current: monInDex
        })
    }



    async getPokemonInDex(pokemonName) {
        const pokemonPath = '/v1/pokedex/' + pokemonName;
        const response = await sendGetRequestWithAuthHeader(apiBaseURL + pokemonPath);
        const pokemonInfo = await response.json();
        return pokemonInfo;
    }

    filter = (pokemonName) => {
        let filtered = this.state.dex.filter((pokemon) => {

            return pokemon.name.toLowerCase() === pokemonName.toLowerCase();
        });
        
        this.setState({
            current: filtered
        });
    }

    filterAutoComplete = (pokemonName) => {
        let filtered = this.state.dex.filter((pokemon) => {
            return pokemon.name.toLowerCase().startsWith(pokemonName.toLowerCase());
        });
        
        this.setState({
            current: filtered
        });
    }

    filterByDexNumberAutoComplete = (dexNumber) => {
        let filtered = this.state.dex.filter((pokemon) => {
            return pokemon.dexNumber.toString().startsWith(dexNumber.toString());
        });
        
        this.setState({
            current: filtered
        });
    }

    reset = () => {
        this.setState({
            current: this.state.dex
        });
    }

    searchMonInDex = (pokemonName) => {
        const dexNumber = parseInt(pokemonName);
        if (!pokemonName || pokemonName == "") {
            this.reset();
        } else if (!isNaN(dexNumber)) {
            this.filterByDexNumberAutoComplete(dexNumber);
        } else {
            
            this.filterAutoComplete(pokemonName);
        }
    }

    clearErrorMsg = () => {
        this.setState({
          errorMessage: ""
        })
    }

    render() {
        return(
            <div>
                <div style={{"display": "flex", "justifyContent": "center"}}>
                    <div style={{"textAlign": "center", 
                                  "width": 50+"px", 
                                  "height": 50 + "px", 
                                  "lineHeight": 50 + "px",
                                  "border": "1px solid green",
                                  "borderRadius": "10%",
                                  "marginRight": 5+"px"}}>
                        {this.state.dex.length}
                    </div>
                    <Form
                        placeholderText="Search for a pokemon..."
                        onSubmit={this.searchMonInDex}
                    />
                </div>
                <hr />
                {this.state.errorMessage && (
                    <p className="alert alert-danger">{this.state.errorMessage}</p>
                )}

                <div style={{"display": "flex", "flexWrap": "wrap"}}>
                    {this.state.current.map((pokemon => <DexGeneralPokemonCard filter={this.filter} reset = {this.reset} key={pokemon.name} {...pokemon} />))}
                </div>
            </div>

        );
    }
}

class DexGeneralPokemonCard extends React.Component {
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
                <div className="card" style={{"width": 400+ "px", "paddingTop": 10+"px", "paddingBottom": 5+"px"}} onClick={() => {
                    this.toggleSpecificRender();
                    this.props.filter(this.props.name)
                }}>
                    <img src={apiBaseURL + "/v1/pokedex/image/" + this.props.imageName} alt={this.props.name + " image"} />
                    <h3>{this.props.name}</h3>
                    <h4>{"Dex no. " + this.props.dexNumber}</h4>
                </div>
            ):(
                <div style={{"margin": "auto"}} onClick={() => {
                    this.toggleSpecificRender();
                    this.props.reset();
                }}>
                    <DexSpecificPokemonCard key ={this.props.name} {...this.props}/>    
                    <button onClick={this.props.reset}>Back</button>        
                </div>
            )
        );
    }
}

export default Dex;