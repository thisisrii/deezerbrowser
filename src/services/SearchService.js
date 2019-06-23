import { config } from '../config';


export const searchForSuggestions = async (params) => {
    let response = await fetch(config.baseURL + 'search/artist?limit=5&q=' + params);
    let data = await response.json();
    return data.data;
}

export const searchForAlbums = async (params) => {
    let artistResponse = await fetch(config.baseURL + 'search/artist?limit=1&q=' + params);
    let artist = await artistResponse.json();

    let albumsResponse = await fetch(config.baseURL + 'artist/' + artist.data[0].id + '/albums');
    let albums = await albumsResponse.json();
    return albums.data;
}

export const searchForTracks = async (params) => {
    let response = await fetch(config.baseURL + 'album/' + params);
    let data = await response.json();
    return data;
}