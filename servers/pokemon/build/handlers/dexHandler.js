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
const { contentType, applicationJSON, XUser } = require("../header");
// GET: respond with the current user's pokedex
exports.getDexHandler = (request, response, { PlayerModel }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // xUser will never be null here
        const user = JSON.parse(request.header(XUser));
        const userDex = yield getUserDex(user, PlayerModel);
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
        return;
    }
});
function getUserDex(user, PlayerModel) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pid = user.id;
            const player = new player_1.Player(pid, PlayerModel);
            const dex = yield player.getDex();
            return dex;
        }
        catch (e) {
            console.log(e);
            return null;
        }
    });
}
//# sourceMappingURL=dexHandler.js.map