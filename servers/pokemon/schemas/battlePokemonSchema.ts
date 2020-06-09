
import { createSchema, Type, typedModel } from 'ts-mongoose';

export const BattlePokemonSchema = createSchema({
    owner_id: Type.number({required: true}),
    pokemonName: Type.string({required: true}),
    nickName: Type.string({required: true}),
    level: Type.number({required: true}),
    IV: Type.object().of({
        hp: Type.number({required: true}),
        atk: Type.number({required: true}),
        def: Type.number({required: true}),
        spa: Type.number({required: true}),
        spd: Type.number({required: true}),
        spe: Type.number({required: true}),
    }),
    nature: Type.string({required: true}),
    stats: Type.object().of({
        hp: Type.number({required: true}),
        atk: Type.number({required: true}),
        def: Type.number({required: true}),
        spa: Type.number({required: true}),
        spd: Type.number({required: true}),
        spe: Type.number({required: true}),
    }),
    moves: Type.array({required: true}).of(
        Type.string({required: true})
    )
});  

export const BattlePokemonModel = typedModel("BattlePokemonModel", BattlePokemonSchema);
