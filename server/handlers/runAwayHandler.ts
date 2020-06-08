const { contentType, applicationJSON, XUser, textPlain } = require("../header");
import { Player } from "../player";

export const runAwayHandler = async (request, response, { PlayerModel }) => {
    try {

        const user = JSON.parse(request.header(XUser));

        const pid: number = user.id;
        const player = new Player(pid, PlayerModel);

        const playerAlreadyInEncounter = await player.isAlreadyInEncounter();

        if (playerAlreadyInEncounter) {
            await player.runAwayFromEncounter();
            response.set(contentType, textPlain);
            response.status(200).send("Ran away successfully!");
        } else {
            response.set(contentType, textPlain);
            response.status(400).send("You are not in encounter with any pokemon.");
        }

    } catch(e) {
        response.status(500).send("Error: " + e);
    }
};
