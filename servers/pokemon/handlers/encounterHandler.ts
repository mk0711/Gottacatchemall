const { contentType, applicationJSON, XUser, textPlain } = require("../header");
import { PokemonGacha } from "../misc/random-pokemon-generator";
import { Player } from "../player";

export const getEncounterHandler = async (request, response, { PlayerModel }) => {
    try {
        const gacha = new PokemonGacha();
        const pulledPkm = gacha.pullRandomPokemon();

        const user = JSON.parse(request.header(XUser));

        const pid: number = user.id;
        const player = new Player(pid, PlayerModel);

        const playerAlreadyInEncounter = await player.isAlreadyInEncounter();

        if (playerAlreadyInEncounter) {
            const currEncounter = await player.getCurrentEncounter();
            response.set(contentType, applicationJSON);
            response.status(200).send(currEncounter);
        } else {
            await player.setEncounter(pulledPkm.pokemonName, pulledPkm.rarity);
            response.set(contentType, applicationJSON);
            response.status(200).json(pulledPkm);
        }
    } catch(e) {
        response.status(500).send("Error: " + e);
    }
};
