const API_KEY = 'f8d2e8ac76a2e902ea6930dadf78bfd8';
const BASE_URL = `https://api.themoviedb.org/3`;

export const trending = () =>
    fetch(`${BASE_URL}/trending/movie/week?language=ko-KR&api_key=${API_KEY}`).then((res) =>
        res.json()
    );

export const upcoming = () =>
    fetch(`${BASE_URL}/movie/upcoming?language=ko-KR&page=1&api_key=${API_KEY}`).then((res) =>
        res.json()
    );

export const nowPlaying = () =>
    fetch(`${BASE_URL}/movie/now_playing?language=ko-KR&page=1&api_key=${API_KEY}`).then((res) =>
        res.json()
    );
