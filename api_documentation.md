### API Documentation
GET /v1/pokedex

returns all the pokemon and if they are caught by the user or not like this example:

response type = {
>"bulbasaur": false,

>"ivysaur": false,

 >"venusaur": false,
    ...

}
Possible return status: 
200 (OK)
401 (Unauthorized)
500 (Internal Server Error)


GET /v1/pokedex/{pokemonName}
returns the information of the pokemon if they are caught by the user. For example:
{
    "dexNumber": 46,
    "name": "Paras",
    "types": [
        "Bug",
        "Grass"
    ],
    "desc": "Burrows to suck tree roots. The mushrooms on its back grow by drawing nutrients from the bug host.",
    "baseStats": {
        "hp": 35,
        "atk": 70,
        "def": 55,
        "spa": 45,
        "spd": 55,
        "spe": 25
    },
    "abilities": {
        "0": "Effect Spore",
        "1": "Dry Skin",
        "H": "Damp"
    },
    "height": 0.3,
    "weight": 5.4,
    "evolvesTo": [
        "Parasect"
    ],
    "eggGroups": [
        "Bug",
        "Grass"
    ],
    "catchRate": 190
}
Possible return status:
200 (OK)
400 (User never caught this pokemon but still requested it/ bad pokemon request)
401 (Unauthorized)


GET /v1/pokedex/image/{pokemonName}
returns the image of the requested pokemon as a png
Possible return status:
200 (OK)
400 (no image found from the query parameter)


GET /v1/encounter
player encounter a pokemon so that they can catch it. Until the player run away/ catch said pokemon you will
keep encountering the same pokemon. Each pokemon has a different rarity, the lower the rarity the harder it is to encounter said pokemon. For example:
{
    pokemonName: "chansey"
    rarity: "ultra_rare"
}
Possible return status:
200 (OK)
401 (Unauthorized)
500 (Internal Server Error)


GET /v1/runaway
player run away from a pokemon, removing themselves from any encounters they may have had.
Possible return status:
200 (OK)
400 (Not already in encounter with any pokemon)
401 (Unauthorized)
500 (Internal Server Error)


GET /v1/catch/{pokemonName}
player tries to catch a pokemon. Remove player from any encounter if they succeed
{
    status: "success" / "failed",
    msg: depending on if they success/ fail + reason why they fail this specific catch (not in encounter with any pokemon/ already in encounter with a different pokemon, catching fail normally)
}
Possible return status:
200 (OK (either catch fail normally or catch successfully))
400 (Not in encounter with any pokemon/ in a different encounter)
401 (Unauthorized)


GET /v1/inventory
show the current inventory the player has. Right now only support different types of balls
response type = {
    "pokeball": 100,
    "greatball": 100,
    ...
}
Possible return status:
200 (OK)
401 (Unauthorized)
500 (Internal Server Error)


GET /v1/items/balls/{ballName} 
show the details of a certain type of ball. For example:
{
    "itemName": "Poke Ball",
    "desc": "A device for catching wild Pokémon. It's thrown like a ball, comfortably encapsulating its target.",
    "catchRateMultiplier": 1,
    "price": 200
}
Possible return status:
200 (OK)
401 (Unauthorized)
400 (Bad request/ query parameter)

GET /v1/items/image/{itemName}
returns the image of the requested ball as a png
Possible return status:
200 (OK)
400 (no image found from the query parameter)


GET /v1/team
show all the pokemon the current user has caught
Possible return status:
200 (OK)
401 (Unauthorized)
500 (Internal Server Error)


GET /v1/team/{pokemonID}
show the specific pokemon of a user
Possible return status:
200 (OK)
400 (User does not have the pokemon)
401 (Unauthorized)
500 (Internal Server Error)

POST /v1/team/{pokemonID}
change the nickname of a pokemon in your team: 
{
    nickName: newName
}
Possible return status:
200 (OK)
400 (User does not have the pokemon)
401 (Unauthorized)
500 (Internal Server Error)
