"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { contentType, applicationJSON, XUser, textPlain } = require("../header");
const random_pokemon_generator_1 = require("../misc/random-pokemon-generator");
const player_1 = require("../player");
exports.getEncounterHandler = (request, response, { PlayerModel }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gacha = new random_pokemon_generator_1.PokemonGacha();
        const pulledPkm = gacha.pullRandomPokemon();
        const user = JSON.parse(request.header(XUser));
        const pid = user.id;
        const player = new player_1.Player(pid, PlayerModel);
        const playerAlreadyInEncounter = yield player.isAlreadyInEncounter();
        if (playerAlreadyInEncounter) {
            response.set(contentType, textPlain);
            response.status(200).send("You are already encountering " + (yield player.getCurrentEncounter()));
        }
        else {
            yield player.setEncounter(pulledPkm.pokemonName);
            response.set(contentType, applicationJSON);
            response.status(200).json(pulledPkm);
        }
    }
    catch (e) {
        response.status(500).send("Error: " + e);
    }
});
//# sourceMappingURL=encounterHandler.js.map