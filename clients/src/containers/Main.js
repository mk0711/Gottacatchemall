import React from 'react'

import { apiBaseURL, rarityColorMap } from '../global'
import TeamSpecificPokemonCard from "./TeamPokemonCard";
import BallInventory from "./BallInventory";
import { sendGetRequestWithAuthHeader } from "../global";

class MainPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            searchResults: [],
            names: [],
            one: '', // one is just a test variable
            images: [],
            pokemon: [],
            savedPokemon: new Map(),
            encountering: {
              isEncountering: false,
              pokemonName: "",
              rarity: "",
            },
            isAlreadyCaughtBefore: false,
            caught: false,
            caughtPokemon: null,
            pokeball: "pokeball",
            isSelectingBall: false,
            errorMessage: "",
        }
    }

    async componentDidMount() {
      try {
        const dexPath = '/v1/pokedex';
        const response = await sendGetRequestWithAuthHeader(apiBaseURL + dexPath);
        if (response.status === 401) {
          this.setState({
            errorMessage: "Please log in."
          })
        } else {
          this.clearErrorMsg();
          const dex = await response.json();
  
          let caughtMon = []
          for (const pokemonName of Object.keys(dex)) {
              const caught = dex[pokemonName]
              if (caught) {
                  caughtMon.push(pokemonName)
              }
              this.setState({ caughtMon: caughtMon })
          }
        }
      } catch(e) {
        console.log(e);
      }
    }

    encounter = async () => {
      const encounterPath = "/v1/encounter";
      const response = await sendGetRequestWithAuthHeader(apiBaseURL + encounterPath);
      if (response.status === 401) {
        this.setState({
          errorMessage: "Please log in."
        })
      } else {
        this.clearErrorMsg();
        const data = await response.json();

        if (this.state.caughtPokemon) {
          this.setState({
            caughtPokemon: null
          });
        }
  
        this.setState({encountering: {
          isEncountering: true,
          pokemonName: data.pokemonName,
          rarity: data.rarity,
        }, isAlreadyCaughtBefore: await this.isCaught(data.pokemonName)})
      }

    }

    runaway = async () => {
      const runawayPath = "/v1/runaway";
      const response = await sendGetRequestWithAuthHeader(apiBaseURL + runawayPath);

      const data = await response.text();
      

      this.setState({encountering: {
        isEncountering: false
      }})
    }

    catch = async () => {
      const catchPath = "/v1/catch/" + this.state.encountering.pokemonName + "?ball=" + this.state.pokeball;
      const response = await sendGetRequestWithAuthHeader(apiBaseURL + catchPath);

      const data = await response.json();

      if (data.status === "success") {
        this.setState({
          encountering: {
            isEncountering: false
          },
          caughtPokemon: data.pokemon
        });
      } else {
        alert("Catch failed!");
      }
    }

    changeBall = async () => {
      const inventoryPath = "/v1/inventory";
      const response = await sendGetRequestWithAuthHeader(apiBaseURL + inventoryPath);

      const inventory = await response.json();
      this.setState({
        isSelectingBall: true
      });
    }

    selectSpecificBall = (ballName) => {
      this.setState({
        pokeball: ballName
      })
    }

    isCaught = async (pokemonName) => {
      const dexPath = '/v1/pokedex';
      const response = await sendGetRequestWithAuthHeader(apiBaseURL + dexPath);

      const dex = await response.json();
      return dex[pokemonName];
    }

    clearErrorMsg = () => {
      this.setState({
        errorMessage: ""
      })
    }

    render = () => {
        return (
          <div>
            {this.state.errorMessage && (
              <p className="alert alert-danger">{this.state.errorMessage}</p>
            )}

            {!this.state.isSelectingBall ? (
              <div>
                {!this.state.encountering.isEncountering ? (
                  <button onClick={this.encounter}>
                    Encounter
                  </button>
                ) : (
                  <div>
                    <button onClick={this.catch}>
                      Catch
                    </button>
                    <button onClick={this.runaway}>  
                      Run Away
                    </button>
                    <br/>
                    <br/>
                    <div style={{"display": "flex", "justifyContent": "center"}}>
                      <h3>{"Using ball: "}</h3>
                      <img  style = {{"width": 50+ "px", "height": 50 + "px"}} 
                            src={apiBaseURL + "/v1/items/image/" + this.state.pokeball} 
                            alt={this.state.pokeball + " image"} />
                      <button 
                        style={{"marginLeft": 10 + "px"}}
                        onClick={this.changeBall}>Change ball</button>
                    </div>
                    <h2>Encountering:</h2>
                    <div className="card" style={{
                    "width": 400+ "px", 
                    "border": 2 + "px solid",
                    "borderColor": rarityColorMap[this.state.encountering.rarity],
                    "paddingTop": 10 + "px",
                    "paddingBottom": 5 + "px"
                    }}>
                      <img src={apiBaseURL + "/v1/pokedex/image/" + this.state.encountering.pokemonName} alt={this.props.name + " image"} />
                      <h3>{this.state.encountering.pokemonName}</h3>
                      <h4>
                        <span>Rarity: </span>
                        <span style={{"color": rarityColorMap[this.state.encountering.rarity]}}>{this.state.encountering.rarity}</span>
                      </h4>
                      {this.state.isAlreadyCaughtBefore ? (
                        <h4 style={{"color": "green"}}>Already Caught</h4>
                      ) : (
                        <div></div>
                      )
                      }
                    </div>
                  </div>
                )}
                {this.state.caughtPokemon && 
                  <div>
                    <h2>{"Yes! " + this.state.caughtPokemon.pokemonName + " was caught!"}</h2>
                    <TeamSpecificPokemonCard {...this.state.caughtPokemon}/>
                  </div>
                }
              </div>
            ) : (
              <div>
                <BallInventory selectSpecificBall={this.selectSpecificBall} selected={this.state.pokeball}/>
                <button onClick={() => {
                  this.setState({
                    isSelectingBall: false
                  })
                }}>Back</button>
              </div>
            )} 
          </div>
          
        )
    }
}

export default MainPage
