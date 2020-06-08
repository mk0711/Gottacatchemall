"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mongoose_1 = require("ts-mongoose");
exports.PokemonMoveSchema = ts_mongoose_1.createSchema({
    name: ts_mongoose_1.Type.string({ required: true }),
    desc: ts_mongoose_1.Type.string({ required: true }),
    basePower: ts_mongoose_1.Type.number({ required: true }),
    accuracy: ts_mongoose_1.Type.number({ required: true }),
    type: ts_mongoose_1.Type.string({ required: true }),
    category: ts_mongoose_1.Type.string({ required: true }),
    pp: ts_mongoose_1.Type.number({ required: true }),
});
module.exports = { PokemonMoveSchema: exports.PokemonMoveSchema };
//# sourceMappingURL=pokemonSchema.js.map