const {  XUser } = require("../header");
import { PokemonCatcher } from "../misc/catch-simulator";
import { Player } from "../player";

export const getCatchHandler = async (request, response, {PlayerModel}) => {
    const user = JSON.parse(request.header(XUser));

    const pokemonName = request.params["pokemonName"];

    // if no ball request parameter present then use pokeball
    let ballName = request.query.ball;
    if (!ballName) {
        ballName = "pokeball";
    }

    const success = await userTryToCatchPokemon(user, ballName, pokemonName, PlayerModel);
    if (success) {
        response.status(200).send("Catch " + pokemonName + " successful!");
        return;
    } else {
        response.status(200).send("Catch " + pokemonName + " failed :(");
    }
}

async function userTryToCatchPokemon(user, ballName: string, pokemonName: string, PlayerModel) {
    const pid: number = user.id;
    const player = new Player(pid, PlayerModel);
    const hasBall = await player.hasBall(ballName);
    if (hasBall) {
        const catcher = new PokemonCatcher();
        const caught = catcher.catchPokemon(pokemonName.toLowerCase(), ballName.toLowerCase());

        //add to dex if caught
        if (caught) {
            await player.useBallToCatch(ballName, pokemonName);
        } else {
            await player.useBallFailToCatch(ballName);
        }
        return caught;
    } else {
        return false;
    }

}