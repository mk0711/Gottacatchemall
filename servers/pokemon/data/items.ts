export interface ItemData {
    itemName: string,
    desc: string,
    price: number
}


export const Items: {[itemName: string]: ItemData} = {
    rarecandy: {
        itemName: "Rare Candy",
        desc: "A candy that is packed with energy. When consumed, it will instantly raise the level of a single Pokémon by one.",
        price: 2400
    },
    thunderstone: {
        itemName: "Thunder Stone",
        desc: "A peculiar stone that can make certain species of Pokémon evolve. It has a distinct thunderbolt pattern.",
        price: 3000
    },
    firestone: {
        itemName: "Fire Stone",
        desc: "A peculiar stone that can make certain species of Pokémon evolve. The stone has a fiery orange heart.",
        price: 3000,
    },
    waterstone: {
        itemName: "Water Stone",
        desc: "A peculiar stone that can make certain species of Pokémon evolve. It is the blue of a pool of clear water.",
        price: 3000,
    },
    leafstone: {
        itemName: "Leaf Stone",
        desc: "A peculiar stone that can make certain species of Pokémon evolve. It has an unmistakable leaf pattern.",
        price: 3000,
    },
    moonstone: {
        itemName: "Moon Stone",
        desc: "A peculiar stone that can make certain species of Pokémon evolve. It is as black as the night sky.",
        price: 3000
    },
};
