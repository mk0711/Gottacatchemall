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
const battle_pokemon_1 = require("../misc/battle-pokemon");
const player_1 = require("../player");
const { contentType, applicationJSON, textPlain, XUser } = require("../header");
exports.getSpecificTeamHandler = (request, response, { BattlePokemonModel }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // if the user already caught the pokemon, then get its information
        const user = JSON.parse(request.header(XUser));
        const pokemonID = request.params["pokemonID"];
        const pokemon = yield BattlePokemonModel.findById(pokemonID);
        if (!pokemon || user.id != pokemon.owner_id) {
            response.set(contentType, textPlain);
            response.status(400).json("User does not have this pokemon");
            return;
        }
        response.set(contentType, applicationJSON);
        response.status(200).json(pokemon);
    }
    catch (e) {
        response.status(500).send("There was an error getting your team. Error: " + e);
    }
});
exports.postSpecificTeamHandler = (request, response, { BattlePokemonModel, PlayerModel }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (request.get(contentType) !== applicationJSON) {
            response.status(400).send("Bad request. Application type must be JSON");
            return;
        }
        // if the user already caught the pokemon, then get its information
        const user = JSON.parse(request.header(XUser));
        const pokemonID = request.params["pokemonID"];
        const pokemon = yield BattlePokemonModel.findById(pokemonID);
        if (!pokemon || user.id != pokemon.owner_id) {
            response.set(contentType, textPlain);
            response.status(400).json("User does not have this pokemon");
            return;
        }
        const { nickName, useItem } = request.body;
        if (useItem) {
            const itemToUse = useItem;
            // check to see if user has item in the first place
            const player = new player_1.Player(user.id, PlayerModel);
            const playerHasItem = yield player.hasItem(itemToUse);
            if (!playerHasItem) {
                response.set(contentType, textPlain);
                response.status(400).json("User does not have this item");
                return;
            }
            const pokemonUsingItem = new battle_pokemon_1.BattlePokemon(user.id, pokemon.pokemonName, pokemon);
            const pokemonBeforeUsingItem = pokemonUsingItem.getPokemonObj().pokemonName;
            const useItemSuccess = pokemonUsingItem.useItem(itemToUse);
            // if use item success then need to delete it from inventory
            if (useItemSuccess) {
                const pokemonAfterUsingItem = pokemonUsingItem.getPokemonObj();
                pokemon.stats = pokemonAfterUsingItem.stats;
                pokemon.moves = pokemonAfterUsingItem.moves;
                pokemon.nickName = pokemonAfterUsingItem.nickName;
                if (pokemonBeforeUsingItem != pokemonAfterUsingItem.pokemonName) {
                    // evolved!
                    yield player.useItemAndAddToDex(itemToUse, pokemonAfterUsingItem.pokemonName);
                }
                else {
                    yield player.useItem(itemToUse);
                }
                pokemon.pokemonName = pokemonAfterUsingItem.pokemonName;
            }
        }
        if (nickName && nickName != "") {
            pokemon.nickName = nickName;
        }
        pokemon.save((err, newPkm) => {
            if (err) {
                console.log(err);
            }
            response.set(contentType, applicationJSON);
            response.status(200).json(newPkm);
            return;
        });
        return;
    }
    catch (e) {
        response.status(500).send("There was an error getting your team. Error: " + e);
        return;
    }
});
//# sourceMappingURL=specificTeamHandler.js.map