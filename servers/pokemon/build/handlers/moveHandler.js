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
exports.getMoveHandler = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // if the user already caught the pokemon, then get its information
        response.set(contentType, applicationJSON);
        response.status(200).json(pokemons);
    }
    catch (e) {
        response.status(500).send("There was an error getting your team. Error: " + e);
    }
});
//# sourceMappingURL=moveHandler.js.map