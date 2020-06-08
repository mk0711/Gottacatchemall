"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pokedex_1 = require("../data/pokedex");
const learnset_1 = require("../data/learnset");
;
class BattlePokemon {
    constructor(owner_id, pokemonName, pokemonObj) {
        this.owner_id = owner_id;
        this.pokemonName = pokemonName;
        if (pokemonObj === undefined) {
            this.pokemonObj = this.initPokemonObj();
        }
        else {
            this.pokemonObj = pokemonObj;
        }
    }
    initPokemonObj() {
        const IV = {
            hp: this.getRandInt(31),
            atk: this.getRandInt(31),
            def: this.getRandInt(31),
            spa: this.getRandInt(31),
            spd: this.getRandInt(31),
            spe: this.getRandInt(31)
        };
        const moves = this.getRandMovesOfPkmFromLearnset(this.pokemonName);
        const level = 5;
        const nature = this.getRandomNature();
        const stats = this.statCalc();
        return {
            owner_id: this.owner_id,
            level: level,
            IV: IV,
            nature: nature,
            stats: stats,
            moves: moves
        };
    }
    getPokemonObj() {
        return this.pokemonObj;
    }
    getRandMovesOfPkmFromLearnset(pokemonName) {
        let moves = learnset_1.learnset[pokemonName];
        if (moves.length <= 4) {
            return moves;
        }
        this.shuffle(moves);
        return moves.slice(0, 4);
    }
    shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
    getRandInt(max) {
        return Math.floor(Math.random() * max);
    }
    getRandomNature() {
        const natures = ["hardy", "lonely", "brave", "adamant", "naughty", "bold", "docile", "relaxed",
            "impish", "lax", "timid", "hasty", "serious", "jolly", "naive", "modest", "mild",
            "quiet", "bashful", "rash", "calm", "gentle", "sassy", "careful", "quirky"];
        return natures[this.getRandInt(natures.length - 1)];
    }
    statCalc() {
        const baseHP = pokedex_1.Pokedex[this.pokemonName].baseStats.hp;
        const baseATK = pokedex_1.Pokedex[this.pokemonName].baseStats.atk;
        const baseDEF = pokedex_1.Pokedex[this.pokemonName].baseStats.def;
        const baseSPA = pokedex_1.Pokedex[this.pokemonName].baseStats.spa;
        const baseSPD = pokedex_1.Pokedex[this.pokemonName].baseStats.spd;
        const baseSPE = pokedex_1.Pokedex[this.pokemonName].baseStats.spe;
        const natureMultiplier = this.natureMultiplierCalculator(this.pokemonObj.nature);
        // default
        const EV = 84;
        const level = this.pokemonObj.level;
        const IV = this.pokemonObj.IV;
        const hp = Math.floor((((2 * baseHP + IV.hp + EV / 4) * level) / 100) + level + 10);
        const atk = this.otherStatCalc(baseATK, level, IV.atk, EV, natureMultiplier.atkNature);
        const def = this.otherStatCalc(baseDEF, level, IV.def, EV, natureMultiplier.defNature);
        const spa = this.otherStatCalc(baseSPA, level, IV.spa, EV, natureMultiplier.spaNature);
        const spd = this.otherStatCalc(baseSPD, level, IV.spd, EV, natureMultiplier.spdNature);
        const spe = this.otherStatCalc(baseSPE, level, IV.spe, EV, natureMultiplier.speNature);
        return {
            hp: hp,
            atk: atk,
            def: def,
            spa: spa,
            spd: spd,
            spe: spe
        };
    }
    natureMultiplierCalculator(nature) {
        let atkNature = 1;
        let defNature = 1;
        let spaNature = 1;
        let spdNature = 1;
        let speNature = 1;
        console.log(nature);
        switch (nature) {
            case ("adamant"): {
                atkNature = 1.1;
                spaNature = 0.9;
                break;
            }
            case ("bold"): {
                defNature = 1.1;
                speNature = 0.9;
                break;
            }
            case ("brave"): {
                atkNature = 1.1;
                speNature = 0.9;
                break;
            }
            case ("calm"): {
                spdNature = 1.1;
                atkNature = 0.9;
                break;
            }
            case ("careful"): {
                spdNature = 1.1;
                spaNature = 0.9;
                break;
            }
            case ("gentle"): {
                spdNature = 1.1;
                defNature = 0.9;
                break;
            }
            case ("hasty"): {
                speNature = 1.1;
                defNature = 0.9;
                break;
            }
            case ("impish"): {
                defNature = 1.1;
                spaNature = 0.9;
                break;
            }
            case ("jolly"): {
                speNature = 1.1;
                spaNature = 0.9;
                break;
            }
            case ("lax"): {
                defNature = 1.1;
                spdNature = 0.9;
                break;
            }
            case ("lonely"): {
                speNature = 1.1;
                defNature = 0.9;
                break;
            }
            case ("mild"): {
                spaNature = 1.1;
                defNature = 0.9;
                break;
            }
            case ("modest"): {
                spaNature = 1.1;
                atkNature = 0.9;
                break;
            }
            case ("naive"): {
                speNature = 1.1;
                spdNature = 0.9;
                break;
            }
            case ("naughty"): {
                atkNature = 1.1;
                spdNature = 0.9;
                break;
            }
            case ("quiet"): {
                spaNature = 1.1;
                speNature = 0.9;
                break;
            }
            case ("rash"): {
                spaNature = 1.1;
                spdNature = 0.9;
                break;
            }
            case ("relaxed"): {
                defNature = 1.1;
                speNature = 0.9;
                break;
            }
            case ("sassy"): {
                spdNature = 1.1;
                speNature = 0.9;
                break;
            }
            case ("timid"): {
                speNature = 1.1;
                atkNature = 0.9;
                break;
            }
        }
        return {
            atkNature: atkNature,
            defNature: defNature,
            spaNature: spaNature,
            spdNature: spdNature,
            speNature: speNature
        };
    }
    otherStatCalc(base, level, IV, EV, natureMultiplier) {
        return Math.floor(((((2 * base + IV + (EV / 4)) * level) / 100) + 5) * natureMultiplier);
    }
}
exports.BattlePokemon = BattlePokemon;
class PokemonMove {
    constructor(name, basePower, accuracy, type, category, pp) {
        this.name = name;
        this.basePower = basePower;
        this.accuracy = accuracy;
        this.type = type;
        this.category = category;
        this.pp = pp;
    }
}
class TypeChart {
    constructor() {
        this.typeChart = [
            [1, 1, 1, 1, 1, 0.5, 1, 0, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [2, 1, 0.5, 0.5, 1, 2, 0.5, 0, 2, 1, 1, 1, 1, 0.5, 2, 1, 2, 0.5],
            [1, 2, 1, 1, 1, 0.5, 2, 1, 0.5, 1, 1, 2, 0.5, 1, 1, 1, 1, 1],
            [1, 1, 1, 0.5, 0.5, 0.5, 1, 0.5, 0, 1, 1, 2, 1, 1, 1, 1, 1, 2],
            [1, 1, 0, 2, 1, 2, 0.5, 1, 2, 2, 1, 0.5, 2, 1, 1, 1, 1, 1],
            [1, 0.5, 2, 1, 0.5, 1, 2, 1, 0.5, 2, 1, 1, 1, 1, 2, 1, 1, 1],
            [1, 0.5, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 0.5, 1, 2, 1, 2, 1, 1, 2, 0.5],
            [0, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 0.5, 1],
            [1, 1, 1, 1, 1, 2, 1, 1, 0.5, 0.5, 0.5, 1, 0.5, 1, 2, 1, 1, 2],
            [1, 1, 1, 1, 1, 0.5, 2, 1, 2, 0.5, 0.5, 2, 1, 1, 2, 0.5, 1, 1],
            [1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 0.5, 0.5, 1, 1, 1, 0.5, 1, 1],
            [1, 1, 0.5, 0.5, 2, 2, 0.5, 1, 0.5, 0.5, 2, 0.5, 1, 1, 1, 0.5, 1, 1],
            [1, 1, 2, 1, 0, 1, 1, 1, 1, 1, 2, 0.5, 0.5, 1, 1, 0.5, 1, 1],
            [1, 2, 1, 2, 1, 1, 1, 1, 0.5, 1, 1, 1, 1, 0.5, 1, 1, 0, 1],
            [1, 1, 2, 1, 2, 1, 1, 1, 0.5, 0.5, 0.5, 2, 1, 1, 0.5, 2, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 1, 1, 1, 2, 1, 0],
            [1, 0.5, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 0.5, 0.5],
            [1, 2, 1, 0.5, 1, 1, 1, 1, 0.5, 0.5, 1, 1, 1, 1, 1, 2, 2, 1] // fairy
        ];
        this.typeMap = this.makeTypeMap();
    }
    getDamageMultiplier(type1, type2) {
        const type1Position = this.typeMap.get(type1);
        const type2Position = this.typeMap.get(type2);
        if (!type1Position || !type2Position) {
            return -1;
        }
        return this.typeChart[type1Position][type2Position];
    }
    makeTypeMap() {
        let typeMap = new Map();
        typeMap.set("normal", 0);
        typeMap.set("fighting", 1);
        typeMap.set("flying", 2);
        typeMap.set("poison", 3);
        typeMap.set("ground", 4);
        typeMap.set("rock", 5);
        typeMap.set("bug", 6);
        typeMap.set("ghost", 7);
        typeMap.set("steel", 8);
        typeMap.set("fire", 9);
        typeMap.set("water", 10);
        typeMap.set("grass", 11);
        typeMap.set("electric", 12);
        typeMap.set("psychic", 13);
        typeMap.set("ice", 14);
        typeMap.set("dragon", 15);
        typeMap.set("dark", 16);
        typeMap.set("fairy", 17);
        return typeMap;
    }
}
//# sourceMappingURL=pokemon.js.map