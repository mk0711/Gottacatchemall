"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mongoose_1 = require("ts-mongoose");
exports.GameSchema = ts_mongoose_1.createSchema({
    playerID: ts_mongoose_1.Type.number(),
    playerPokemon: ts_mongoose_1.Type.object()
});
exports.GameModel = ts_mongoose_1.typedModel("GameModel", exports.GameSchema);
//# sourceMappingURL=gameSchema.js.map