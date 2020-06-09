"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mongoose_1 = require("ts-mongoose");
exports.PlayerSchema = ts_mongoose_1.createSchema({
    _id: ts_mongoose_1.Type.number(),
    dex: ts_mongoose_1.Type.object().of({}),
    balls: ts_mongoose_1.Type.object().of({}),
    encounter: ts_mongoose_1.Type.object().of({
        isEncountering: ts_mongoose_1.Type.boolean(),
        pokemonName: ts_mongoose_1.Type.string()
    })
});
exports.PlayerModel = ts_mongoose_1.typedModel("PlayerModel", exports.PlayerSchema);
//# sourceMappingURL=playerSchema.js.map