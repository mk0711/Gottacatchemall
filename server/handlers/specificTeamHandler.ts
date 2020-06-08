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



