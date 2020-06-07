import { pokemonPullRate, rateValues } from "../data/pokemon-rarity";

export class PokemonGacha {
    pullRandomPokemon(): {"pokemonName": string, "rarity": string} {
        const rarity: string = this.getRandRarity();
        const pkm = pokemonPullRate[rarity];
        return {
            pokemonName: pkm[Math.floor(Math.random() * pkm.length)],
            rarity: rarity
        };
    }

    private getRandRarity(): string {
        const max: number = rateValues.legendary + 
                            rateValues.ultra_rare + 
                            rateValues.super_rare + 
                            rateValues.rare + 
                            rateValues.uncommon + 
                            rateValues.common;
        const randInt: number = this.getRandInt(max);
        if (randInt <= rateValues.legendary) {
            return "legendary";
        } else if (randInt <= rateValues.ultra_rare) {
            return "ultra_rare";
        } else if (randInt <= rateValues.super_rare) {
            return "super_rare";
        } else if (randInt <= rateValues.rare) {
            return "rare";
        } else if (randInt <= rateValues.uncommon) {
            return "uncommon";
        } else {
            return "common";
        }
    }

    private getRandInt(max: number) {
        return Math.floor(Math.random() * max) + 1;
    }
}


// const randGen = new PokemonGacha();
// console.log(randGen.pullRandomPokemon());


