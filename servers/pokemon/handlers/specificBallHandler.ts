const { contentType, applicationJSON, XUser } = require("../header");
import { Pokeballs } from "../data/balls";

export const getSpecificBallHandler = async (request, response) => {
    // get the pokemon name from request param
    const ballName = request.params["ballName"];

    const ball = Pokeballs[ballName.toLowerCase()];
    if (ball) {
        response.set(contentType, applicationJSON);
        response.status(200).json(ball);
    } else {
        response.status(400).send("Bad item name");
    }
}
