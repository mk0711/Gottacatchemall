"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pokemon_rarity_1 = require("../data/pokemon-rarity");
class PokemonGacha {
    pullRandomPokemon() {
        const rarity = this.getRandRarity();
        const pkm = pokemon_rarity_1.pokemonPullRate[rarity];
        return {
            pokemonName: pkm[Math.floor(Math.random() * pkm.length)],
            rarity: rarity
        };
    }
    getRandRarity() {
        const max = pokemon_rarity_1.rateValues.legendary +
            pokemon_rarity_1.rateValues.ultra_rare +
            pokemon_rarity_1.rateValues.super_rare +
            pokemon_rarity_1.rateValues.rare +
            pokemon_rarity_1.rateValues.uncommon +
            pokemon_rarity_1.rateValues.common;
        const randInt = this.getRandInt(max);
        if (randInt <= pokemon_rarity_1.rateValues.legendary) {
            return "legendary";
        }
        else if (randInt <= pokemon_rarity_1.rateValues.ultra_rare) {
            return "ultra_rare";
        }
        else if (randInt <= pokemon_rarity_1.rateValues.super_rare) {
            return "super_rare";
        }
        else if (randInt <= pokemon_rarity_1.rateValues.rare) {
            return "rare";
        }
        else if (randInt <= pokemon_rarity_1.rateValues.uncommon) {
            return "uncommon";
        }
        else {
            return "common";
        }
    }
    getRandInt(max) {
        return Math.floor(Math.random() * max) + 1;
    }
}
exports.PokemonGacha = PokemonGacha;
// const randGen = new PokemonGacha();
// console.log(randGen.pullRandomPokemon());
//# sourceMappingURL=random-pokemon-generator.js.map