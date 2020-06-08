const { contentType, applicationJSON, XUser, textPlain } = require("../header");
import { Pokedex } from "../data/pokedex";
const path = require("path");
const fs = require("fs");

export const getImageHandler = async (request, response) => {
    const pokemonName = request.params["pokemonName"].toLowerCase();
    const url = path.resolve("../server/data/image/" + pokemonName + ".png");

    const fileExists = fs.stat(url, (err, stat) => {
        if (err == null) {
            response.set(contentType, 'image/png');
            response.sendFile(url);
        } else {
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

};
