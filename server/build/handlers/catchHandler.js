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
const { XUser } = require("../header");
const catch_simulator_1 = require("../misc/catch-simulator");
const player_1 = require("../player");
exports.getCatchHandler = (request, response, { PlayerModel }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = JSON.parse(request.header(XUser));
    const pokemonName = request.params["pokemonName"];
    // if no ball request parameter present then use pokeball
    let ballName = request.query.ball;
    if (!ballName) {
        ballName = "pokeball";
    }
    const success = yield userTryToCatchPokemon(user, ballName, pokemonName, PlayerModel);
    if (success) {
        response.status(200).send("Catch " + pokemonName + " successful!");
        return;
    }
    else {
        response.status(200).send("Catch " + pokemonName + " failed :(");
    }
});
function userTryToCatchPokemon(user, ballName, pokemonName, PlayerModel) {
    return __awaiter(this, void 0, void 0, function* () {
        const pid = user.id;
        const player = new player_1.Player(pid, PlayerModel);
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
//# sourceMappingURL=catchHandler.js.map