const { contentType, applicationJSON, textPlain, XUser } = require("../header");

export const getSpecificTeamHandler = async (request, response, { BattlePokemonModel }) => {
    try {
        // if the user already caught the pokemon, then get its information
        const user = JSON.parse(request.header(XUser));

        const pokemonID = request.params["pokemonID"];
        const pokemon = await BattlePokemonModel.findById(pokemonID);

        if (!pokemon || user.id != pokemon.owner_id) {
            response.set(contentType, textPlain);
            response.status(400).json("User does not have this pokemon");
            return;
        }

        response.set(contentType, applicationJSON);
        response.status(200).json(pokemon);
    } catch(e) {
        response.status(500).send("There was an error getting your team. Error: " + e);
    }
}

export const postSpecificTeamHandler = async (request, response, { BattlePokemonModel }) => {
    try {
        if (request.get(contentType) !== applicationJSON) {
            response.status(400).send("Bad request. Application type must be JSON");
            return;
        }
    
        // if the user already caught the pokemon, then get its information
        const user = JSON.parse(request.header(XUser));

        const pokemonID = request.params["pokemonID"];
        const pokemon = await BattlePokemonModel.findById(pokemonID);

        if (!pokemon || user.id != pokemon.owner_id) {
            response.set(contentType, textPlain);
            response.status(400).json("User does not have this pokemon");
            return;
        }

        const { nickName } = request.body;
        pokemon.nickName = nickName;
        pokemon.save((err, newPkm) => {
            if (err) {
                console.log(err);
            }
            response.set(contentType, applicationJSON);
            response.status(200).json(newPkm);
            return;
        })
        return;
    } catch(e) {
        response.status(500).send("There was an error getting your team. Error: " + e);
        return;
    }
}


