"use strict";

import mongoose from "mongoose";
import express from "express";
import { PlayerModel } from "./schemas/playerSchema";

import { getDexHandler } from "./handlers/dexHandler";
import { getSpecificDexHandler } from "./handlers/specificDexHandler"
import { getEncounterHandler } from "./handlers/encounterHandler";
import { getCatchHandler } from "./handlers/catchHandler";
import { getInventoryHandler } from "./handlers/inventoryHandler";

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

// // ChannelsHandlers
// const Channel = mongoose.model("Channel", ChannelSchema);
// const Message = mongoose.model("Message", MessageSchema);

// return the current player's pokedex 
app.route("/v1/pokedex")
    .get(RequestWrapper(getDexHandler, { PlayerModel }))
    .all(methodNotAllowed)

app.route("/v1/pokedex/:pokemonName")
    .get(RequestWrapper(getSpecificDexHandler, { PlayerModel }))
    .all(methodNotAllowed)

app.route("/v1/encounter") 
    .get(getEncounterHandler)
    .all(methodNotAllowed)

app.route("/v1/catch/:pokemonName")
    .get(RequestWrapper(getCatchHandler, { PlayerModel }))
    .all(methodNotAllowed)

app.route("/v1/inventory")
    .get(RequestWrapper(getInventoryHandler, { PlayerModel }))
    .all(methodNotAllowed)


// app.route("/v1/pokedex/:pokemonName")

// app.route("/v1/team")
// app.route("/v1/team/:pokemonID")

// app.route("/v1/inventory")
// app.route("/v1/inventory?item={name}")

// app.route("/v1/shop")
// app.route("/v1/shop?item={name}")

// app.route("/v1/catch/:pokemonName?ball=pokeball")


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