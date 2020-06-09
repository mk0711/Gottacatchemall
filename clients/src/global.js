export const apiBaseURL = "https://api.npham24.me";

export const typeColorMap = {
    normal: "#A8A878",
    fighting: "#C03028",
    flying: "#A890F0",
    poison: "#A040A0",
    ground: "#E0C068",
    rock: "#B8A038",
    bug: "#A8B820",
    ghost: "#705898",
    steel: "#B8B8D0",
    fire: "#F08030",
    water: "#6890F0",
    grass: "#78C850",
    electric: "#F8D030",
    psychic: "#F85888",
    ice: "#98D8D8",
    dragon: "#7038F8",
    dark: "#705848",
    fairy: "#EE99AC",
}

export const rarityColorMap = {
    common: "#D99454",
    uncommon: "#296EDF",
    rare: "#2EE75A",
    super_rare: "#B846EA",
    ultra_rare: "#EE5252",
    legendary: "#F9F52D",
}

export const sendGetRequestWithAuthHeader = async(url) => {
    const authToken = localStorage.getItem("authHeader");
    return await fetch(url, {
        headers: {
            "Authorization": authToken
        }
    })
}