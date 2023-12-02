import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';
import { ActivityIndicator, Dimensions, StyleSheet, useColorScheme } from 'react-native';
import { makeImgPath } from '../utils';
import { BlurView } from 'expo-blur';

const Container = styled.ScrollView``;

const View = styled.View`
    flex: 1;
`;

const Loader = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const BgImg = styled.Image``;

const Poster = styled.Image`
    width: 100px;
    height: 160px;
    border-radius: 5px;
`;

const Title = styled.Text`
    font-size: 16px;
    font-weight: 600;
    color: white;
`;
const Wrapper = styled.View`
    flex-direction: row;
    height: 100%;
    justify-content: center;
    align-items: center;
`;
const Column = styled.View`
    width: 40%;
    margin-left: 15px;
`;
const OverView = styled.Text`
    margin-top: 10px;
    color: rgba(255, 255, 255, 0.8);
`;
const Votes = styled(OverView)`
    margin-top: 5px;
    font-size: 12px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({ navigation: { navigate } }) => {
    const isDark = useColorScheme() === 'dark';
    const [loading, setLoading] = useState(true);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const getNowPlaying = async () => {
        const { results } = await (
            await fetch(
                'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=f8d2e8ac76a2e902ea6930dadf78bfd8'
            )
        ).json();
        setNowPlayingMovies(results);
        setLoading(false);
    };
    useEffect(() => {
        getNowPlaying();
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
                containerStyle={{ width: '100%', height: SCREEN_HEIGHT / 4 }}
            >
                {nowPlayingMovies.map((movie) => (
                    <View key={movie.id}>
                        <BgImg
                            style={StyleSheet.absoluteFill}
                            source={{ uri: makeImgPath(movie.backdrop_path) }}
                        />
                        <BlurView
                            tint={isDark ? 'dark' : 'light'}
                            intensity={30}
                            style={StyleSheet.absoluteFill}
                        >
                            <Wrapper>
                                <Poster source={{ uri: makeImgPath(movie.poster_path) }}></Poster>
                                <Column>
                                    <Title>{movie.original_title}</Title>
                                    {movie.vote_average > 0 ? (
                                        <Votes>{movie.vote_average.toFixed(1)}/10</Votes>
                                    ) : null}
                                    <OverView>{movie.overview.slice(0, 90)}...</OverView>
                                </Column>
                            </Wrapper>
                        </BlurView>
                    </View>
                ))}
            </Swiper>
        </Container>
    );
};

export default Movies;
