const { contentType, applicationJSON, textPlain, XUser } = require("../header");
import { Moves } from "../data/moves"

export const getSpecificMoveHandler = async (request, response) => {
    try {
        // if the user already caught the pokemon, then get its information

        const moveName = request.params["moveName"];

        const moveInfo = Moves[moveName];
        if (!moveInfo) {
            response.set(contentType, textPlain);
            response.status(400).send("Bad reqest");
            return;
        } else {
            response.set(contentType, applicationJSON);
            response.status(200).json(moveInfo);
        }
    } catch(e) {
        response.status(500).send("There was an error getting your team. Error: " + e);
    }
}

