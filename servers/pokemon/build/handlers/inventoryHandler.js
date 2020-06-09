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
const { contentType, XUser, applicationJSON } = require("../header");
const player_1 = require("../player");
exports.getInventoryHandler = (request, response, { PlayerModel }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = JSON.parse(request.header(XUser));
    const inven = yield getUserInventory(user, PlayerModel);
    if (inven) {
        response.set(contentType, applicationJSON);
        response.status(200).json(inven);
    }
    else {
        response.status(500).json("Failed to fetch inventory");
    }
});
function getUserInventory(user, PlayerModel) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pid = user.id;
            const player = new player_1.Player(pid, PlayerModel);
            return yield player.getInventory();
        }
        catch (e) {
            return null;
        }
    });
}
//# sourceMappingURL=inventoryHandler.js.map