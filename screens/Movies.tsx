import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import Swiper from 'react-native-web-swiper';
import { ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
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

const Title = styled.Text``;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({ navigation: { navigate } }) => {
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
                loop
                timeout={3.5}
                controlsEnabled={false}
                containerStyle={{ width: '100%', height: SCREEN_HEIGHT / 4 }}
            >
                {nowPlayingMovies.map((movie) => (
                    <View key={movie.id}>
                        <BgImg
                            style={StyleSheet.absoluteFill}
                            source={{ uri: makeImgPath(movie.backdrop_path) }}
                        />
                        <BlurView intensity={30} style={StyleSheet.absoluteFill}>
                            <Title>{movie.original_title}</Title>
                        </BlurView>
                    </View>
                ))}
            </Swiper>
        </Container>
    );
};

export default Movies;
