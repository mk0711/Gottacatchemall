import { createSchema, Type, typedModel } from 'ts-mongoose';

export const PlayerSchema = createSchema({
    _id: Type.number(),
    dex: Type.object().of({
    }),
    balls: Type.object().of({
    }),
    encounter: Type.object().of({
        isEncountering: Type.boolean(),
        pokemonName: Type.string()
    })
});

export const PlayerModel = typedModel("PlayerModel", PlayerSchema);