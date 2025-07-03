const API_KEY = 'fb7bb23f03b6994dafc674c074d01761';
const BASE_URL = 'https://api.themoviedb.org/3';



export const fetchLocalMovies = async () => {
    const response = await fetch('http://localhost:5000/api/movies');
    if (!response.ok) throw new Error('Failed to fetch local movies');
    return response.json();
  };


export const GetPopularMovies = async () => {
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch favorite movies') ;
    }
    const data = await response.json();
    return data.results;
}

export const fetchMovies = async (query) => {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch movies');
    }
    const data = await response.json();
    return data.results;
}


