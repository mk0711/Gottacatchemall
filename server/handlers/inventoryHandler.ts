const { contentType, XUser, applicationJSON } = require("../header");
import { Player } from "../player";

export const getInventoryHandler = async (request, response, {PlayerModel}) => {
    const user = JSON.parse(request.header(XUser));

    const inven = await getUserInventory(user, PlayerModel);
    if (inven) {
        response.set(contentType, applicationJSON);
        response.status(200).json(inven);
    } else {
        response.status(500).json("Failed to fetch inventory");
    }
}

async function getUserInventory(user, PlayerModel) {
    try {
        const pid: number = user.id;
        const player = new Player(pid, PlayerModel);
        return await player.getInventory();
    } catch (e) {
        return null;
    }
}