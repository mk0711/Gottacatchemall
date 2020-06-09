const { contentType, applicationJSON, XUser, textPlain } = require("../header");
const path = require("path");
const fs = require("fs");

export const getPokemonImageHandler = async (request, response) => {
    const pokemonName = request.params["pokemonName"].toLowerCase();
    const url = path.resolve("./data/pokemonImage/" + pokemonName + ".png");

    fs.stat(url, (err) => {
        if (err == null) {
            response.set(contentType, 'image/png');
            response.sendFile(url);
        } else {
            response.set(contentType, textPlain);
            response.status(400).send("Error: No such image for pokemon found.");
        }
    });
};


export const getItemImageHandler = async (request, response) => {
    const itemName = request.params["itemName"].toLowerCase();
    const url = path.resolve("./data/itemImage/" + itemName + ".png");

    fs.stat(url, (err) => {
        if (err == null) {
            response.set(contentType, 'image/png');
            response.sendFile(url);
        } else {
            response.set(contentType, textPlain);
            response.status(400).send("Error: No such image for item found.");
        }
    });
};
