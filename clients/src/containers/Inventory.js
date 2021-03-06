import { apiBaseURL } from '../global';
import React from 'react';
import { sendGetRequestWithAuthHeader } from "../global";

class Inventory extends React.Component {
    state = {
        balls: [],
        items: [],
        errorMessage: ""
    }

    async componentDidMount() {
        const inventoryPath = "/v1/inventory";
        const response = await sendGetRequestWithAuthHeader(apiBaseURL + inventoryPath);
        if (response.status == 401) {
            this.setState({
              errorMessage: "Please log in."
            })
            return;
        }

        const inventory = await response.json();

        let allBallsInfo = [];
        for (const ballName of Object.keys(inventory.balls)) {
            let ballInfo = await this.getItemInfo(ballName, "ball");
            ballInfo.remaining = inventory.balls[ballName];
            ballInfo.imageName = ballName;

            if (ballInfo) {
                allBallsInfo.push(ballInfo);
            }
        }

        let allItemsInfo = [];
        for (const itemName of Object.keys(inventory.items)) {
            let itemInfo = await this.getItemInfo(itemName, "item");
            itemInfo.remaining = inventory.items[itemName];
            itemInfo.imageName = itemName;

            if (itemInfo) {
                allItemsInfo.push(itemInfo);
            }
        }

        this.setState({
            balls: allBallsInfo,
            items: allItemsInfo
        });
    }

    async getItemInfo(itemName, type) {
        let queryType = "";
        if (type.toLowerCase() === "item") {
            queryType = "?type=item"
        } else {
            queryType = "?type=ball"
        }
        const itemPath = "/v1/items/" + itemName + queryType;
        const response = await sendGetRequestWithAuthHeader(apiBaseURL + itemPath);
        return await response.json();
    }

    render() {
        return(
            <div>
                {this.state.errorMessage && (
                    <p className="alert alert-danger">{this.state.errorMessage}</p>
                )}
                <div style={{"display": "flex", "flexWrap": "wrap"}}>
                    {this.state.balls.map((ball => 
                        <Item key={ball.imageName} {...ball} />))}
                </div>
                <div style={{"display": "flex", "flexWrap": "wrap"}}>
                    {this.state.items.map((item => 
                        <Item key={item.imageName} {...item} />))}
                </div>
            </div>

        );
    }
}

class Item extends React.Component {
    constructor (props) {
        super(props);
    }

    renderItemCard = () => {
        return(
            <div className="card" 
            style={{
                "padding": 5 +"px",
                "width": 250 + "px",
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
 
export default Inventory;