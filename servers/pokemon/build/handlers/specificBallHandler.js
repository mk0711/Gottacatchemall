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
const balls_1 = require("../data/balls");
const items_1 = require("../data/items");
exports.getSpecificBallHandler = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    // get the pokemon name from request param
    const itemName = request.params["itemName"];
    // if no type request parameter present then use pokeball
    let itemType = request.query.type;
    let itemMap;
    if (!itemType) {
        itemMap = balls_1.Pokeballs;
    }
    else if (itemType.toLowerCase() === "ball") {
        itemMap = balls_1.Pokeballs;
    }
    else if (itemType.toLowerCase() === "item") {
        itemMap = items_1.Items;
    }
    else {
        itemMap = balls_1.Pokeballs;
    }
    const item = itemMap[itemName.toLowerCase()];
    if (item) {
        response.set(contentType, applicationJSON);
        response.status(200).json(item);
    }
    else {
        response.status(400).send("Bad item name");
    }
});
//# sourceMappingURL=specificBallHandler.js.map