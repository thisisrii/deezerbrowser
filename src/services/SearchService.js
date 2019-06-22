import { config } from '../config';


export const searchByArtist = async (params) => {

    let response = await fetch(config.baseURL + 'search/artist?limit=5&q=' + params); // Call the fetch function passing the url of the API as a parameter
    let data = await response.json();
    console.log('data', data);
    return data.data;
}
