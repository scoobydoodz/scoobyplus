const TMDB_API_KEY = 'SUA_CHAVE_API_AQUI';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const movieIds = [
    16390, 32916, 45752, 67900, 81900, 119321, 151535, 
    210769, 203696, 258893, 284995, 302960, 347688, 
    392536, 409122, 427564, 461054, 484862, 533592, 
    560066, 615774, 385103
];

async function fetchMovieData(movieId) {
    try {
        const response = await fetch(`${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=pt-BR`);
        const data = await response.json();
        
        return {
            id: data.id,
            title: data.title,
            release_year: new Date(data.release_date).getFullYear(),
            poster_path: `https://image.tmdb.org/t/p/w342${data.poster_path}`,
            overview: data.overview
        };
    } catch (error) {
        console.error(`Erro ao buscar filme ${movieId}:`, error);
        return null;
    }
}

async function generateScoobyData() {
    const moviesData = {};
    
    for (const movieId of movieIds) {
        const movieData = await fetchMovieData(movieId);
        if (movieData) {
            moviesData[movieId] = {
                short_id: `filme_${movieId}`,
                title: movieData.title,
                release_year: movieData.release_year,
                year: movieData.release_year.toString(),
                poster_path: movieData.poster_path,
                dailymotion_videos: { "1_1": "ADICIONAR_ID_DAILYMOTION" }
            };
        }
        
        // Delay para não sobrecarregar a API
        await new Promise(resolve => setTimeout(resolve, 250));
    }
    
    console.log('const scoobyMovies = ', JSON.stringify(moviesData, null, 4));
}

generateScoobyData();