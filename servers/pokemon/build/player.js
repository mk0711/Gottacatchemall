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
const items_1 = require("./data/items");
const pokedex_1 = require("./data/pokedex");
class Player {
    constructor(id, PlayerModel) {
        this.id = id;
        this.queryPlayerObj = () => __awaiter(this, void 0, void 0, function* () {
            yield this.queryPlayerObjHelper(this.dbModel);
        });
        this.queryPlayerObjHelper = (PlayerModel) => __awaiter(this, void 0, void 0, function* () {
            this.playerObj = yield PlayerModel.findById(this.id);
            // if this user has never been found in the db then create a new user
            if (!this.playerObj) {
                this.dex = new PlayerPokedex(null);
                this.balls = new Inventory(null, balls_1.Pokeballs);
                this.items = new Inventory(null, items_1.Items);
                const newPlayerObj = {
                    _id: this.id,
                    dex: this.dex.getCaughtDex(),
                    balls: this.balls.getInventory(),
                    items: this.items.getInventory(),
                    encounter: {
                        isEncountering: false
                    }
                };
                const query = new PlayerModel(newPlayerObj);
                yield query.save((err) => {
                    if (err) {
                        console.log(err);
                    }
                    return;
                });
                this.playerObj = newPlayerObj;
            }
            else {
                this.dex = new PlayerPokedex(this.playerObj.dex);
                this.balls = new Inventory(this.playerObj.balls, balls_1.Pokeballs);
                this.items = new Inventory(this.playerObj.items, items_1.Items);
            }
        });
        this.team = [];
        this.balls = undefined;
        this.items = undefined;
        this.dex = undefined;
        this.playerObj = undefined;
        this.dbModel = PlayerModel;
    }
    getID() {
        return this.id;
    }
    getDex() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.playerObj) {
                yield this.queryPlayerObj();
            }
            return this.dex.getCaughtDex();
        });
    }
    getInventory() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.playerObj) {
                yield this.queryPlayerObj();
            }
            return {
                balls: this.balls.getInventory(),
                items: this.items.getInventory()
            };
        });
    }
    hasBall(ballName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.playerObj) {
                yield this.queryPlayerObj();
            }
            return this.balls.hasItem(ballName);
        });
    }
    hasItem(itemName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.playerObj) {
                yield this.queryPlayerObj();
            }
            return this.items.hasItem(itemName);
        });
    }
    useItem(itemName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.playerObj) {
                yield this.queryPlayerObj();
            }
            this.items.removeItem(itemName);
            this.playerObj.items = this.items.getInventory();
            this.playerObj.markModified("items");
            yield this.playerObj.save((err) => {
                if (err) {
                    console.log(err);
                }
                return;
            });
        });
    }
    useBallToCatch(ballName, pokemonName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.playerObj) {
                yield this.queryPlayerObj();
            }
            this.balls.removeItem(ballName);
            this.playerObj.balls = this.balls.getInventory();
            this.playerObj.markModified("balls");
            this.dex.addPokemonToDex(pokemonName.toLowerCase());
            this.playerObj.dex = this.dex.getCaughtDex();
            this.playerObj.markModified("dex");
            // player caught the pokemon so they no longer is encountering it
            this.playerObj.encounter = {
                isEncountering: false
            };
            this.playerObj.markModified("encounter");
            yield this.playerObj.save((err) => {
                if (err) {
                    console.log(err);
                }
                return;
            });
        });
    }
    useItemAndAddToDex(itemName, pokemonName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.playerObj) {
                yield this.queryPlayerObj();
            }
            this.items.removeItem(itemName);
            this.playerObj.items = this.items.getInventory();
            this.playerObj.markModified("items");
            this.dex.addPokemonToDex(pokemonName.toLowerCase());
            this.playerObj.dex = this.dex.getCaughtDex();
            this.playerObj.markModified("dex");
            yield this.playerObj.save((err) => {
                if (err) {
                    console.log(err);
                }
                return;
            });
        });
    }
    useBallFailToCatch(ballName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.playerObj) {
                yield this.queryPlayerObj();
            }
            this.balls.removeItem(ballName);
            this.playerObj.balls = this.balls.getInventory();
            this.playerObj.markModified("balls");
            // let's say the pokemon doesn't run away after a failed capture for now
            yield this.playerObj.save((err) => {
                if (err) {
                    console.log(err);
                }
                return;
            });
        });
    }
    setEncounter(pokemonName, rarity) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.playerObj) {
                yield this.queryPlayerObj();
            }
            this.playerObj.encounter = {
                isEncountering: true,
                pokemonName: pokemonName,
                rarity: rarity
            };
            this.playerObj.markModified("encounter");
            yield this.playerObj.save((err) => {
                if (err) {
                    console.log(err);
                }
                return;
            });
        });
    }
    runAwayFromEncounter() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.playerObj) {
                yield this.queryPlayerObj();
            }
            this.playerObj.encounter = {
                isEncountering: false,
                pokemonName: undefined,
                rarity: undefined,
            };
            this.playerObj.markModified("encounter");
            yield this.playerObj.save((err) => {
                if (err) {
                    console.log(err);
                }
                return;
            });
        });
    }
    isAlreadyInEncounter() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.playerObj) {
                yield this.queryPlayerObj();
            }
            if (!this.playerObj.encounter) {
                return false;
            }
            return this.playerObj.encounter.isEncountering;
        });
    }
    getCurrentEncounter() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.playerObj) {
                yield this.queryPlayerObj();
            }
            if (!this.playerObj.encounter) {
                return undefined;
            }
            return {
                pokemonName: this.playerObj.encounter.pokemonName,
                rarity: this.playerObj.encounter.rarity
            };
        });
    }
    hasPokemonInDex(pokemonName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.playerObj) {
                yield this.queryPlayerObj();
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
class Inventory {
    constructor(ballInventory, itemMap) {
        this.itemMap = itemMap;
        this.validItemNames = this.getValidItemNames();
        if (!ballInventory) {
            this.inventory = this.initItemInventory();
        }
        else {
            this.inventory = ballInventory;
        }
    }
    getInventory() {
        return this.inventory;
    }
    // return true if add successful and false otherwise
    addItem(item) {
        if (this.validItemNames.has(item)) {
            this.inventory[item] += 1;
            return true;
        }
        return false;
    }
    // return true if user can use ball and deduct the ball count by 1
    removeItem(item) {
        if (!this.validItemNames.has(item)) {
            return false;
        }
        if (!this.hasItem(item)) {
            return false;
        }
        this.inventory[item] -= 1;
        return true;
    }
    hasItem(item) {
        return this.inventory[item] > 0;
    }
    initItemInventory() {
        let result = {};
        for (const item of this.validItemNames) {
            if (this.itemMap[item].isMasterball) {
                result[item] = 0;
            }
            else {
                result[item] = 100;
            }
        }
        return result;
    }
    getValidItemNames() {
        let result = new Set();
        const validItemNames = Object.keys(this.itemMap);
        for (const itemName of validItemNames) {
            result.add(itemName);
        }
        return result;
    }
}
exports.Inventory = Inventory;
//# sourceMappingURL=player.js.map