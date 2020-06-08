const {  contentType, applicationJSON, XUser } = require("../header");
import { PokemonCatcher } from "../misc/catch-simulator";
import { Player } from "../player";
import { BattlePokemon } from "../misc/battle-pokemon"; 

export const getCatchHandler = async (request, response, {PlayerModel, BattlePokemonModel}) => {
    const user = JSON.parse(request.header(XUser));
    const pid: number = user.id;
    const player = new Player(pid, PlayerModel);
    const pokemonName = request.params["pokemonName"];

    // check if the player is already encountering a different pokemon
    const pokemonEncountering = await player.getCurrentEncounter();
    
    if (!pokemonEncountering) {
        response.status(400).send("You are not in an encounter with any pokemon.");
        return;
    }

    if (pokemonEncountering.toLowerCase() !== pokemonName.toLowerCase()) {
        response.status(400).send("You are already in an encounter with " + pokemonEncountering);
        return;
    }

    // if no ball request parameter present then use pokeball
    let ballName = request.query.ball;
    if (!ballName) {
        ballName = "pokeball";
    }

    const success = await playerTryToCatchPokemon(player, ballName, pokemonName);
    if (success) {
        // add to the player's team if caught
        await addPokemonToPlayerTeamAndSendAsResponse(player.getID(), pokemonName, BattlePokemonModel, response);
        return;
    } else {
        response.status(200).send("Catch " + pokemonName + " failed :(");
        return;
    }
}

async function playerTryToCatchPokemon(player: Player, ballName: string, pokemonName: string) {
    const hasBall = await player.hasBall(ballName);
    if (hasBall) {
        const catcher = new PokemonCatcher();
        const caught = catcher.catchPokemon(pokemonName.toLowerCase(), ballName.toLowerCase());

        //add to dex if caught
        if (caught) {
            await player.useBallToCatch(ballName, pokemonName);
        } else {
            await player.useBallFailToCatch(ballName);
        }
        return caught;
    } else {
        return false;
    }
}

async function addPokemonToPlayerTeamAndSendAsResponse(pid: number, pokemonName: string, PokemonModel, response) {
    const pokemon: BattlePokemon = new BattlePokemon(pid, pokemonName, null);
    const pokemonObj = pokemon.getPokemonObj();

    const query = new PokemonModel(pokemonObj);

    await query.save((err) => {
        if (err) {
            console.log(err);
        }
        response.set(contentType, applicationJSON);
        response.status(200).json(pokemonObj);
        return;
    });
}