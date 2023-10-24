const pokemonCount = 151;
const pokeDex = {};

window.onload = async function () {
  for (let i = 1; i <= pokemonCount; i++) {
    await getPokemon(i);
    let pokemon = document.createElement("div");
    pokemon.id = i;
    pokemon.innerText = i.toString() + " . " + (pokeDex[i] ? pokeDex[i]["name"].toUpperCase() : "N/A");
    pokemon.classList.add("pokemon-name");
    pokemon.addEventListener("click", updatePokemon);
    document.getElementById("pokemon-list").append(pokemon);
  }
  if (pokeDex[1]) {
    document.getElementById("pokemon-description").innerText = pokeDex[1]["desc"];
  }
  console.log(pokeDex);
};

async function getPokemon(num) {
  try {
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch Pokémon data");
    }
    let pokemon = await response.json();

    let pokemonName = pokemon["name"];
    let pokemonTypes = pokemon["types"];
    let pokemonImg = pokemon["sprites"]["front_default"];

    url = pokemon['species']["url"];
    response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch Pokémon species data");
    }
    let speciesData = await response.json();
    let pokemonDesc = speciesData["flavor_text_entries"][9]["flavor_text"];

    pokeDex[num] = {
      "name": pokemonName,
      "img": pokemonImg,
      "types": pokemonTypes,
      "desc": pokemonDesc
    };
  } catch (error) {
    console.error("Error while fetching Pokémon data:", error);
  }
}

function updatePokemon() {
  let id = this.id;
  if (pokeDex[id]) {
    document.getElementById("pokemon-img").src = pokeDex[id]["img"];
    let typesDiv = document.getElementById("pokemon-types");
    while (typesDiv.firstChild) {
      typesDiv.firstChild.remove();
    }
    let types = pokeDex[id]["types"];
    for (let i = 0; i < types.length; i++) {
      let type = document.createElement("span");
      type.innerText = types[i]["type"]["name"].toUpperCase();
      type.classList.add("type-box");
      type.classList.add(types[i]["type"]["name"]);
      typesDiv.append(type);
    }
    document.getElementById("pokemon-description").innerText = pokeDex[id]["desc"];
  } else {
    console.log("Pokémon data not available for ID: " + id);
  }
}


