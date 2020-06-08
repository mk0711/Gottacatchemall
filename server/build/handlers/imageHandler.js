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
const path = require("path");
const fs = require("fs");
exports.getImageHandler = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const pokemonName = request.params["pokemonName"].toLowerCase();
    const url = path.resolve("../server/data/image/" + pokemonName + ".png");
    const fileExists = fs.stat(url, (err, stat) => {
        if (err == null) {
            response.set(contentType, 'image/png');
            response.sendFile(url);
        }
        else {
            response.set(contentType, textPlain);
            response.status(400).send("Error: No such image for pokemon found.");
        }
    });
    // if (fileExists) {
    //     response.set(contentType, 'image/png');
    //     response.sendFile(url);
    // } else {
    //     response.set(contentType, textPlain);
    //     response.status(400).send("Error: No such image for pokemon found.");
    // }
});
//# sourceMappingURL=imageHandler.js.map