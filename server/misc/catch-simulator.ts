import { Pokedex } from "../data/pokedex";
import { Pokeballs } from "../data/balls";


export class PokemonCatcher {
    catchPokemon(pokemonName: string, ballName: string): boolean {
        if (!Pokedex[pokemonName] || !Pokeballs[ballName]) {
            return false;
        }
        if (ballName === "masterball") {
            return true;
        } 
        const catchRate: number = Pokedex[pokemonName].catchRate;
        const catchRateMultiplier: number = Pokeballs[ballName].catchRateMultiplier;
    
        const randInt = this.getRandomInt(600);

        return catchRate * catchRateMultiplier > randInt;
    }

    private getRandomInt(max: number): number {
        return Math.floor(Math.random() * Math.floor(max));
    }    
}
