import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, RefreshControl } from 'react-native';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';
import HMedia from '../components/HMedia';
import Slide from '../components/Slide';
import VMedia from '../components/VMedia';

const Container = styled.ScrollView``;

const Loader = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const TrendingScroll = styled.ScrollView`
    margin-top: 20px;
`;

const ListTitle = styled.Text`
    color: white;
    font-size: 18px;
    font-weight: 600;
    margin-left: 30px;
`;

const ComingSoonTitle = styled(ListTitle)`
    margin-vertical: 20px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const API_KEY = 'f8d2e8ac76a2e902ea6930dadf78bfd8';

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({ navigation: { navigate } }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [trending, setTrending] = useState([]);

    const getTrending = async () => {
        const { results } = await (
            await fetch(
                `https://api.themoviedb.org/3/trending/movie/week?language=ko-KR&api_key=${API_KEY}`
            )
        ).json();
        setTrending(results);
    };
    const getUpcoming = async () => {
        const { results } = await (
            await fetch(
                `https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&page=1&api_key=${API_KEY}`
            )
        ).json();
        setUpcoming(results);
    };
    const getNowPlaying = async () => {
        const { results } = await (
            await fetch(
                `https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1&api_key=${API_KEY}`
            )
        ).json();
        setNowPlayingMovies(results);
    };
    const getData = async () => {
        await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);
        setLoading(false);
    };
    useEffect(() => {
        getData();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await getData();
        setRefreshing(false);
    };

    return loading ? (
        <Loader>
            <ActivityIndicator />
        </Loader>
    ) : (
        <Container
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <Swiper
                horizontal
                loop
                autoplay
                autoplayTimeout={3.5}
                showsButtons={false}
                showsPagination={false}
                containerStyle={{ marginBottom: 30, width: '100%', height: SCREEN_HEIGHT / 4 }}
            >
                {nowPlayingMovies.map((movie) => (
                    <Slide
                        key={movie.id}
                        backdropPath={movie.backdrop_path}
                        posterPath={movie.poster_path}
                        originalTitle={movie.original_title}
                        voteAverage={movie.vote_average}
                        overview={movie.overview}
                    />
                ))}
            </Swiper>
            <ListTitle>Trending Movies</ListTitle>
            <TrendingScroll
                horizontal
                showsHorizontalScrollI1ndicator={false}
                contentContainerStyle={{ paddingLeft: 30 }}
            >
                {trending.map((movie) => (
                    <VMedia
                        key={movie.id}
                        posterPath={movie.poster_path}
                        originalTitle={movie.original_title}
                        voteAverage={movie.vote_average}
                    />
                ))}
            </TrendingScroll>
            <ComingSoonTitle>Comming soon</ComingSoonTitle>
            {upcoming.map((movie) => (
                <HMedia
                    key={movie.id}
                    posterPath={movie.poster_path}
                    originalTitle={movie.original_title}
                    overview={movie.overview}
                    releaseDate={movie.release_date}
                />
            ))}
        </Container>
    );
};

export default Movies;
