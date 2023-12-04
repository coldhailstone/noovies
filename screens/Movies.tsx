import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';
import Poster from '../components/Poster';
import Slide from '../components/Slide';

const Container = styled.ScrollView``;
const Loader = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const ListTitle = styled.Text`
    color: white;
    font-size: 18px;
    font-weight: 600;
    margin-left: 30px;
`;
const TrendingScroll = styled.ScrollView`
    margin-top: 20px;
`;
const Movie = styled.View`
    margin-right: 20px;
    align-items: center;
`;
const Title = styled.Text`
    color: white;
    font-weight: 600;
    margin-top: 7px;
    margin-bottom: 5px;
`;
const Votes = styled.Text`
    color: rgba(255, 255, 255, 0.8);
    font-size: 10px;
`;
const ListContainer = styled.View`
    margin-top: 40px;
`;
const HMovie = styled.View`
    padding: 0px 30px;
    margin-bottom: 30px;
    flex-direction: row;
`;
const HColumn = styled.View`
    margin-left: 15px;
    width: 80%;
`;
const OverView = styled.Text`
    color: white;
    opacity: 0.8;
    width: 80%;
`;
const Release = styled.Text`
    color: white;
    font-size: 12px;
    margin-vertical: 10px;
`;
const ComingSoonTitle = styled(ListTitle)`
    margin-bottom: 30px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const API_KEY = 'f8d2e8ac76a2e902ea6930dadf78bfd8';

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({ navigation: { navigate } }) => {
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

    return loading ? (
        <Loader>
            <ActivityIndicator />
        </Loader>
    ) : (
        <Container>
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
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 30 }}
            >
                {trending.map((movie) => (
                    <Movie key={movie.id}>
                        <Poster path={movie.poster_path} />
                        <Title>
                            {movie.original_title.slice(0, 13)}
                            {movie.original_title.length > 13 ? '...' : null}
                        </Title>
                        <Votes>
                            {movie.vote_average > 0
                                ? `⭐️ ${movie.vote_average.toFixed(1)}/10`
                                : 'Coming soon'}
                        </Votes>
                    </Movie>
                ))}
            </TrendingScroll>
            <ListContainer>
                <ComingSoonTitle>Comming soon</ComingSoonTitle>
                {upcoming.map((movie) => (
                    <HMovie key={movie.id}>
                        <Poster path={movie.poster_path} />
                        <HColumn>
                            <Title>{movie.original_title}</Title>
                            <Release>
                                {new Date(movie.release_date).toLocaleDateString('ko')}
                            </Release>
                            <OverView>
                                {movie.overview !== '' && movie.overview.length > 100
                                    ? `${movie.overview.slice(0, 100)}...`
                                    : movie.overview}
                            </OverView>
                        </HColumn>
                    </HMovie>
                ))}
            </ListContainer>
        </Container>
    );
};

export default Movies;
