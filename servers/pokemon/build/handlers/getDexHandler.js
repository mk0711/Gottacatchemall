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
const player_1 = require("../player");
const pokedex_1 = require("../data/pokedex");
const { contentType, applicationJSON, XUser } = require("../header");
// /v1/getDex: refers to the current user's pokedex
// GET: respond with the current user's pokedex
exports.getDexHandler = (request, response, { PlayerDexModel }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // xUser will never be null here
        const user = JSON.parse(request.header(XUser));
        const userDex = yield getUserDex(user, PlayerDexModel);
        if (!userDex) {
            // log out mongo's eror message if unable to get dex
            response.status(500).send("There was an error getting dex.");
            return;
        }
        response.set(contentType, applicationJSON);
        response.status(200).json(userDex);
        return;
    }
    catch (e) {
        response.status(500).send("There was an error getting dex. Error: " + e);
    }
});
function getUserDex(user, PlayerDexModel) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pid = user.id;
            const player = new player_1.Player(pid, PlayerDexModel);
            const dex = yield player.getDex();
            return dex;
        }
        catch (e) {
            return null;
        }
    });
}
const getSpecificDexHandler = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (request.get(contentType) !== applicationJSON) {
        response.status(400).send("Bad request. Application type must be JSON");
        return;
    }
    // get the pokemon name from request body
    const { pokemonName } = request.body;
    const pokemonData = pokedex_1.Pokedex[pokemonName.toLowerCase()];
    if (!pokemonData) {
        // can't find the pokemon from the dex
        response.set(contentType, applicationJSON);
        response.status(200).json(pokemonData);
    }
    else {
        response.set(contentType, applicationJSON);
        response.status(404).send("Bad pokemon name");
    }
});
//# sourceMappingURL=getDexHandler.js.map