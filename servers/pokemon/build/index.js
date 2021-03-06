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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
// import cors from "cors";
const playerSchema_1 = require("./schemas/playerSchema");
const battlePokemonSchema_1 = require("./schemas/battlePokemonSchema");
const dexHandler_1 = require("./handlers/dexHandler");
const specificDexHandler_1 = require("./handlers/specificDexHandler");
const encounterHandler_1 = require("./handlers/encounterHandler");
const catchHandler_1 = require("./handlers/catchHandler");
const runAwayHandler_1 = require("./handlers/runAwayHandler");
const inventoryHandler_1 = require("./handlers/inventoryHandler");
const imageHandler_1 = require("./handlers/imageHandler");
const teamHandler_1 = require("./handlers/teamHandler");
const specificTeamHandler_1 = require("./handlers/specificTeamHandler");
const specificBallHandler_1 = require("./handlers/specificBallHandler");
const specificMoveHandler_1 = require("./handlers/specificMoveHandler");
// const mongoEndpoint = "mongodb://localhost:27017/test"
const mongoContainerName = "441mongopokemon";
const mongoEndpoint = "mongodb://" + mongoContainerName + ":27017/pokemon";
let port;
if (process.env.PORT) {
    port = parseInt(process.env.PORT);
}
else {
    port = 80;
}
// const port: number = 80;
const app = express_1.default();
app.use(express_1.default.json());
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
};
const methodNotAllowed = (request, response, next) => {
    response.status(405).send("Method not allowed!");
};
app.route("/v1/pokedex")
    .get(RequestWrapper(dexHandler_1.getDexHandler, { PlayerModel: playerSchema_1.PlayerModel }))
    .all(methodNotAllowed);
app.route("/v1/pokedex/:pokemonName")
    .get(RequestWrapper(specificDexHandler_1.getSpecificDexHandler, { PlayerModel: playerSchema_1.PlayerModel }))
    .all(methodNotAllowed);
app.route("/v1/pokedex/image/:pokemonName")
    .get(imageHandler_1.getPokemonImageHandler)
    .all(methodNotAllowed);
app.route("/v1/encounter")
    .get(RequestWrapper(encounterHandler_1.getEncounterHandler, { PlayerModel: playerSchema_1.PlayerModel }))
    .all(methodNotAllowed);
app.route("/v1/runaway")
    .get(RequestWrapper(runAwayHandler_1.runAwayHandler, { PlayerModel: playerSchema_1.PlayerModel }))
    .all(methodNotAllowed);
app.route("/v1/catch/:pokemonName")
    .get(RequestWrapper(catchHandler_1.getCatchHandler, { PlayerModel: playerSchema_1.PlayerModel, BattlePokemonModel: battlePokemonSchema_1.BattlePokemonModel }))
    .all(methodNotAllowed);
app.route("/v1/inventory")
    .get(RequestWrapper(inventoryHandler_1.getInventoryHandler, { PlayerModel: playerSchema_1.PlayerModel }))
    .all(methodNotAllowed);
app.route("/v1/items/:itemName")
    .get(specificBallHandler_1.getSpecificBallHandler)
    .all(methodNotAllowed);
app.route("/v1/items/image/:itemName")
    .get(imageHandler_1.getItemImageHandler)
    .all(methodNotAllowed);
app.route("/v1/team")
    .get(RequestWrapper(teamHandler_1.getTeamHandler, { BattlePokemonModel: battlePokemonSchema_1.BattlePokemonModel }))
    .all(methodNotAllowed);
app.route("/v1/team/:pokemonID")
    .get(RequestWrapper(specificTeamHandler_1.getSpecificTeamHandler, { BattlePokemonModel: battlePokemonSchema_1.BattlePokemonModel }))
    .post(RequestWrapper(specificTeamHandler_1.postSpecificTeamHandler, { BattlePokemonModel: battlePokemonSchema_1.BattlePokemonModel, PlayerModel: playerSchema_1.PlayerModel }))
    .all(methodNotAllowed);
app.route("/v1/moves/:moveName")
    .get(specificMoveHandler_1.getSpecificMoveHandler)
    .all(methodNotAllowed);
// MongoDB connections
const mongoDBConnect = () => {
    mongoose_1.default.connect(mongoEndpoint);
};
mongoDBConnect();
mongoose_1.default.connection.on('error', console.error)
    .on('disconnect', mongoDBConnect)
    .once('open', main);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        app.listen(port, "", () => {
            console.log(`Pokemon microservices listening on port ${port}`);
        });
    });
}
//# sourceMappingURL=index.js.map