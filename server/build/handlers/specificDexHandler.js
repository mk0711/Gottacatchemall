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
const { contentType, applicationJSON, XUser } = require("../header");
const pokedex_1 = require("../data/pokedex");
const player_1 = require("../player");
exports.getSpecificDexHandler = (request, response, { PlayerDexModel }) => __awaiter(void 0, void 0, void 0, function* () {
    // get the pokemon name from request param
    const pokemonName = request.params["pokemonName"];
    // if the user already caught the pokemon, then get its information
    const user = JSON.parse(request.header(XUser));
    const pkmExistsInDex = yield userHasPokemon(user, pokemonName, PlayerDexModel);
    if (!pkmExistsInDex) {
        // log out mongo's eror message if unable to get pkm
        response.status(404).send("User never caught this pokemon.");
        return;
    }
    const pokemonData = pokedex_1.Pokedex[pokemonName.toLowerCase()];
    if (pokemonData) {
        response.set(contentType, applicationJSON);
        response.status(200).json(pokemonData);
    }
    else {
        response.status(404).send("Bad pokemon name");
    }
});
function userHasPokemon(user, pokemonName, PlayerModel) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pid = user.id;
            const player = new player_1.Player(pid, PlayerModel);
            const hasPkm = yield player.hasPokemonInDex(pokemonName);
            return hasPkm;
        }
        catch (e) {
            return null;
        }
    });
}
//# sourceMappingURL=specificDexHandler.js.map