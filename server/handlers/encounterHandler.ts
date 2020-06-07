const { contentType, applicationJSON, XUser } = require("../header");
import { PokemonGacha } from "../misc/random-pokemon-generator"

export const getEncounterHandler = async (request, response) => {
    try {
        const gacha = new PokemonGacha();
        const pulledPkm = gacha.pullRandomPokemon();

        

        response.set(contentType, applicationJSON);
        response.status(200).json(pulledPkm);
    } catch(e) {
        response.status(500).send("Error: " + e);
    }
};