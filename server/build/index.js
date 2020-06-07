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
const playerSchema_1 = require("./schemas/playerSchema");
const dexHandler_1 = require("./handlers/dexHandler");
const specificDexHandler_1 = require("./handlers/specificDexHandler");
const encounterHandler_1 = require("./handlers/encounterHandler");
const catchHandler_1 = require("./handlers/catchHandler");
const inventoryHandler_1 = require("./handlers/inventoryHandler");
// const mongoContainerName = "441mongo";
// const mongoEndpoint = "mongodb://" + mongoContainerName + ":27017/messaging";
const mongoEndpoint = "mongodb://localhost:27017/test";
const port = 80;
const app = express_1.default();
app.use(express_1.default.json());
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
};
const methodNotAllowed = (request, response, next) => {
    response.status(405).send("Method not allowed!");
};
// // ChannelsHandlers
// const Channel = mongoose.model("Channel", ChannelSchema);
// const Message = mongoose.model("Message", MessageSchema);
// return the current player's pokedex 
app.route("/v1/pokedex")
    .get(RequestWrapper(dexHandler_1.getDexHandler, { PlayerModel: playerSchema_1.PlayerModel }))
    .all(methodNotAllowed);
app.route("/v1/pokedex/:pokemonName")
    .get(RequestWrapper(specificDexHandler_1.getSpecificDexHandler, { PlayerModel: playerSchema_1.PlayerModel }))
    .all(methodNotAllowed);
app.route("/v1/encounter")
    .get(encounterHandler_1.getEncounterHandler)
    .all(methodNotAllowed);
app.route("/v1/catch/:pokemonName")
    .get(RequestWrapper(catchHandler_1.getCatchHandler, { PlayerModel: playerSchema_1.PlayerModel }))
    .all(methodNotAllowed);
app.route("/v1/inventory")
    .get(RequestWrapper(inventoryHandler_1.getInventoryHandler, { PlayerModel: playerSchema_1.PlayerModel }))
    .all(methodNotAllowed);
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
    mongoose_1.default.connect(mongoEndpoint);
};
mongoDBConnect();
mongoose_1.default.connection.on('error', console.error)
    .on('disconnect', mongoDBConnect)
    .once('open', main);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        app.listen(port, "", () => {
            console.log(`Channel microservices listening on port ${port}`);
        });
    });
}
//# sourceMappingURL=index.js.map