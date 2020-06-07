import { Player } from "../player";

const { contentType, applicationJSON, XUser } = require("../header");

// GET: respond with the current user's pokedex
export const getDexHandler = async (request, response, { PlayerModel }) => {
    try {
        // xUser will never be null here
        const user = JSON.parse(request.header(XUser));
        const userDex = await getUserDex(user, PlayerModel);
        if (!userDex) {
            // log out mongo's eror message if unable to get dex
            response.status(500).send("There was an error getting dex.");
            return;
        }
        response.set(contentType, applicationJSON);
        response.status(200).json(userDex);
        return;
    } catch (e) {
        response.status(500).send("There was an error getting dex. Error: " + e);
        return;
    }
};

async function getUserDex(user, PlayerModel) {
    try {
        const pid: number = user.id;
        const player = new Player(pid, PlayerModel);
        const dex = await player.getDex();
        return dex;
    } catch(e) {
        console.log(e);
        return null;
    }
}



