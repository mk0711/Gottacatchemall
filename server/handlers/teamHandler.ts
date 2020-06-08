const { contentType, applicationJSON, XUser } = require("../header");

export const getTeamHandler = async (request, response, { BattlePokemonModel }) => {
    try {
        // if the user already caught the pokemon, then get its information
        const user = JSON.parse(request.header(XUser));

        const pokemons = await BattlePokemonModel.find({owner_id: user.id});
        response.set(contentType, applicationJSON);
        response.status(200).json(pokemons);
    } catch(e) {
        response.status(500).send("There was an error getting your team. Error: " + e);
    }
}

