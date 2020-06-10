import { Pokedex } from "../data/pokedex";
import { learnset } from "../data/learnset";
import { Items } from "../data/items";

interface IStat {
    hp: number,
    atk: number,
    def: number,
    spa: number,
    spd: number,
    spe: number
};

interface IBattlePokemon {
    owner_id: number,
    pokemonName: string,
    nickName: string,
    level: number,
    IV: IStat,
    nature: string,
    stats: IStat,
    moves: string[]
}

export class BattlePokemon {
    private pokemonObj: IBattlePokemon;

    constructor(private owner_id: number, private pokemonName: string, pokemonObj: IBattlePokemon | null) {
        if (!pokemonObj) {
            this.pokemonObj = this.initPokemonObj();
        } else {
            this.pokemonObj = pokemonObj;
        }
    }

    private initPokemonObj(): IBattlePokemon {
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
        return {        
            owner_id: this.owner_id,
            pokemonName: this.pokemonName,
            nickName: this.pokemonName,
            level: level,
            IV: IV,
            nature: nature,
            moves: moves,
            stats: this.statCalc(level, IV, nature)
        };

    }
    
    getPokemonObj() {
        return this.pokemonObj;
    }

    private getRandMovesOfPkmFromLearnset(pokemonName: string) {
        if (!learnset[pokemonName]) {
            return [];
        }
        let moves: string[] = learnset[pokemonName];
        if (moves.length <= 4) {
            return moves;
        }
        this.shuffle(moves);
        return moves.slice(0, 4);
    }
    
    private shuffle(arr: string[]) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    private getRandInt(max: number): number {
        return Math.floor(Math.random() * max);
    }

    private getRandomNature(): string {
        const natures = ["hardy", "lonely", "brave", "adamant", "naughty", "bold", "docile", "relaxed", 
                        "impish", "lax", "timid", "hasty", "serious", "jolly", "naive", "modest", "mild",
                        "quiet", "bashful", "rash", "calm", "gentle", "sassy", "careful", "quirky"];
        return natures[this.getRandInt(natures.length - 1)];
    }

