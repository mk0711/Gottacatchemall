import { apiBaseURL } from '../global';
import React from 'react';
import { sendGetRequestWithAuthHeader } from "../global";

class ItemInventory extends React.Component {
    state = {
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

        let allItemsInfo = [];
        for (const itemName of Object.keys(inventory.items)) {
            let itemInfo = await this.getItemInfo(itemName);
            itemInfo.remaining = inventory.items[itemName];
            itemInfo.imageName = itemName;

            if (itemInfo) {
                allItemsInfo.push(itemInfo);
            }
        }

        this.setState({
            items: allItemsInfo
        });
    }

    async getItemInfo(itemName) {
        const itemPath = "/v1/items/" + itemName + "?type=item";
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
                    {this.state.items.map((item => 
                        <Item selected ={this.props.selected}
                              selectSpecificItem={this.props.selectSpecificItem}  
                              key={item.imageName} {...item} />))}
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
        const selected = this.props.selected === this.props.imageName;
        const border = selected ? "1px solid black": "";

        return(
            <div className="card" 
            onClick={() => {
                this.props.selectSpecificItem(this.props.imageName)
            }}
            style={{
                "padding": 5 +"px",
                "width": 150 + "px",
                "border": border
            }}>
                <img style = {{"width": 50+ "px", "height": 50 + "px"}} 
                     src={apiBaseURL + "/v1/items/image/" + this.props.imageName} 
                     alt={this.props.itemName + " image"} />
                <h4>{this.props.itemName}</h4>
                {/* <h4>{"Remaining: " + this.props.remaining}</h4> */}
            </div>
        );
    }


    render() {
        return(
            this.renderItemCard()
        );
    }
}
 
export default ItemInventory;