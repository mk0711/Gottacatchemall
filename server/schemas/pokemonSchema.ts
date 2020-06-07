
import { createSchema, Type, typedModel } from 'ts-mongoose';

export const PokemonMoveSchema = createSchema({
    name:      Type.string({ required: true }),
    desc:      Type.string({ required: true }), 
    basePower: Type.number({ required: true }),
    accuracy:  Type.number({ required: true }), 
    type:      Type.string({ required: true }), 
    category:  Type.string({ required: true }), 
    pp:        Type.number({ required: true }), 
})


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
}

module.exports = { PokemonMoveSchema };