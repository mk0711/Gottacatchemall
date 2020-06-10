import { BattlePokemon } from "../misc/battle-pokemon";
import { Player } from "../player";

const { contentType, applicationJSON, textPlain, XUser } = require("../header");

export const getSpecificTeamHandler = async (request, response, { BattlePokemonModel }) => {
    try {
        // if the user already caught the pokemon, then get its information
        const user = JSON.parse(request.header(XUser));

        const pokemonID = request.params["pokemonID"];
        const pokemon = await BattlePokemonModel.findById(pokemonID);

        if (!pokemon || user.id != pokemon.owner_id) {
            response.set(contentType, textPlain);
            response.status(400).json("User does not have this pokemon");
            return;
        }

        response.set(contentType, applicationJSON);
        response.status(200).json(pokemon);
    } catch(e) {
        response.status(500).send("There was an error getting your team. Error: " + e);
    }
}

export const postSpecificTeamHandler = async (request, response, { BattlePokemonModel, PlayerModel }) => {
    try {
        if (request.get(contentType) !== applicationJSON) {
            response.status(400).send("Bad request. Application type must be JSON");
            return;
        }
    
        // if the user already caught the pokemon, then get its information
        const user = JSON.parse(request.header(XUser));

        const pokemonID = request.params["pokemonID"];
        const pokemon = await BattlePokemonModel.findById(pokemonID);

        if (!pokemon || user.id != pokemon.owner_id) {
            response.set(contentType, textPlain);
            response.status(400).json("User does not have this pokemon");
            return;
        }

        const { nickName, useItem } = request.body;

        if (useItem) {
            const itemToUse = useItem;

            // check to see if user has item in the first place
            const player = new Player(user.id, PlayerModel);
            const playerHasItem = await player.hasItem(itemToUse);
            if (!playerHasItem) {
                response.set(contentType, textPlain);
                response.status(400).json("User does not have this item");
                return;
            }

            const pokemonUsingItem = new BattlePokemon(user.id, pokemon.pokemonName, pokemon); 
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
                    await player.useItemAndAddToDex(itemToUse, pokemonAfterUsingItem.pokemonName);
                } else {
                    await player.useItem(itemToUse);
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
        })
        return;
    } catch(e) {
        response.status(500).send("There was an error getting your team. Error: " + e);
        return;
    }
}


