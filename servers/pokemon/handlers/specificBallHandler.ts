const { contentType, applicationJSON, XUser } = require("../header");
import { Pokeballs } from "../data/balls";
import { Items } from "../data/items";

export const getSpecificBallHandler = async (request, response) => {
    // get the pokemon name from request param
    const itemName = request.params["itemName"];

    // if no type request parameter present then use pokeball
    let itemType = request.query.type;
    let itemMap;
    if (!itemType) {
        itemMap = Pokeballs;
    } else if (itemType.toLowerCase() === "ball") {
        itemMap = Pokeballs;
    } else if (itemType.toLowerCase() === "item") {
        itemMap = Items;
    } else {
        itemMap= Pokeballs;
    }
 

    const item = itemMap[itemName.toLowerCase()];
    if (item) {
        response.set(contentType, applicationJSON);
        response.status(200).json(item);
    } else {
        response.status(400).send("Bad item name");
    }
}
