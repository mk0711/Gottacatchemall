export interface BallData {
    itemName: string,
    desc: string,
    catchRateMultiplier: number,
    isMasterball?: boolean,
    price: number
}


export const Pokeballs: {[itemName: string]: BallData} = {
    pokeball: {
        itemName: "Poke Ball",
        desc: "A device for catching wild Pokémon. It's thrown like a ball, comfortably encapsulating its target.",
        catchRateMultiplier: 1,
        price: 200
    },
    greatball: {
        itemName: "Great Ball",
        desc: "A high-performance Ball with a higher catch rate than a standard Poké Ball.",
        catchRateMultiplier: 3,
        price: 500
    },
    ultraball: {
        itemName: "Ultra Ball",
        desc: "An ultra-performance Ball with a higher catch rate than a Great Ball.",
        catchRateMultiplier: 10,
        price: 3000
    },
    masterball: {
        itemName: "Master Ball",
        desc: "The best Poké Ball with the ultimate level of performance. With it, you will catch any wild Pokémon without fail.",
        catchRateMultiplier: 0,
        price: 100000,
        isMasterball: true,
    }
};
