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
const testPokemonSnorlax = {
    species: "snorlax",
    stat: {
        hp: 160,
        atk: 110,
        def: 65,
        spAtk: 65,
        spDef: 110,
        speed: 30
    },
    moveSet: [
        {
            name: "body slam",
            basePower: 75,
            accuracy: 100,
            type: "normal",
            category: "physical",
            pp: 24
        },
        {
            name: "earthquake",
            basePower: 100,
            accuracy: 100,
            type: "ground",
            category: "physical",
            pp: 16
        }
    ],
    catchRate: 0.1,
    sprite: "https://img.pokemondb.net/sprites/ruby-sapphire/normal/snorlax.png"
};
module.exports = { PokemonMoveSchema: exports.PokemonMoveSchema };
//# sourceMappingURL=pokemonSchema.js.map