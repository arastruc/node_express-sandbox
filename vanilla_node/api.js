const SWAPI_URL = "https://swapi.dev/api";
const PLANET_RESOURCE = "planets";
const PLANET_ENDPOINT = `${SWAPI_URL}/${PLANET_RESOURCE}`;

function find_planet_by_id(planetId) {
  return fetch(`${PLANET_ENDPOINT}/${planetId || ""}`).then((response) => {
    return response.json();
  });
}

module.exports = {
  findById: find_planet_by_id,
};
