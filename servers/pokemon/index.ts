"use strict";

import mongoose from "mongoose";
import express from "express";
import { PlayerModel } from "./schemas/playerSchema";
import { BattlePokemonModel } from "./schemas/battlePokemonSchema";

import { getDexHandler } from "./handlers/dexHandler";
import { getSpecificDexHandler } from "./handlers/specificDexHandler"
import { getEncounterHandler } from "./handlers/encounterHandler";
import { getCatchHandler } from "./handlers/catchHandler";
import { runAwayHandler } from "./handlers/runAwayHandler";
import { getInventoryHandler } from "./handlers/inventoryHandler";
import { getPokemonImageHandler, getItemImageHandler } from "./handlers/imageHandler";
import { getTeamHandler } from "./handlers/teamHandler";
import { getSpecificTeamHandler, postSpecificTeamHandler } from "./handlers/specificTeamHandler";
import { getSpecificBallHandler } from "./handlers/specificBallHandler";
import { getSpecificMoveHandler } from "./handlers/specificMoveHandler";

// const mongoEndpoint = "mongodb://localhost:27017/test"

const mongoContainerName = "441mongopokemon";
const mongoEndpoint = "mongodb://" + mongoContainerName + ":27017/pokemon";

let port: number;
if (process.env.PORT) {
    port = parseInt(process.env.PORT);
} else {
    port = 80;
}



// const port: number = 80;
const app: express.Application = express();

app.use(express.json());
// app.use(cors());

// Middleware to check if the user is authenticated
app.use((request, response, next) => {
    let user = request.get("X-User");    
    if (!user) {     
        if (!request.path.startsWith("/v1/pokedex/image/") && !request.path.startsWith("/v1/items/image/")) {
            response.status(401).send("authentication failed, please sign in");   
            return; 
        }
        // request.headers["x-user"] = JSON.stringify({"id": 1});
    } 
    next();
});

const RequestWrapper = (handler, SchemeAndDbForwarder) => {
    return (request, response) => {
        handler(request, response, SchemeAndDbForwarder);
       
    };
}

const methodNotAllowed = (request, response, next) => {
    response.status(405).send("Method not allowed!");
}

app.route("/v1/pokedex")
    .get(RequestWrapper(getDexHandler, { PlayerModel }))
    .all(methodNotAllowed)

app.route("/v1/pokedex/:pokemonName")
    .get(RequestWrapper(getSpecificDexHandler, { PlayerModel }))
    .all(methodNotAllowed)

app.route("/v1/pokedex/image/:pokemonName")
    .get(getPokemonImageHandler)
    .all(methodNotAllowed)

app.route("/v1/encounter") 
    .get(RequestWrapper(getEncounterHandler, { PlayerModel }))
    .all(methodNotAllowed)

app.route("/v1/runaway")
    .get(RequestWrapper(runAwayHandler, { PlayerModel }))
    .all(methodNotAllowed)

app.route("/v1/catch/:pokemonName")
    .get(RequestWrapper(getCatchHandler, { PlayerModel, BattlePokemonModel }))
    .all(methodNotAllowed)

app.route("/v1/inventory")
    .get(RequestWrapper(getInventoryHandler, { PlayerModel }))
    .all(methodNotAllowed)

app.route("/v1/items/balls/:ballName")
    .get(getSpecificBallHandler)
    .all(methodNotAllowed)

app.route("/v1/items/image/:itemName")
    .get(getItemImageHandler)
    .all(methodNotAllowed)

app.route("/v1/team")
    .get(RequestWrapper(getTeamHandler, { BattlePokemonModel }))
    .all(methodNotAllowed)

app.route("/v1/team/:pokemonID")
    .get(RequestWrapper(getSpecificTeamHandler, { BattlePokemonModel }))
    .post(RequestWrapper(postSpecificTeamHandler, { BattlePokemonModel }))
    .all(methodNotAllowed)

app.route("/v1/moves/:moveName")
    .get(getSpecificMoveHandler)
    .all(methodNotAllowed)

// MongoDB connections
const mongoDBConnect = () => {
    mongoose.connect(mongoEndpoint)
}
mongoDBConnect();
mongoose.connection.on('error', console.error)
    .on('disconnect', mongoDBConnect)
    .once('open', main);

async function main() {
    app.listen(port, "", () => {
        console.log(`Pokemon microservices listening on port ${port}`)
    });
}