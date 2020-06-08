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
const catch_simulator_1 = require("../misc/catch-simulator");
const player_1 = require("../player");
const battle_pokemon_1 = require("../misc/battle-pokemon");
exports.getCatchHandler = (request, response, { PlayerModel, BattlePokemonModel }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = JSON.parse(request.header(XUser));
    const pid = user.id;
    const player = new player_1.Player(pid, PlayerModel);
    const pokemonName = request.params["pokemonName"];
    // check if the player is already encountering a different pokemon
    const pokemonEncountering = yield player.getCurrentEncounter();
    if (!pokemonEncountering) {
        response.status(400).send("You are not in an encounter with any pokemon.");
        return;
    }
    if (pokemonEncountering.toLowerCase() !== pokemonName.toLowerCase()) {
        response.status(400).send("You are already in an encounter with " + pokemonEncountering);
        return;
    }
    // if no ball request parameter present then use pokeball
    let ballName = request.query.ball;
    if (!ballName) {
        ballName = "pokeball";
    }
    const success = yield playerTryToCatchPokemon(player, ballName, pokemonName);
    if (success) {
        // add to the player's team if caught
        yield addPokemonToPlayerTeamAndSendAsResponse(player.getID(), pokemonName, BattlePokemonModel, response);
        return;
    }
    else {
        response.status(200).send("Catch " + pokemonName + " failed :(");
        return;
    }
});
function playerTryToCatchPokemon(player, ballName, pokemonName) {
    return __awaiter(this, void 0, void 0, function* () {
        const hasBall = yield player.hasBall(ballName);
        if (hasBall) {
            const catcher = new catch_simulator_1.PokemonCatcher();
            const caught = catcher.catchPokemon(pokemonName.toLowerCase(), ballName.toLowerCase());
            //add to dex if caught
            if (caught) {
                yield player.useBallToCatch(ballName, pokemonName);
            }
            else {
                yield player.useBallFailToCatch(ballName);
            }
            return caught;
        }
        else {
            return false;
        }
    });
}
function addPokemonToPlayerTeamAndSendAsResponse(pid, pokemonName, PokemonModel, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const pokemon = new battle_pokemon_1.BattlePokemon(pid, pokemonName, null);
        const pokemonObj = pokemon.getPokemonObj();
        const query = new PokemonModel(pokemonObj);
        yield query.save((err) => {
            if (err) {
                console.log(err);
            }
            response.set(contentType, applicationJSON);
            response.status(200).json(pokemonObj);
            return;
        });
    });
}
//# sourceMappingURL=catchHandler.js.map