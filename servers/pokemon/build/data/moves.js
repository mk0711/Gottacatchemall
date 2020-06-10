"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Moves = {
    //normal
    tackle: {
        name: "Tackle",
        power: 50,
        type: "normal",
        category: "physical",
        acc: 100
    },
    slash: {
        name: "Slash",
        power: 70,
        type: "normal",
        category: "physical",
        acc: 100
    },
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
    hyperbeam: {
        name: "Hyper Beam",
        power: 150,
        type: "normal",
        category: "special",
        acc: 90
    },
    gigaimpact: {
        name: "Giga Impact",
        power: 150,
        type: "normal",
        category: "Physical",
        acc: 90
    },
    thrash: {
        name: "Thrash",
        power: 120,
        type: "normal",
        category: "physical",
        acc: 10,
    },
    //fighting
    closecombat: {
        name: "Close Combat",
        power: 120,
        type: "fighting",
        category: "physical",
        acc: 100,
    },
    aurasphere: {
        name: "Aura Sphere",
        power: 90,
        type: "fighting",
        category: "special",
        acc: 100,
    },
    karatechop: {
        name: "Karate Chop",
        power: 75,
        type: "fighting",
        category: "physical",
        acc: 100,
    },
    crosschop: {
        name: "Cross Chop",
        power: 100,
        type: "fighting",
        category: "physical",
        acc: 80,
    },
    skyuppercut: {
        name: "Skyuppercut",
        power: 90,
        type: "fighting",
        category: "physical",
        acc: 85,
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
    skyattack: {
        name: "Sky Attack",
        power: 140,
        type: "flying",
        category: "physical",
        acc: 90
    },
    bravebird: {
        name: "Brave Bird",
        power: 120,
        type: "flying",
        category: "physical",
        acc: 100
    },
    wingattack: {
        name: "Wing Attack",
        power: 60,
        type: "flying",
        category: "physical",
        acc: 90
    },
    //poison
    acid: {
        name: "Acid",
        power: 40,
        type: "poison",
        category: "special",
        acc: 100
    },
    poisonsting: {
        name: "Poison Sting",
        power: 15,
        type: "poison",
        category: "physical",
        acc: 100,
    },
    gunkshot: {
        name: "Gunk Shot",
        power: 120,
        type: "poison",
        category: "physical",
        acc: 80,
    },
    sludgebomb: {
        name: "Sludge Bomb",
        power: 90,
        type: "poison",
        category: "special",
        acc: 100,
    },
    poisontail: {
        name: "Poison Tail",
        power: 50,
        type: "poison",
        category: "physical",
        acc: 100,
    },
    poisonjab: {
        name: "Poison Jab",
        power: 80,
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
    dig: {
        name: "Dig",
        power: 80,
        type: "ground",
        category: "physical",
        acc: 100,
    },
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
    rockslide: {
        name: "Rock Slide",
        power: 75,
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
    bugbite: {
        name: "Bug Bite",
        power: 60,
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
    },
    shadowball: {
        name: "Shadow Ball",
        power: 80,
        type: "ghost",
        category: "special",
        acc: 100,
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
    },
    flashcannon: {
        name: "Flash Cannon",
        power: 80,
        type: "steel",
        category: "special",
        acc: 100,
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
    steelbeam: {
        name: "Steel Beam",
        power: 130,
        type: "steel",
        category: "special",
        acc: 90,
    },
    //fire
    ember: {
        name: "Ember",
        power: 40,
        type: "fire",
        category: "special",
        acc: 100
    },
    firepunch: {
        name: "Fire Punch",
        power: 75,
        type: "fire",
        category: "physical",
        acc: 100,
    },
    flareblitz: {
        name: "Flare Blitz",
        power: 120,
        type: "fire",
        category: "physical",
        acc: 100,
    },
    fireblast: {
        name: "Fire Blast",
        power: 110,
        type: "fire",
        category: "special",
        acc: 85,
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
    flamethrower: {
        name: "Flamethrower",
        power: 90,
        type: "fire",
        category: "special",
        acc: 100
    },
    blastburn: {
        name: "Blast Burn",
        power: 150,
        type: "fire",
        category: "special",
        acc: 90
    },
    //water
    bubble: {
        name: "Bubble",
        power: 20,
        type: "water",
        category: "special",
        acc: 100,
    },
    bubblebeam: {
        name: "Bubble",
        power: 65,
        type: "water",
        category: "special",
        acc: 100,
    },
    waterfall: {
        name: "Water Fall",
        power: 80,
        type: "water",
        category: "physical",
        acc: 100,
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
    hydrocannon: {
        name: "Hydro Cannon",
        power: 150,
        type: "water",
        category: "special",
        acc: 90
    },
    //grass
    seedbomb: {
        name: "Seed Bomb",
        power: 80,
        type: "grass",
        category: "physical",
        acc: 100
    },
    leafblade: {
        name: "Leaf Blade",
        power: 90,
        type: "grass",
        category: "physical",
        acc: 100,
    },
    leafstorm: {
        name: "Leaf Storm",
        power: 130,
        type: "grass",
        category: "special",
        acc: 90,
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
    energyball: {
        name: "Energy Ball",
        power: 80,
        type: "grass",
        category: "special",
        acc: 100
    },
    branchpoke: {
        name: "Branch Poke",
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
    frenzyplant: {
        name: "Frenzy Plant",
        power: 150,
        type: "grass",
        category: "special",
        acc: 90
    },
    //electric
    spark: {
        name: "Spark",
        power: 65,
        type: "electric",
        category: "physical",
        acc: 100,
    },
    thunderpunch: {
        name: "Thunder Punch",
        power: 75,
        type: "electric",
        category: "physical",
        acc: 100,
    },
    thunderbolt: {
        name: "Thunder Bolt",
        power: 90,
        type: "electric",
        category: "special",
        acc: 100,
    },
    thunder: {
        name: "Thunder",
        power: 110,
        type: "electric",
        category: "special",
        acc: 70
    },
    voltswitch: {
        name: "Volt Switch",
        power: 100,
        type: "electric",
        category: "special",
        acc: 70
    },
    volttackle: {
        name: "Volt Tackle",
        power: 120,
        type: "electric",
        category: "physical",
        acc: 100
    },
    wildcharge: {
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
    },
    psychic: {
        name: "Psychic",
        power: 90,
        type: "psychic",
        category: "special",
        acc: 100,
    },
    psybeam: {
        name: "Psybeam",
        power: 65,
        type: "psychic",
        category: "special",
        acc: 100,
    },
    //ice
    icepunch: {
        name: "Ice Punch",
        power: 75,
        type: "ice",
        category: "physical",
        acc: 100,
    },
    aurorabeam: {
        name: "Aurora Beam",
        power: 65,
        type: "ice",
        category: "special",
        acc: 100,
    },
    icebeam: {
        name: "Ice Beam",
        power: 90,
        type: "ice",
        category: "special",
        acc: 100,
    },
    blizzard: {
        name: "Blizzard",
        power: 110,
        type: "ice",
        category: "special",
        acc: 70,
    },
    iciclecrash: {
        name: "Icicle Crash",
        power: 85,
        type: "ice",
        category: "physical",
        acc: 90,
    },
    iciclespear: {
        name: "Icicle Spear",
        power: 25,
        type: "ice",
        category: "physical",
        acc: 100,
    },
    //dragon
    dragonrush: {
        name: "Dragon Rush",
        power: 100,
        type: "dragon",
        category: "physical",
        acc: 85
    },
    dracometeor: {
        name: "Draco Meteor",
        power: 130,
        type: "dragon",
        category: "special",
        acc: 90,
    },
    outrage: {
        name: "Outrage",
        power: 120,
        type: "dragon",
        category: "physical",
        acc: 10,
    },
    dragonpulse: {
        name: "Dragon Pulse",
        power: 90,
        type: "dragon",
        category: "physical",
        acc: 10,
    },
    //dark
    nightslash: {
        name: "Night Slash",
        power: 70,
        type: "dark",
        category: "physical",
        acc: 100,
    },
    bite: {
        name: "Bite",
        power: 60,
        type: "dark",
        category: "physical",
        acc: 100,
    },
    crunch: {
        name: "Crunch",
        power: 80,
        type: "dark",
        category: "physical",
        acc: 100,
    },
    darkpulse: {
        name: "Dark Pulse",
        power: 80,
        type: "dark",
        category: "special",
        acc: 100,
    },
    //fairy
    playrough: {
        name: "Play Rough",
        power: 90,
        type: "fairy",
        category: "physical",
        acc: 90,
    },
    moonblast: {
        name: "Moonblast",
        power: 95,
        type: "fairy",
        category: "special",
        acc: 100,
    },
    dazzlinggleam: {
        name: "Moonblast",
        power: 80,
        type: "fairy",
        category: "special",
        acc: 100
    },
};
//# sourceMappingURL=moves.js.map