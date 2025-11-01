const TMDB_API_KEY = 'YOUR_API_KEY_HERE';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w342';
const TMDB_BACKDROP_BASE = 'https://image.tmdb.org/t/p/w1280';

const movieMappings = {
    "16390": { short_id: "filme_samurai", dailymotion_videos: { "1_1": "k3wQCEqZUkszzlCGAtG" } },
    "32916": { short_id: "filme_abracadabra", dailymotion_videos: { "1_1": "k1CZbewSx700GACXNwu" } },
    "45752": { short_id: "filme_verao", dailymotion_videos: { "1_1": "k4dzhVwbYPoTUzD749E" } },
    "67900": { short_id: "filme_fantasmossauro", dailymotion_videos: { "1_1": "k298wqd2K5JNLdCH1sq" } },
    "81900": { short_id: "filme_musica", dailymotion_videos: { "1_1": "k2ADu623zColXjCH1F8" } },
    "119321": { short_id: "filme_circo", dailymotion_videos: { "1_1": "k3tkvc1NRBYHIeCHc8s" } },
    "151535": { short_id: "filme_falcao", dailymotion_videos: { "1_1": "k77V6abvPivgYcCHc9y" } },
    "210769": { short_id: "filme_mapa", dailymotion_videos: { "1_1": "ktSjQrBzVr3lSDCIlBo" } },
    "203696": { short_id: "filme_medo", dailymotion_videos: { "1_1": "k6TEatv5fxdSFkCHcdm" } },
    "258893": { short_id: "filme_lutamania", dailymotion_videos: { "1_1": "k4kJw11ajQ44RsCHcgy" } },
    "284995": { short_id: "filme_frankenstein", dailymotion_videos: { "1_1": "k7KGYpO9VVxMMJCHsV6" } },
    "302960": { short_id: "filme_lua", dailymotion_videos: { "1_1": "kYpwsafh79pgZDODimCHEYI" } },
    "347688": { short_id: "filme_rock", dailymotion_videos: { "1_1": "k31MuBI2DIrnTDCHsXO" } },
    "392536": { short_id: "filme_hollywood", dailymotion_videos: { "1_1": "k5RVQ5C7VOzQvsCHt10" } },
    "409122": { short_id: "filme_demonio", dailymotion_videos: { "1_1": "k7iddWkmzDODimCHEYI" } },
    "427564": { short_id: "filme_combate", dailymotion_videos: { "1_1": "k4ye0RNAirG2MvCHEZW" } },
    "461054": { short_id: "filme_praia", dailymotion_videos: { "1_1": "k5KS8YutSOrycNCHF1m" } },
    "484862": { short_id: "filme_bravos", dailymotion_videos: { "1_1": "kjbCNCRE96qg6iCHF2A" } },
    "533592": { short_id: "filme_gourmet", dailymotion_videos: { "1_1": "k6MVp9QDV7UggOCILkO" } },
    "560066": { short_id: "filme_13fantasma", dailymotion_videos: { "1_1": "k5JatLuERI3ZIeCHWjm" } },
    "615774": { short_id: "filme_devolta", dailymotion_videos: { "1_1": "k20vrLDHJXvKXSCHWmu" } },
    "385103": { short_id: "filme_scooby", dailymotion_videos: { "1_1": "ADD_DAILYMOTION_ID" } }
};

async function fetchMovieFromTMDB(movieId) {
    const response = await fetch(`${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=pt-BR`);
    const data = await response.json();
    
    const mapping = movieMappings[movieId];
    
    return {
        short_id: mapping.short_id,
        title: data.title,
        release_year: new Date(data.release_date).getFullYear(),
        year: new Date(data.release_date).getFullYear().toString(),
        poster_path: `https://image.tmdb.org/t/p/w342${data.poster_path}`,
        dailymotion_videos: mapping.dailymotion_videos
    };
}

async function loadScoobyMovies() {
    const movies = {};
    
    for (const movieId of Object.keys(movieMappings)) {
        try {
            movies[movieId] = await fetchMovieFromTMDB(movieId);
        } catch (error) {
            console.error(`Erro ao carregar filme ${movieId}:`, error);
        }
    }
    
    return movies;
}

export { loadScoobyMovies, fetchMovieFromTMDB };