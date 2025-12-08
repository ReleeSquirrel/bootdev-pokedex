import { Cache } from "./pokecache";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    cache: Cache;

    constructor() {
        this.cache = new Cache(1000);
    }

    async fetchLocationAreaSet(pageURL?: string): Promise<LocationAreaSet> {
        if (pageURL != undefined) {
            if (this.cache.get(pageURL) != undefined) {
                return this.cache.get(pageURL);
            } else {
                // Get the json from pageURL and return it
                try {
                    const response = await fetch(pageURL);
                    if (!response.ok) {
                        console.log(`HTTP Request Failed - Response status: ${response.status}`);
                    }
                    const result: LocationAreaSet = await response.json();
                    this.cache.add(pageURL, result);
                    return result;
                } catch (err) {
                    console.log(err);
                    const result: LocationAreaSet = {} as LocationAreaSet;
                    return result;
                }
            }
        } else {
            if (this.cache.get(PokeAPI.baseURL + `/location-area/`) != undefined) {
                return this.cache.get(PokeAPI.baseURL + `/location-area/`);
            } else {
                // Get the json from baseURL + `/location-area/` and return it
                try {
                    const response = await fetch(PokeAPI.baseURL + `/location-area/`);
                    if (!response.ok) {
                        console.log(`HTTP Request Failed - Response status: ${response.status}`);
                    }
                    const result: LocationAreaSet = await response.json();
                    this.cache.add(PokeAPI.baseURL + `/location-area/`, result);
                    return result;
                } catch (err) {
                    console.log(err);
                    const result: LocationAreaSet = {} as LocationAreaSet;
                    return result;
                }
            }
        }
    }


    async fetchLocationAreaURL(locationName: string): Promise<LocationAreaURL> {
        try {
            const response = await fetch(PokeAPI.baseURL + `/${locationName}/`);
            if (!response.ok) {
                console.log(`HTTP Request Failed - Response status: ${response.status}`);
            }
            const result: LocationAreaURL = await response.json();
            return result;
        } catch (err) {
            console.log(err);
            const result: LocationAreaURL = {} as LocationAreaURL;
            return result;
        }
    }
}


export type LocationAreaSet = {
    count: number
    next: string
    previous: any
    results: LocationAreaURL[]
}


export type LocationAreaURL = {
    name: string
    url: string
}