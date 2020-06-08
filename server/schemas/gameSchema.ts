import { createSchema, Type, typedModel } from 'ts-mongoose';

export const GameSchema = createSchema({
    playerID: Type.number(),
    playerPokemon: Type.object()
});

export const GameModel = typedModel("GameModel", GameSchema);