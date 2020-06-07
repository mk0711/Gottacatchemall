"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const balls_1 = require("./data/balls");
const pokedex_1 = require("./data/pokedex");
class Player {
    constructor(id, PlayerModel) {
        this.id = id;
        this.queryPlayerObj = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.queryPlayerObjHelper(this.dbModel);
        });
        this.queryPlayerObjHelper = (PlayerModel) => __awaiter(this, void 0, void 0, function* () {
            let playerObj = yield PlayerModel.findById(this.id);
            // if this user has never been found in the db then create a new user
            if (!playerObj) {
                this.dex = new PlayerPokedex(null);
                this.balls = new BallInventory(null);
                const newPlayerObj = {
                    _id: this.id,
                    dex: this.dex.getCaughtDex(),
                    balls: this.balls.getBallInventory(),
                };
                const query = new PlayerModel(newPlayerObj);
                yield query.save((err) => {
                    if (err) {
                        console.log(err);
                    }
                    return;
                });
            }
            else {
                this.dex = new PlayerPokedex(playerObj.dex);
                this.balls = new BallInventory(playerObj.balls);
            }
            return playerObj;
        });
        this.team = [];
        this.balls = undefined;
        this.dex = undefined;
        this.playerObj = undefined;
        this.dbModel = PlayerModel;
    }
    getID() {
        return this.id;
    }
    getDex() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.queryPlayerObj();
            return this.dex.getCaughtDex();
        });
    }
    getInventory() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.queryPlayerObj();
            return {
                balls: this.balls.getBallInventory(),
                items: []
            };
        });
    }
    hasBall(ballName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.queryPlayerObj();
            return this.balls.hasBall(ballName);
        });
    }
    useBallToCatch(ballName, pokemonName) {
        return __awaiter(this, void 0, void 0, function* () {
            let playerObj = yield this.queryPlayerObj();
            this.balls.removeBall(ballName);
            playerObj.balls = this.balls.getBallInventory();
            this.dex.addPokemonToDex(pokemonName.toLowerCase());
            playerObj.dex = this.dex.getCaughtDex();
            playerObj.markModified("dex");
            playerObj.markModified("balls");
            yield playerObj.save((err) => {
                if (err) {
                    console.log(err);
                }
                return;
            });
        });
    }
    useBallFailToCatch(ballName) {
        return __awaiter(this, void 0, void 0, function* () {
            let playerObj = yield this.queryPlayerObj();
            this.balls.removeBall(ballName);
            playerObj.balls = this.balls.getBallInventory();
            playerObj.markModified("balls");
            yield playerObj.save((err) => {
                if (err) {
                    console.log(err);
                }
                return;
            });
        });
    }
    hasPokemonInDex(pokemonName) {
        return __awaiter(this, void 0, void 0, function* () {
            // return await this.hasPokemonInDexHelper(pokemonName.toLowerCase(), this.dbModel);
            if (!this.playerObj) {
                this.playerObj = yield this.queryPlayerObj();
            }
            return this.playerObj.dex[pokemonName.toLowerCase()];
        });
    }
}
exports.Player = Player;
class PlayerPokedex {
    constructor(caughtDex) {
        if (!caughtDex) {
            this.caughtDex = this.initCaughtDex();
        }
        else {
            this.caughtDex = caughtDex;
        }
    }
    // return a JS Object
    getCaughtDex() {
        return this.caughtDex;
    }
    addPokemonToDex(pokemonName) {
        if (pokemonName in this.caughtDex) {
            this.caughtDex[pokemonName] = true;
            return true;
        }
        return false;
    }
    initCaughtDex() {
        let result = {};
        const allPokemonNames = Object.keys(pokedex_1.Pokedex);
        for (const pokemonName of allPokemonNames) {
            result[pokemonName] = false;
        }
        return result;
    }
}
exports.PlayerPokedex = PlayerPokedex;
class BallInventory {
    constructor(ballInventory) {
        this.validPokeballNames = this.getValidPokeballNames();
        if (!ballInventory) {
            this.ballInventory = this.initBallInventory();
        }
        else {
            this.ballInventory = ballInventory;
        }
    }
    getBallInventory() {
        return this.ballInventory;
    }
    // return true if add successful and false otherwise
    addBall(ball) {
        if (this.validPokeballNames.has(ball)) {
            this.ballInventory[ball] += 1;
            return true;
        }
        return false;
    }
    // return true if user can use ball and deduct the ball count by 1
    removeBall(ball) {
        if (!this.validPokeballNames.has(ball)) {
            return false;
        }
        if (!this.hasBall(ball)) {
            return false;
        }
        this.ballInventory[ball] -= 1;
        return true;
    }
    hasBall(ball) {
        return this.ballInventory[ball] > 0;
    }
    initBallInventory() {
        let result = {};
        for (const ball of this.validPokeballNames) {
            if (balls_1.Pokeballs[ball].isMasterball) {
                result[ball] = 0;
            }
            else {
                result[ball] = 10;
            }
        }
        return result;
    }
    getValidPokeballNames() {
        let result = new Set();
        const validPokeballNames = Object.keys(balls_1.Pokeballs);
        for (const ball of validPokeballNames) {
            result.add(ball);
        }
        return result;
    }
}
exports.BallInventory = BallInventory;
//# sourceMappingURL=player.js.map