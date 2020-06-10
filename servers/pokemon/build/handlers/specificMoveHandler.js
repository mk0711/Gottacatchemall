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
const { contentType, applicationJSON, textPlain, XUser } = require("../header");
const moves_1 = require("../data/moves");
exports.getSpecificMoveHandler = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // if the user already caught the pokemon, then get its information
        const moveName = request.params["moveName"];
        const moveInfo = moves_1.Moves[moveName];
        if (!moveInfo) {
            response.set(contentType, textPlain);
            response.status(400).send("Bad reqest");
            return;
        }
        else {
            response.set(contentType, applicationJSON);
            response.status(200).json(moveInfo);
        }
    }
    catch (e) {
        response.status(500).send("There was an error getting your team. Error: " + e);
    }
});
//# sourceMappingURL=specificMoveHandler.js.map