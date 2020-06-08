"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mongoose_1 = require("ts-mongoose");
exports.BattlePokemonSchema = ts_mongoose_1.createSchema({
    owner_id: ts_mongoose_1.Type.number({ required: true }),
    pokemonName: ts_mongoose_1.Type.string({ required: true }),
    nickName: ts_mongoose_1.Type.string(),
    level: ts_mongoose_1.Type.number({ required: true }),
    IV: ts_mongoose_1.Type.object().of({
        hp: ts_mongoose_1.Type.number({ required: true }),
        atk: ts_mongoose_1.Type.number({ required: true }),
        def: ts_mongoose_1.Type.number({ required: true }),
        spa: ts_mongoose_1.Type.number({ required: true }),
        spd: ts_mongoose_1.Type.number({ required: true }),
        spe: ts_mongoose_1.Type.number({ required: true }),
    }),
    nature: ts_mongoose_1.Type.string({ required: true }),
    stats: ts_mongoose_1.Type.object().of({
        hp: ts_mongoose_1.Type.number({ required: true }),
        atk: ts_mongoose_1.Type.number({ required: true }),
        def: ts_mongoose_1.Type.number({ required: true }),
        spa: ts_mongoose_1.Type.number({ required: true }),
        spd: ts_mongoose_1.Type.number({ required: true }),
        spe: ts_mongoose_1.Type.number({ required: true }),
    }),
    moves: ts_mongoose_1.Type.array({ required: true }).of(ts_mongoose_1.Type.string({ required: true }))
});
exports.BattlePokemonModel = ts_mongoose_1.typedModel("BattlePokemonModel", exports.BattlePokemonSchema);
//# sourceMappingURL=battlePokemonSchema.js.map