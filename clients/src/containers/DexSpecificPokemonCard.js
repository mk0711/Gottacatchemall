import React from "react";
import { apiBaseURL, typeColorMap } from "../global";


class DexSpecificPokemonCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    renderAbilities() {
        return(
            <div>
                <p>{"0: " + this.props.abilities["0"]}</p>
                {this.props.abilities["1"] ? <p>{"1: " + this.props.abilities["1"]}</p> : <p></p>}
                <p>{"H: " + this.props.abilities["H"]}</p>
            </div>
        )
    }

    renderTypes() {
        let colors = [];
        this.props.types.forEach(type => {
            colors.push(
                <div key={type}
                    style={{
                    "backgroundColor": typeColorMap[type.toLowerCase()],
                    "padding": 5 + "px",
                    "border": "1px solid #9C531F",
                    "borderRadius": "3px",
                    "color": "#FFFFFF",
                    "width": 70+ "px"
                    }}>
                    {type}
                </div>
            )
        });
        return(
            <div style={{"display": "flex", "justifyContent": "center"}}>
                {colors}
            </div>
        );
    }

    render() {
        return(
            <div>
                <div className="card" style={{"padding": 10+ "px"}}>

                    <img src={apiBaseURL + "/v1/pokedex/image/" + this.props.imageName} alt={this.props.name + " image"} />
                    <h3>{this.props.name}</h3>
                    <h4>{"Dex no. " + this.props.dexNumber}</h4>
                    <p>{"Desc: " + this.props.desc}</p>
                    <p>{"Type: "}</p>
                    {this.renderTypes()}
                    <br/>
                    <p>{"Abilities:"}</p>
                    {this.renderAbilities()}
                    <br/>
                    <p>{"Height: " + this.props.height + "m"}</p>
                    <p>{"Weight: " + this.props.weight + "kg"}</p>
                    <p>{"Egg group: " + this.props.eggGroups}</p>
                    <br/>
                    <StatBar baseStats={this.props.baseStats}/>
                </div>
            </div>
        );
    }
}

class StatBar extends React.Component {
    render() {
        return(                
            <table style= {{"marginLeft": "auto", "marginRight": "auto"}}>
                <tbody>
                    <tr style={{background: "#9DB7F5"}}>
                        <th style={{"textAlign": "center"}}>Stat</th>
                    </tr>

                    {/* HP */}
                    <tr style={{background: "#FF5959", 
                                "textAlign": "center"}}>
                        <th style={{"width": 85 + "px",
                                    "paddingLeft": 0.5 + "em",
                                    "paddingRight":0.5 +"em"}}>
                            <div style={{"float":"left"}}>
                                <span style={{"color":"#000"}}>HP:</span>
                            </div>
                            <div style={{"float":"right"}}>{this.props.baseStats.hp}</div>
                        </th>
                        <td style={{"width": 255 + "px"}}>
                            <div style={{"backgroundColor": "#FF0000",
                                        "border": 1 +"px solid #A60000",
                                        "width": "calc(100% * " + this.props.baseStats.hp + " /255)",
                                        "height":20 +"px"}}></div>
                        </td>
                    </tr>

                    {/* ATK */}
                    <tr style={{background: "#F5AC78", 
                                "textAlign": "center"}}>
                        <th style={{"width": 85 + "px",
                                    "paddingLeft": 0.5 + "em",
                                    "paddingRight":0.5 +"em"}}>
                            <div style={{"float":"left"}}>
                                <span style={{"color":"#000"}}>ATK:</span>
                            </div>
                            <div style={{"float":"right"}}>{this.props.baseStats.atk}</div>
                        </th>
                        <td style={{"width": 255 + "px"}}>
                            <div style={{"backgroundColor": "#F08030",
                                        "border": 1 +"px solid #9C531F",
                                        "width": "calc(100% * " + this.props.baseStats.atk + " /255)",
                                        "height":20 +"px"}}></div>
                        </td>
                    </tr>

                    {/* DEF */}
                    <tr style={{background: "#FAE078", 
                                "textAlign": "center"}}>
                        <th style={{"width": 85 + "px",
                                    "paddingLeft": 0.5 + "em",
                                    "paddingRight":0.5 +"em"}}>
                            <div style={{"float":"left"}}>
                                <span style={{"color":"#000"}}>DEF:</span>
                            </div>
                            <div style={{"float":"right"}}>{this.props.baseStats.def}</div>
                        </th>
                        <td style={{"width": 255 + "px"}}>
                            <div style={{"backgroundColor": "#F8D030",
                                        "border": 1 +"px solid #A1871F",
                                        "width": "calc(100% * " + this.props.baseStats.def + " /255)",
                                        "height":20 +"px"}}></div>
                        </td>
                    </tr>

                    {/* SPA */}
                    <tr style={{background: "#9DB7F5", 
                                "textAlign": "center"}}>
                        <th style={{"width": 85 + "px",
                                    "paddingLeft": 0.5 + "em",
                                    "paddingRight":0.5 +"em"}}>
                            <div style={{"float":"left"}}>
                                <span style={{"color":"#000"}}>SPA:</span>
                            </div>
                            <div style={{"float":"right"}}>{this.props.baseStats.spa}</div>
                        </th>
                        <td style={{"width": 255 + "px"}}>
                            <div style={{"backgroundColor": "#6890F0",
                                        "border": 1 +"px solid #445E9C",
                                        "width": "calc(100% * " + this.props.baseStats.spa + " /255)",
                                        "height":20 +"px"}}></div>
                        </td>
                    </tr>         

                    {/* SPD */}
                    <tr style={{background: "#A7DB8D", 
                                "textAlign": "center"}}>
                        <th style={{"width": 85 + "px",
                                    "paddingLeft": 0.5 + "em",
                                    "paddingRight":0.5 +"em"}}>
                            <div style={{"float":"left"}}>
                                <span style={{"color":"#000"}}>SPD:</span>
                            </div>
                            <div style={{"float":"right"}}>{this.props.baseStats.spd}</div>
                        </th>
                        <td style={{"width": 255 + "px"}}>
                            <div style={{"backgroundColor": "#78C850",
                                        "border": 1 +"px solid #4E8234",
                                        "width": "calc(100% * " + this.props.baseStats.spd + " /255)",
                                        "height":20 +"px"}}></div>
                        </td>
                    </tr>

                    {/* SPE */}
                    <tr style={{background: "#FA92B2", 
                                "textAlign": "center"}}>
                        <th style={{"width": 85 + "px",
                                    "paddingLeft": 0.5 + "em",
                                    "paddingRight":0.5 +"em"}}>
                            <div style={{"float":"left"}}>
                                <span style={{"color":"#000"}}>SPE:</span>
                            </div>
                            <div style={{"float":"right"}}>{this.props.baseStats.spe}</div>
                        </th>
                        <td style={{"width": 255 + "px"}}>
                            <div style={{"backgroundColor": "#F85888",
                                        "border": 1 +"px solid #A13959",
                                        "width": "calc(100% * " + this.props.baseStats.spe + " /255)",
                                        "height":20 +"px"}}></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default DexSpecificPokemonCard;