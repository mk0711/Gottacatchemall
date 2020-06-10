import { BattlePokemon as Pokemon } from "./misc/battle-pokemon";
import { Item } from "./item";
import { Pokeballs } from "./data/balls";
import { Items } from "./data/items";
import { Pokedex } from "./data/pokedex"; 

export class Player {
    private team: Pokemon[];
    private balls: Inventory | undefined;
    private items: Inventory | undefined;
    private dex: PlayerPokedex | undefined;
    private dbModel;
    private playerObj;
    constructor(private id: number, PlayerModel) {
        this.team = [];
        this.balls = undefined;
        this.items = undefined;

        this.dex = undefined;
        this.playerObj = undefined;
        this.dbModel = PlayerModel;
    }

    private queryPlayerObj = async() => {
        await this.queryPlayerObjHelper(this.dbModel);
    }

    private queryPlayerObjHelper = async (PlayerModel) => {
        this.playerObj = await PlayerModel.findById(this.id);
        // if this user has never been found in the db then create a new user
        if (!this.playerObj) {
            this.dex = new PlayerPokedex(null);
            this.balls = new Inventory(null, Pokeballs);
            this.items = new Inventory(null, Items);

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

            await query.save((err) => {
                if (err) {
                    console.log(err);
                }
                return;
            });
            this.playerObj = newPlayerObj;
        } else {
            this.dex = new PlayerPokedex(this.playerObj.dex);
            this.balls = new Inventory(this.playerObj.balls, Pokeballs);
            this.items = new Inventory(this.playerObj.items, Items);
        }
    }

    getID() {
        return this.id;
    }

    async getDex() {
        if (!this.playerObj) {
            await this.queryPlayerObj();
        }
        return this.dex!.getCaughtDex();
    }

    async getInventory() {
        if (!this.playerObj) {
            await this.queryPlayerObj();
        }
        return {
            balls: this.balls!.getInventory(),
            items: this.items!.getInventory()
        };
    }

    async hasBall(ballName: string) {
        if (!this.playerObj) {
            await this.queryPlayerObj();
        }
        return this.balls!.hasItem(ballName);
    }

    async hasItem(itemName: string) {
        if (!this.playerObj) {
            await this.queryPlayerObj();
        }
        return this.items!.hasItem(itemName);
    }

    async useItem(itemName) {
        if (!this.playerObj) {
            await this.queryPlayerObj();
        }
        
        this.items!.removeItem(itemName);

        this.playerObj.items = this.items!.getInventory();
        this.playerObj.markModified("items");


        await this.playerObj.save((err) => {
            if (err) {
                console.log(err);
            }
            return;
        });
    }

    async useBallToCatch(ballName: string, pokemonName: string) {
        if (!this.playerObj) {
            await this.queryPlayerObj();
        }

        this.balls!.removeItem(ballName);
        this.playerObj.balls = this.balls!.getInventory();
        this.playerObj.markModified("balls");

        this.dex!.addPokemonToDex(pokemonName.toLowerCase());
        this.playerObj.dex = this.dex!.getCaughtDex();
        this.playerObj.markModified("dex");

        // player caught the pokemon so they no longer is encountering it
        this.playerObj.encounter = {
            isEncountering: false
        }
        this.playerObj.markModified("encounter");

        await this.playerObj.save((err) => {
            if (err) {
                console.log(err);
            }
            return;
        });
    }

    async useItemAndAddToDex(itemName: string, pokemonName: string) {
        if (!this.playerObj) {
            await this.queryPlayerObj();
        }
                
        this.items!.removeItem(itemName);
        this.playerObj.items = this.items!.getInventory();
        this.playerObj.markModified("items");


        this.dex!.addPokemonToDex(pokemonName.toLowerCase());
        this.playerObj.dex = this.dex!.getCaughtDex();
        this.playerObj.markModified("dex");

        await this.playerObj.save((err) => {
            if (err) {
                console.log(err);
            }
            return;
        });
    }

    async useBallFailToCatch(ballName: string) {
        if (!this.playerObj) {
            await this.queryPlayerObj();
        }

        this.balls!.removeItem(ballName);
        this.playerObj.balls = this.balls!.getInventory();

        this.playerObj.markModified("balls");

        // let's say the pokemon doesn't run away after a failed capture for now
        await this.playerObj.save((err) => {
            if (err) {
                console.log(err);
            }
            return;
        });
    }

