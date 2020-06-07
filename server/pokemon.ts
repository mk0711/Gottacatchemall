import { Pokedex } from "./data/pokedex";

export class Pokemon {
    constructor(private pokemonName: string) {
    }

    
}

class PokemonStat {
   hp: number;
   atk: number;
   def: number;
   spAtk: number;
   spDef: number;
   speed: number;
   constructor(hp: number, atk: number, def: number, spAtk: number, spDef: number, speed: number) {
       this.hp = hp;
       this.atk = atk;
       this.def = def;
       this.spAtk = spAtk;
       this.spDef = spDef;
       this.speed = speed;
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


const testPokemonSnorlax = {
    species: "snorlax",
    stat: {
        hp: 160,
        atk: 110,
        def: 65,
        spAtk: 65,
        spDef: 110,
        speed: 30
    },
    moveSet: [
        {
            name: "body slam",
            basePower: 75,
            accuracy: 100,
            type: "normal",
            category: "physical",
            pp: 24
        },
        {
            name: "earthquake",
            basePower: 100,
            accuracy: 100,
            type: "ground",
            category: "physical",
            pp: 16
        }
    ],
    catchRate: 0.1,
    sprite: "https://img.pokemondb.net/sprites/ruby-sapphire/normal/snorlax.png"
}

const user = {
    username: "npham24",
    money: 100,
    inventory: {
        "pokeball": 10,
        "greatball": 10,
        "ultraball": 10
    },
    mainPokemon: {
            species: "snorlax",
            nickname: "fatty",
            nature: "adamant",
            moveSet: [
                {
                    name: "body slam"
                },
                {
                    name: "earthquake"
                }
            ],
            sprite: "https://img.pokemondb.net/sprites/ruby-sapphire/normal/snorlax.png"
    },
    pokedex: [
        "bulbasaur",
        "ivysaur",
        "venusaur",
        "snorlax"
    ]
}