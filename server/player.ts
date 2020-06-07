import { Pokemon } from "./pokemon";
import { Item } from "./item";
import { Pokeballs } from "./data/balls";
import { Pokedex } from "./data/pokedex"; 

export class Player {
    private team: Pokemon[];
    private balls: BallInventory | undefined;
    private dex: PlayerPokedex | undefined;
    private dbModel;
    private playerObj;
    constructor(private id: number, PlayerModel) {
        this.team = [];
        this.balls = undefined;
        this.dex = undefined;
        this.playerObj = undefined;
        this.dbModel = PlayerModel;
    }

    private queryPlayerObj = async() => {
        return await this.queryPlayerObjHelper(this.dbModel);
    }

    private queryPlayerObjHelper = async (PlayerModel) => {
        let playerObj = await PlayerModel.findById(this.id);
        // if this user has never been found in the db then create a new user
        if (!playerObj) {
            this.dex = new PlayerPokedex(null);
            this.balls = new BallInventory(null);

            const newPlayerObj = {
                _id: this.id,
                dex: this.dex.getCaughtDex(),
                balls: this.balls.getBallInventory(),
            }; 

            const query = new PlayerModel(newPlayerObj);

            await query.save((err) => {
                if (err) {
                    console.log(err);
                }
                return;
            });
        } else {
            this.dex = new PlayerPokedex(playerObj.dex);
            this.balls = new BallInventory(playerObj.balls);
        }
        return playerObj;
    }

    getID() {
        return this.id;
    }

    async getDex() {
        await this.queryPlayerObj();
        return this.dex!.getCaughtDex();
    }

    async getInventory() {
        await this.queryPlayerObj();
        return {
            balls: this.balls!.getBallInventory(),
            items: []
        };
    }

    async hasBall(ballName: string) {
        await this.queryPlayerObj();
        return this.balls!.hasBall(ballName);
    }

    async useBallToCatch(ballName: string, pokemonName: string) {
        let playerObj = await this.queryPlayerObj();

        this.balls!.removeBall(ballName);
        playerObj.balls = this.balls!.getBallInventory();

        this.dex!.addPokemonToDex(pokemonName.toLowerCase());
        playerObj.dex = this.dex!.getCaughtDex();

        playerObj.markModified("dex");
        playerObj.markModified("balls");
        await playerObj.save((err) => {
            if (err) {
                console.log(err);
            }
            return;
        });
    }

    async useBallFailToCatch(ballName: string) {
        let playerObj = await this.queryPlayerObj();

        this.balls!.removeBall(ballName);
        playerObj.balls = this.balls!.getBallInventory();

        playerObj.markModified("balls");
        await playerObj.save((err) => {
            if (err) {
                console.log(err);
            }
            return;
        });
    }

    async hasPokemonInDex(pokemonName: string) {
        // return await this.hasPokemonInDexHelper(pokemonName.toLowerCase(), this.dbModel);
        if (!this.playerObj) {
            this.playerObj = await this.queryPlayerObj();
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

export class BallInventory {
    private ballInventory: {[ballName: string]: number}

    private validPokeballNames: Set<string>;
    constructor(ballInventory: {[ballName: string]: number} | null) {
        this.validPokeballNames = this.getValidPokeballNames();

        if (!ballInventory) {
            this.ballInventory = this.initBallInventory();
        } else {
            this.ballInventory = ballInventory;
        }
        
    }

    getBallInventory() {
        return this.ballInventory;
    }

    // return true if add successful and false otherwise
    addBall(ball: string): boolean {
        if (this.validPokeballNames.has(ball)) {
            this.ballInventory[ball] += 1;
            return true;
        }
        return false;
    }

    // return true if user can use ball and deduct the ball count by 1
    removeBall(ball: string) : boolean {
        if (!this.validPokeballNames.has(ball)) {
            return false;
        }
        if (!this.hasBall(ball)) {
            return false;
        }
        this.ballInventory[ball] -= 1;
        return true;
    }

    hasBall(ball: string): boolean {
        return this.ballInventory[ball] > 0;
    }

    private initBallInventory(): {[ballName: string]: number} {
        let result: {[ballName: string]: number} = {};
        for (const ball of this.validPokeballNames) {
            if (Pokeballs[ball].isMasterball) {
                result[ball] = 0;
            } else {
                result[ball] = 10;
            }
            
        }
        return result;
    }

    private getValidPokeballNames(): Set<string> {
        let result: Set<string> = new Set();
        const validPokeballNames = Object.keys(Pokeballs);
        for (const ball of validPokeballNames) {
            result.add(ball);
        }
        return result;
    }
}