    async setEncounter(pokemonName: string, rarity:string) {
        if (!this.playerObj) {
            await this.queryPlayerObj();
        }
        this.playerObj.encounter = {
            isEncountering: true,
            pokemonName: pokemonName,
            rarity: rarity
        };
        this.playerObj.markModified("encounter");
        await this.playerObj.save((err) => {
            if (err) {
                console.log(err);
            }
            return;
        });
    }

    async runAwayFromEncounter() {
        if (!this.playerObj) {
            await this.queryPlayerObj();
        }
        this.playerObj.encounter = {
            isEncountering: false,
            pokemonName: undefined,
            rarity: undefined,
        };
        this.playerObj.markModified("encounter");
        await this.playerObj.save((err) => {
            if (err) {
                console.log(err);
            }
            return;
        });
    }

    async isAlreadyInEncounter() {
        if (!this.playerObj) {
            await this.queryPlayerObj();
        }
        if (!this.playerObj.encounter) {
            return false;
        }
        return this.playerObj.encounter.isEncountering;
    }

    async getCurrentEncounter() {
        if (!this.playerObj) {
            await this.queryPlayerObj();
        }
        if (!this.playerObj.encounter) {
            return undefined;
        }
        return {
            pokemonName: this.playerObj.encounter.pokemonName,
            rarity: this.playerObj.encounter.rarity
        };
    }

    async hasPokemonInDex(pokemonName: string) {
        if (!this.playerObj) {
            await this.queryPlayerObj();
        }      
        return this.playerObj.dex[pokemonName.toLowerCase()];
    }
}

export class PlayerPokedex {
    private caughtDex: {[pokemonName: string]: boolean};
    constructor(caughtDex: {[pokemonName: string]: boolean} | null) {
        if (!caughtDex) {
            this.caughtDex = this.initCaughtDex();
        } else {
            this.caughtDex = caughtDex;
        }
    }

    // return a JS Object
    getCaughtDex(): {[pokemonName: string]: boolean} {
        return this.caughtDex;
    }

    addPokemonToDex(pokemonName: string): boolean {
        if (pokemonName in this.caughtDex) {
            this.caughtDex[pokemonName] = true;
            return true;
        }
        return false;
    }

    private initCaughtDex(): {[pokemonName: string]: boolean} {
        let result: {[pokemonName: string]: boolean} = {};
        const allPokemonNames = Object.keys(Pokedex);
        for (const pokemonName of allPokemonNames) {
            result[pokemonName] = false;
        }
        return result;
    }
}

export class Inventory {
    private inventory: {[ballName: string]: number}
    private itemMap;

    private validItemNames: Set<string>;
    constructor(ballInventory: {[ballName: string]: number} | null, itemMap) {
        this.itemMap = itemMap; 

        this.validItemNames = this.getValidItemNames();

        if (!ballInventory) {
            this.inventory = this.initItemInventory();
        } else {
            this.inventory = ballInventory;
        }
    }

    getInventory() {
        return this.inventory;
    }

    // return true if add successful and false otherwise
    addItem(item: string): boolean {
        if (this.validItemNames.has(item)) {
            this.inventory[item] += 1;
            return true;
        }
        return false;
    }

    // return true if user can use ball and deduct the ball count by 1
    removeItem(item: string) : boolean {
        if (!this.validItemNames.has(item)) {
            return false;
        }
        if (!this.hasItem(item)) {
            return false;
        }
        this.inventory[item] -= 1;
        return true;
    }

    hasItem(item: string): boolean {
        return this.inventory[item] > 0;
    }

    private initItemInventory(): {[ballName: string]: number} {
        let result: {[ballName: string]: number} = {};
        for (const item of this.validItemNames) {
            if (this.itemMap[item].isMasterball) {
                result[item] = 0;
            } else {
                result[item] = 100;
            }
            
        }
        return result;
    }

    private getValidItemNames(): Set<string> {
        let result: Set<string> = new Set();
        const validItemNames = Object.keys(this.itemMap);
        for (const itemName of validItemNames) {
            result.add(itemName);
        }
        return result;
    }
}

