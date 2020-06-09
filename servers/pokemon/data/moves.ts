const Moves = {
    //normal
    strength: {
        name: "Strength",
        power: 80,
        type: "normal",
        category: "physical",
        acc: 100
    },
    hypervoice: {
        name: "Hyper Voice",
        power: 90,
        type: "normal",
        category: "special",
        acc: 100
    },  

    //fighting
    closecombat: {
        name: "Close Combat",
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
        name: "Aura Sphere",
        power: 90,
        type: "fighting",
        category: "special",
        acc: -1, //bypass accuracy check
    },

    // flying
    drillpeck: {
        name: "Drill Peck", 
        power: 85,
        type: "flying",
        category: "physical",
        acc: 100,
    },
    hurricane: {
        name: "Hurricane",
        power: 120,
        type: "flying",
        category: "special",
        acc: 70
    },
    gust: {
        name: "Gust",
        power: 40,
        type: "flying",
        category: "special",
        acc: 100
    },
    peck: {
        name: "Peck",
        power: 35,
        type: "flying",
        category: "physical",
        acc: 100
    },
    skytattack: {
        name: "Sky Attack",
        power: 140,
        type: "flying",
        category: "physical",
        acc: 90
    },
    wingattack: {
        name: "Wing Attack",
        power: 60,
        type: "flying",
        category: "physical",
        acc: 90
    },

    //poison
    gunkshot: {
        name: "Gunk Shot",
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
        name: "Sludge Bomb",
        power: 90,
        type: "poison",
        category: "special",
        acc: 100,
        inflict_status: {
            type: "poison",
            chance: 30
        }
    },
    poisontail: {
        name: "Poison Tail",
        power: 50,
        type: "poison",
        category: "physical",
        acc: 100,
    },
    smog: {
        name: "smog",
        power: 30,
        type: "poison",
        category: "special",
        acc: 70,
    },
    poisonfang: {
        name: "Poison Fang",
        power: 50,
        type: "poison",
        category: "physical",
        acc: 100,
    },

    //ground
    earthquake: {
        name: "Earthquake", 
        power: 100,
        type: "ground",
        category: "physical",
        acc: 100,
    },
    earthpower: {
        name: "Earth Power", 
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
    drillrun: {
        name: "Drill Run",
        power: 80,
        type: "ground",
        category: "physical",
        acc: 95,
    },
    sandtomb: {
        name: "Sand Tomb",
        power: 35,
        type: "ground",
        category: "physical",
        acc: 85,
    },
    highhorsepower: {
        name: "High Horsepower",
        power: 95,
        type: "ground",
        category: "physical",
        acc: 95,
    },


    //rock
    stoneedge: {
        name: "Stone Edge",
        power: 100,
        type: "rock",
        category: "physical",
        acc: 80,
        highcritratio: true
    },
    powergem: {
        name: "Power Gem",
        power: 80,
        type: "rock",
        category: "special",
        acc: 100
    },
    rollout: {
        name: "Roll out", 
        power: 80,
        type: "rock",
        category: "special",
        acc: 100
    },
    smackdown: {
        name: "Smach Down", 
        power: 50,
        type: "rock",
        category: "physical",
        acc: 100
    },
    rockthrow: {
        name: "Rock Throw", 
        power: 50,
        type: "rock",
        category: "physical",
        acc: 90
    },

    //bug
    megahorn: {
        name: "Mega Horn",
        power: 120,
        type: "bug",
        category: "physical",
        acc: 85
    },
    bugbuzz: {
        name: "Bug Buzz",
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
    attackorder: {
        name: "Attack Order",
        power: 90,
        type: "bug",
        category: "physical",
        acc: 100
    },
    fellstinger: {
        name: "Fell Stinger",
        power: 50,
        type: "bug",
        category: "physical",
        acc: 100
    },
    leechlife: {
        name: "Leech Life",
        power: 80,
        type: "bug",
        category: "physical",
        acc: 100
    },

    //ghost
    shadowsneak: {
        name: "Shadow Sneak",
        power: 40,
        type: "ghost",
        category: "physical",
        acc: 100,
        priority: 1,
    },
    shadowball: {
        name: "Shadow Ball",
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
    shadowclaw: {
        name: "Shadow Claw",
        power: 70,
        type: "ghost",
        category: "physical",
        acc: 100,
    },
    shadowthief: {
        name: "Shadow Theif",
        power: 90,
        type: "ghost",
        category: "physical",
        acc: 100,
    },
    lick: {
        name: "Lick",
        power: 20,
        type: "ghost",
        category: "physical",
        acc: 100,
    },
    moongeistbeam: {
        name: "Moongeist Beam",
        power: 100,
        type: "ghost",
        category: "special",
        acc: 100,
    },

    //steel
    ironhead: {
        name: "Iron Head",
        power: 80,
        type: "steel",
        category: "physical",
        acc: 100,
        flinch_chance: 30
    },
    flashcannon: {
        name: "Flash Cannon",
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
    metalclaw: {
        name: "Metal Claw",
        power: 50,
        type: "steel",
        category: "physical",
        acc: 95,
    },
    steelwing: {
        name: "Steel Wing",
        power: 70,
        type: "steel",
        category: "physical",
        acc: 90,
    },
    sunsteelstrike: {
        name: "Sunsteel Strike",
        power: 100,
        type: "steel",
        category: "physical",
        acc: 100,
    },

    //fire
    flareblitz: {
        name: "Flare Blitz",
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
        name: "Fire Blast",
        power: 110,
        type: "fire",
        category: "special",
        acc: 85,
        inflict_status: {
            type: "burn",
            chance: 10
        }
    },
    burnup: {
        name: "Burn Up",
        power: 140,
        type: "fire",
        category: "special",
        acc: 100
    },
    firespin: {
        name: "Fire Spin",
        power: 35,
        type: "fire",
        category: "special",
        acc: 85
    },
    heatwave: {
        name: "Heat Wave",
        power: 95,
        type: "fire",
        category: "special",
        acc: 90
    },

    //water
    waterfall: {
        name: "Water Fall",
        power: 80,
        type: "water",
        category: "physical",
        acc: 100,
        flinch_chance: 30
    },
    hydropump: {
        name: "Hydropnump",
        power: 110,
        type: "water",
        category: "special",
        acc: 80,
    },
    surf: {
        name: "Surf",
        power: 90,
        type: "water",
        category: "special",
        acc: 100,
    },
    razorshell: {
        name: "Razor Shell",
        power: 75,
        type: "water",
        category: "physical",
        acc: 95,
    },
    liquidation: {
        name: "Liquidation",
        power: 85,
        type: "water",
        category: "physical",
        acc: 100,
    },

    //grass
    leafblade: {
        name: "Leaf Blade",
        power: 90,
        type: "grass",
        category: "physical",
        acc: 100,
        highcritratio: true
    },
    leafstorm: {
        name: "Leaf Storm",
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
        name: "Absorb",
        power: 20,
        type: "grass",
        category: "special",
        acc: 100
    },
    appleacid: {
        name: "Apple Acide", 
        power: 80,
        type: "grass", 
        category: "special", 
        acc: 100
    }, 
    branckpoke: {
        name: "Branck Poke",
        power: 40, 
        type: "grass", 
        category: "physical", 
        acc: 100
    },
    bulletseed: {
        name: "Bullet Seed", 
        power: 25,
        type: "grass", 
        category: "physical",
        acc: 100
    }, 
    drumbeating: {
        name: "Drum Beating", 
        power: 80, 
        type: "grass", 
        category: "physical", 
        acc: 100
    }, 

    //electric
    thunderpunch: {
        name: "Thunder Punch",
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
        name: "Thunder Bolt",
        power: 90,
        type: "electric",
        category: "special",
        acc: 100,
        inflict_status: {
            type: "paralyze",
            chance: 10
        }
    },
    voltswitch : {
        name: "Volt Switch", 
        power: 100, 
        type: "electric", 
        category: "special", 
        acc: 70
    },
    volttackle : {
        name: "Volt Tackle", 
        power: 120, 
        type: "electric", 
        category: "physical", 
        acc: 100
    },
    wildcharge : {
        name: "Wild Charge", 
        power: 90, 
        type: "electric", 
        category: "physical", 
        acc: 100
    },

    //psychic
    zenheadbutt: {
        name: "Zenheadbutt",
        power: 80,
        type: "psychic",
        category: "physical",
        acc: 90,
        flinch_chance: 20
    },
    psychic: {  
        name: "Psychic",
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
        name: "Ice Punch",
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
        name: "Ice Beam",
        power: 90,
        type: "ice",
        category: "special",
        acc: 100,
        inflict_status: {
            type: "freeze",
            chance: 10
        }
    },
    iceburn: {
        name: "Ice Burn",
        power: 140,
        type: "ice",
        category: "special",
        acc: 90,
    },
    icecrash: {
        name: "Ice Crash",
        power: 85,
        type: "ice",
        category: "physical",
        acc: 90,
    },
    icespear: {
        name: "Ice Spear",
        power: 25,
        type: "ice",
        category: "physical",
        acc: 100,
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
