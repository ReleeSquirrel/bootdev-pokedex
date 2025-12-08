export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    constructor() { }
    async fetchLocationAreaSet(pageURL) {
        if (pageURL != undefined) {
            // Get the json from pageURL and return it
            try {
                const response = await fetch(pageURL);
                if (!response.ok) {
                    console.log(`HTTP Request Failed - Response status: ${response.status}`);
                }
                const result = await response.json();
                return result;
            }
            catch (err) {
                console.log(err);
                const result = {};
                return result;
            }
        }
        else {
            // Get the json from baseURL + `/location-area/` and return it
            try {
                const response = await fetch(PokeAPI.baseURL + `/location-area/`);
                if (!response.ok) {
                    console.log(`HTTP Request Failed - Response status: ${response.status}`);
                }
                const result = await response.json();
                return result;
            }
            catch (err) {
                console.log(err);
                const result = {};
                return result;
            }
        }
    }
    async fetchLocationAreaURL(locationName) {
        try {
            const response = await fetch(PokeAPI.baseURL + `/${locationName}/`);
            if (!response.ok) {
                console.log(`HTTP Request Failed - Response status: ${response.status}`);
            }
            const result = await response.json();
            return result;
        }
        catch (err) {
            console.log(err);
            const result = {};
            return result;
        }
    }
}
