const Moves = {
    //normal
    strength: {
        power: 80,
        type: "normal",
        category: "physical",
        acc: 100
    },
    hypervoice: {
        power: 90,
        type: "normal",
        category: "special",
        acc: 100
    },  

    //fighting
    closecombat: {
        power: 120,
        type: "fighting",
        category: "physical",
        acc: 100,
        self_debuff: [
            {"def": {
                stage: 1, 
                chance: 100}}, 
            {"spd": {
                stage: 1, 
                chance: 100}}]
    },
    aurasphere: {
        power: 90,
        type: "fighting",
        category: "special",
        acc: -1, //bypass accuracy check
    },

    // flying
    drillpeck: {
        power: 85,
        type: "flying",
        category: "physical",
        acc: 100,
    },
    hurricane: {
        power: 120,
        type: "flying",
        category: "special",
        acc: 70
    },

    //poison
    gunkshot: {
        power: 120,
        type: "poison",
        category: "physical",
        acc: 80,
        inflict_status: {
            type: "poison",
            chance: 30
        }
    },  
    sludgebomb: {
        power: 90,
        type: "poison",
        category: "special",
        acc: 100,
        inflict_status: {
            type: "poison",
            chance: 30
        }
    },

    //ground
    earthquake: {
        power: 100,
        type: "ground",
        category: "physical",
        acc: 100,
    },
    earthpower: {
        power: 90,
        type: "ground",
        category: "special",
        acc: 100,
        enemy_debuff: [
            {"spd": {
                stage: 1,
                chance: 10
            }}
        ]
    },

    //rock
    stoneedge: {
        power: 100,
        type: "rock",
        category: "physical",
        acc: 80,
        highcritratio: true
    },
    powergem: {
        power: 80,
        type: "rock",
        category: "special",
        acc: 100
    },

    //bug
    megahorn: {
        power: 120,
        type: "bug",
        category: "physical",
        acc: 85
    },
    bugbuzz: {
        power: 90,
        type: "bug",
        category: "special",
        acc: 100,
        enemy_debuff: [
            {"spd": {
                stage: 1,
                chance: 10
            }}
        ]
    },

    //ghost
    shadowsneak: {
        power: 40,
        type: "ghost",
        category: "physical",
        acc: 100,
        priority: 1,
    },
    shadowball: {
        power: 80,
        type: "ghost",
        category: "special",
        acc: 100,
        enemy_debuff: [
            {"spd": {
                stage: 1,
                chance: 20
            }}
        ] 
    },

    //steel
    ironhead: {
        power: 80,
        type: "steel",
        category: "physical",
        acc: 100,
        flinch_chance: 30
    },
    flashcannon: {
        power: 80,
        type: "steel",
        category: "special",
        acc: 100,
        enemy_debuff: [
            {"spd": {
                stage: 1,
                chance: 10
            }}
        ] 
    },

    //fire
    flareblitz: {
        power: 120,
        type: "fire",
        category: "physical",
        acc: 100,
        recoil: 0.33,
        inflict_status: {
            type: "burn",
            chance: 10
        }
    },
    fireblast: {
        power: 110,
        type: "fire",
        category: "special",
        acc: 85,
        inflict_status: {
            type: "burn",
            chance: 10
        }
    },

    //water
    waterfall: {
        power: 80,
        type: "water",
        category: "physical",
        acc: 100,
        flinch_chance: 30
    },
    hydropump: {
        power: 110,
        type: "water",
        category: "special",
        acc: 80,
    },

    //grass
    leafblade: {
        power: 90,
        type: "grass",
        category: "physical",
        acc: 100,
        highcritratio: true
    },
    leafstorm: {
        power: 130,
        type: "grass",
        category: "special",
        acc: 90,
        self_debuff: [
            {"spa": {
                stage: 2, 
                chance: 100}}]
    },
    absorb: {
        power: 20,
        type: "grass",
        category: "special",
        acc: 100
    },

    //electric
    thunderpunch: {
        power: 75,
        type: "electric",
        category: "physical",
        acc: 100,
        inflict_status: {
            type: "paralyze",
            chance: 10
        }
    },
    thunderbolt: {
        power: 90,
        type: "electric",
        category: "special",
        acc: 100,
        inflict_status: {
            type: "paralyze",
            chance: 10
        }
    },

    //psychic
    zenheadbutt: {
        power: 80,
        type: "psychic",
        category: "physical",
        acc: 90,
        flinch_chance: 20
    },
    psychic: {  
        power: 90,
        type: "psychic",
        category: "special",
        acc: 100,
        enemy_debuff: [
            {"spd": {
                stage: 1,
                chance: 10
            }}
        ] 
    },

    //ice
    icepunch: {
        power: 75,
        type: "ice",
        category: "physical",
        acc: 100,
        inflict_status: {
            type: "freeze",
            chance: 10
        }
    },
    icebeam: {
        power: 90,
        type: "ice",
        category: "special",
        acc: 100,
        inflict_status: {
            type: "freeze",
            chance: 10
        }
    },

    //dragon
    dragonrush: {
        power: 100,
        type: "dragon",
        category: "physical",
        acc: 85
    },
    dracometeor: {
        power: 130,
        type: "dragon",
        category: "special",
        acc: 90,
        self_debuff: [
            {"spa": {
                stage: 2, 
                chance: 100}}]
    },

    //dark
    nightslash: {
        power: 70,
        type: "dark",
        category: "physical",
        acc: 100,
        highcritratio: true,
    },
    darkpulse: {
        power: 80,
        type: "dark",
        category: "special",
        acc: 100,
        flinch_chance: 20
    },

    //fairy
    playrough: {
        power: 90,
        type: "fairy",
        category: "physical",
        acc: 90,
    },
    moonblast: {
        power: 95,
        type: "fairy",
        category: "special",
        acc: 100,
        enemy_debuff: [
            {"spa": {
                stage: 1,
                chance: 30
            }}
        ] 
    },
}