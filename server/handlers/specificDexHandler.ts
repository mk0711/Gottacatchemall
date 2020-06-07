const { contentType, applicationJSON, XUser } = require("../header");
import { Pokedex } from "../data/pokedex";
import { Player } from "../player";

export const getSpecificDexHandler = async (request, response, { PlayerDexModel }) => {
    // get the pokemon name from request param
    const pokemonName = request.params["pokemonName"];

    // if the user already caught the pokemon, then get its information
    const user = JSON.parse(request.header(XUser));
    const pkmExistsInDex = await userHasPokemon(user, pokemonName, PlayerDexModel);
    if (!pkmExistsInDex) {
        // log out mongo's eror message if unable to get pkm
        response.status(404).send("User never caught this pokemon.");
        return;
    }

    const pokemonData = Pokedex[pokemonName.toLowerCase()];
    if (pokemonData) {
        response.set(contentType, applicationJSON);
        response.status(200).json(pokemonData);
    } else {
        response.status(404).send("Bad pokemon name");
    }
}

async function userHasPokemon(user, pokemonName: string, PlayerModel) {
    try {
        const pid: number = user.id;
        const player = new Player(pid, PlayerModel);
        const hasPkm = await player.hasPokemonInDex(pokemonName);
        return hasPkm;
    } catch(e) {
        return null;
    }
}