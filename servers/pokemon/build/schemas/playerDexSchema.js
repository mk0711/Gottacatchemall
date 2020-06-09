"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mongoose_1 = require("ts-mongoose");
exports.PlayerSchema = ts_mongoose_1.createSchema({
    playerID: ts_mongoose_1.Type.number({ required: true, unique: true }),
    dex: ts_mongoose_1.Type.object().of({}),
    balls: ts_mongoose_1.Type.object().of({})
});
exports.PlayerModel = ts_mongoose_1.typedModel("PlayerModel", exports.PlayerSchema);
//# sourceMappingURL=playerDexSchema.js.map