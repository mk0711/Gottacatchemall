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
import { getImageHandler } from "./handlers/imageHandler";
import { getTeamHandler } from "./handlers/teamHandler";
import { getSpecificTeamHandler } from "./handlers/specificTeamHandler";

// const mongoContainerName = "441mongo";
// const mongoEndpoint = "mongodb://" + mongoContainerName + ":27017/messaging";
const mongoEndpoint = "mongodb://localhost:27017/test"

const port: number = 80;
const app: express.Application = express();

app.use(express.json());

// Middleware to check if the user is authenticated
app.use((request, response, next) => {
    let user = request.get("X-User");    
    if (!user) {      
        response.status(401).send("authentication failed, please sign in");   
        return; 
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
    .get(getImageHandler)
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

app.route("/v1/team")
    .get(RequestWrapper(getTeamHandler, { BattlePokemonModel }))
    .all(methodNotAllowed)

app.route("/v1/team/:pokemonID")
    .get(RequestWrapper(getSpecificTeamHandler, { BattlePokemonModel }))
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
        console.log(`Channel microservices listening on port ${port}`)
    });
}