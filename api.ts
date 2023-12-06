const API_KEY = 'f8d2e8ac76a2e902ea6930dadf78bfd8';
const BASE_URL = `https://api.themoviedb.org/3`;

export interface Moive {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

interface BaseResponse {
    page: number;
    total_results: number;
    total_pages: number;
}

export interface MovieResponse extends BaseResponse {
    results: Moive[];
}

export const moviesApi = {
    trending: () =>
        fetch(`${BASE_URL}/trending/movie/week?language=ko-KR&api_key=${API_KEY}`).then((res) =>
            res.json()
        ),
    upcoming: () =>
        fetch(`${BASE_URL}/movie/upcoming?language=ko-KR&page=1&api_key=${API_KEY}`).then((res) =>
            res.json()
        ),
    nowPlaying: () =>
        fetch(`${BASE_URL}/movie/now_playing?language=ko-KR&page=1&api_key=${API_KEY}`).then(
            (res) => res.json()
        ),
    search: ({ queryKey }) => {
        const [_, query] = queryKey;
        return fetch(
            `${BASE_URL}/search/movie?language=ko-KR&page=1&api_key=${API_KEY}&query=${query}`
        ).then((res) => res.json());
    },
};

export const tvApi = {
    trending: () =>
        fetch(`${BASE_URL}/trending/tv/week?language=ko-KR&api_key=${API_KEY}`).then((res) =>
            res.json()
        ),
    airingToday: () =>
        fetch(`${BASE_URL}/tv/airing_today?language=ko-KR&api_key=${API_KEY}`).then((res) =>
            res.json()
        ),
    topRated: () =>
        fetch(`${BASE_URL}/tv/top_rated?language=ko-KR&api_key=${API_KEY}`).then((res) =>
            res.json()
        ),
    search: ({ queryKey }) => {
        const [_, query] = queryKey;
        return fetch(
            `${BASE_URL}/search/tv?language=ko-KR&page=1&api_key=${API_KEY}&query=${query}`
        ).then((res) => res.json());
    },
};
