import { apiBaseURL } from '../global';
import React from 'react';
import { sendGetRequestWithAuthHeader } from "../global";

class BallInventory extends React.Component {
    state = {
        balls: []
    }

    async componentDidMount() {
        const inventoryPath = "/v1/inventory";
        const response = await sendGetRequestWithAuthHeader(apiBaseURL + inventoryPath);
        const inventory = await response.json();

        let allBallsInfo = [];
        for (const ballName of Object.keys(inventory.balls)) {
            let ballInfo = await this.getBallInfo(ballName);
            ballInfo.remaining = inventory.balls[ballName];
            ballInfo.imageName = ballName;

            if (ballInfo) {
                allBallsInfo.push(ballInfo);
            }
        }

        this.setState({
            balls: allBallsInfo
        });
    }

    async getBallInfo(ballName) {
        const itemPath = "/v1/items/balls/" + ballName;
        const response = await sendGetRequestWithAuthHeader(apiBaseURL + itemPath);
        return await response.json();
    }

    render() {
        return(
            <div style={{"display": "flex", "flexWrap": "wrap"}}>
                {this.state.balls.map((ball => 
                    <Item selectSpecificBall={this.props.selectSpecificBall} 
                          selected ={this.props.selected}
                          key={ball.imageName} 
                          {...ball} />))}
            </div>
        );
    }
}

class Item extends React.Component {
    renderItemCard = () => {

        const selected = this.props.selected === this.props.imageName;
        const border = selected ? "2px solid black": "";
        return(
            <div className="card" 
            onClick={() => {
                this.props.selectSpecificBall(this.props.imageName)
            }}
            style={{
                "padding": 5 +"px",
                "width": 250 + "px",
                "border": border
            }}>
                <img style = {{"width": 150+ "px", "height": 150 + "px"}} 
                     src={apiBaseURL + "/v1/items/image/" + this.props.imageName} 
                     alt={this.props.itemName + " image"} />
                <h4>{this.props.itemName}</h4>
                <p>{this.props.desc}</p>
                <h4>{"Remaining: " + this.props.remaining}</h4>
            </div>
        );
    }


    render() {
        return(
            this.renderItemCard()
        );
    }
}
 
export default BallInventory;