    private statCalc(level: number, IV: IStat, nature: string) {
        const baseHP = Pokedex[this.pokemonName].baseStats.hp;
        const baseATK = Pokedex[this.pokemonName].baseStats.atk;
        const baseDEF = Pokedex[this.pokemonName].baseStats.def;
        const baseSPA = Pokedex[this.pokemonName].baseStats.spa;
        const baseSPD = Pokedex[this.pokemonName].baseStats.spd;
        const baseSPE = Pokedex[this.pokemonName].baseStats.spe;

        const natureMultiplier = this.natureMultiplierCalculator(nature);

        // default
        const EV = 84;

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

    private natureMultiplierCalculator(nature: string) {
        let atkNature = 1;
        let defNature = 1;
        let spaNature = 1;
        let spdNature = 1;
        let speNature = 1;

        switch(nature) {
            case("adamant"): {
                atkNature = 1.1;
                spaNature = 0.9;
                break;
            }
            case("bold"): {
                defNature = 1.1;
                speNature = 0.9;
                break;
            }
            case("brave"): {
                atkNature = 1.1;
                speNature = 0.9;
                break;
            }
            case("calm"): {
                spdNature = 1.1;
                atkNature = 0.9;
                break;
            }
            case("careful"): {
                spdNature = 1.1;
                spaNature = 0.9;
                break;
            }
            case("gentle"): {
                spdNature = 1.1;
                defNature = 0.9;
                break;
            }
            case("hasty"): {
                speNature = 1.1;
                defNature = 0.9;
                break;
            }
            case("impish"): {
                defNature = 1.1;
                spaNature = 0.9;
                break;
            }
            case("jolly"): {
                speNature = 1.1;
                spaNature = 0.9;
                break;
            }
            case("lax"): {
                defNature = 1.1;
                spdNature = 0.9;
                break;
            }
            case("lonely"): {
                speNature = 1.1;
                defNature = 0.9;
                break;
            }
            case("mild"): {
                spaNature = 1.1;
                defNature = 0.9;
                break;
            }
            case("modest"): {
                spaNature = 1.1;
                atkNature = 0.9;
                break;
            }
            case("naive"): {
                speNature = 1.1;
                spdNature = 0.9;
                break;
            }
            case("naughty"): {
                atkNature = 1.1;
                spdNature = 0.9;
                break;
            }
            case("quiet"): {
                spaNature = 1.1;
                speNature = 0.9;
                break;
            }
            case("rash"): {
                spaNature = 1.1;
                spdNature = 0.9;
                break;
            }
            case("relaxed"): {
                defNature = 1.1;
                speNature = 0.9;
                break;
            }
            case("sassy"): {
                spdNature = 1.1;
                speNature = 0.9;
                break;
            }
            case("timid"): {
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
        }
    }

    private otherStatCalc(base: number, level: number, IV: number, EV: number, natureMultiplier: number) {
        return Math.floor(((((2 * base + IV + (EV / 4)) * level) / 100) + 5) * natureMultiplier);
    }

    useItem(itemName): boolean {
        if (itemName === "rarecandy" || itemName === "Rare Candy") {
            if (this.pokemonObj.level === 100) {
                return false;
            }
            this.pokemonObj.level += 1;
            const evolveSuccess = this.tryToEvolve("");
            if (!evolveSuccess) {
                // if evolve fail => recalculate base stat
                this.pokemonObj.stats = this.statCalc(this.pokemonObj.level, this.pokemonObj.IV, this.pokemonObj.nature);
            }
            return true;
        }
        else {
            return this.tryToEvolve(itemName);
        }
    }

    private tryToEvolve(itemName): boolean {
        const possibleEvolutions = this.getPossibleEvolutions();
        for (const evolution of possibleEvolutions) {
            const evolutionName = evolution.toLowerCase();
            const evolvedPkmInfo = Pokedex[evolutionName];
            if (itemName != "") {
                // try to evolve using item
                if (evolvedPkmInfo.evoType === "useItem" && evolvedPkmInfo.evoItem === itemName) {
                    this.evolvesTo(evolutionName);
                    return true;
                }
            } else {
                // try to evolve with level
                if (evolvedPkmInfo.evoLevel && evolvedPkmInfo.evoLevel <= this.pokemonObj.level) {
                    this.evolvesTo(evolutionName);
                    return true;
                }
            }
        }
        return false;
    }

    private evolvesTo(pokemonName) {
        // if the nickname is the same as the pokemon name change the nickname
        if (this.pokemonObj.nickName.toLowerCase() === this.pokemonObj.pokemonName.toLowerCase()) {
            this.pokemonObj.nickName = pokemonName;
        }
        this.pokemonName = pokemonName;
        const newMoves = this.getRandMovesOfPkmFromLearnset(this.pokemonName);
        const newStats = this.statCalc(this.pokemonObj.level, this.pokemonObj.IV, this.pokemonObj.nature);
        this.pokemonObj.moves = newMoves;
        this.pokemonObj.stats = newStats;
        this.pokemonObj.pokemonName = pokemonName;

    }

    private getPossibleEvolutions() {
        const pokemonData = Pokedex[this.pokemonName];
        if (pokemonData && pokemonData.evolvesTo) {
            return pokemonData.evolvesTo;
        }
        return [];
    }
}

class PokemonMove {
    name: string;
    basePower: number;
    accuracy: number;
    type: string;
    category: string;
    pp: number;
    constructor(name: string, basePower: number, accuracy: number, type: string, category: string, pp: number) {
        this.name = name;
        this.basePower = basePower;
        this.accuracy = accuracy;
        this.type = type;
        this.category = category;
        this.pp = pp;
    }
}

class TypeChart {
    private typeMap: Map<string, number>;
    private typeChart: number[][] = 
    [
        [1,   1,   1,   1,   1, 0.5,   1,   0, 0.5,   1,   1,   1,   1,   1,   1,   1,   1,   1], // normal
        [2,   1, 0.5, 0.5,   1,   2, 0.5,   0,   2,   1,   1,   1,   1, 0.5,   2,   1,   2, 0.5], // fighting
        [1,   2,   1,   1,   1, 0.5,   2,   1, 0.5,   1,   1,   2, 0.5,   1,   1,   1,   1,   1], // flying
        [1,   1,   1, 0.5, 0.5, 0.5,   1, 0.5,   0,   1,   1,   2,   1,   1,   1,   1,   1,   2], // poison
        [1,   1,   0,   2,   1,   2, 0.5,   1,   2,   2,   1, 0.5,   2,   1,   1,   1,   1,   1], // ground
        [1, 0.5,   2,   1, 0.5,   1,   2,   1, 0.5,   2,   1,   1,   1,   1,   2,   1,   1,   1], // rock
        [1, 0.5, 0.5, 0.5,   1,   1,   1, 0.5, 0.5, 0.5,   1,   2,   1,   2,   1,   1,   2, 0.5], // bug
        [0,   1,   1,   1,   1,   1,   1,   2,   1,   1,   1,   1,   1,   2,   1,   1, 0.5,   1], // ghost
        [1,   1,   1,   1,   1,   2,   1,   1, 0.5, 0.5, 0.5,   1, 0.5,   1,   2,   1,   1,   2], // steel
        [1,   1,   1,   1,   1, 0.5,   2,   1,   2, 0.5, 0.5,   2,   1,   1,   2, 0.5,   1,   1], // fire
        [1,   1,   1,   1,   2,   2,   1,   1,   1,   2, 0.5, 0.5,   1,   1,   1, 0.5,   1,   1], // water
        [1,   1, 0.5, 0.5,   2,   2, 0.5,   1, 0.5, 0.5,   2, 0.5,   1,   1,   1, 0.5,   1,   1], // grass
        [1,   1,   2,   1,   0,   1,   1,   1,   1,   1,   2, 0.5, 0.5,   1,   1, 0.5,   1,   1], // electric
        [1,   2,   1,   2,   1,   1,   1,   1, 0.5,   1,   1,   1,   1, 0.5,   1,   1,   0,   1], // psychic
        [1,   1,   2,   1,   2,   1,   1,   1, 0.5, 0.5, 0.5,   2,   1,   1, 0.5,   2,   1,   1], // ice
        [1,   1,   1,   1,   1,   1,   1,   1, 0.5,   1,   1,   1,   1,   1,   1,   2,   1,   0], // dragon
        [1, 0.5,   1,   1,   1,   1,   1,   2,   1,   1,   1,   1,   1,   2,   1,   1, 0.5, 0.5], // dark
        [1,   2,   1, 0.5,   1,   1,   1,   1, 0.5, 0.5,   1,   1,   1,   1,   1,   2,   2,   1]  // fairy
    ];
    constructor() {
        this.typeMap = this.makeTypeMap();
    }

    getDamageMultiplier(type1: string, type2: string) {
        const type1Position = this.typeMap.get(type1);
        const type2Position = this.typeMap.get(type2);
        if (!type1Position || !type2Position) {
            return -1;
        }
        return this.typeChart[type1Position][type2Position];
    }

    private makeTypeMap(): Map<string, number> {
        let typeMap = new Map<string, number>();
        typeMap.set("normal", 0);
        typeMap.set("fighting", 1);
        typeMap.set("flying", 2);
        typeMap.set("poison", 3);
        typeMap.set("ground", 4);
        typeMap.set("rock",  5);
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

