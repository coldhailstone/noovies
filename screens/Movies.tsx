import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import styled from 'styled-components/native';
import Swiper from 'react-native-web-swiper';
import { Dimensions } from 'react-native';

const Container = styled.ScrollView`
    background-color: ${(props) => props.theme.mainBgColor};
`;

const View = styled.View`
    flex: 1;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({ navigation: { navigate } }) => {
    const getNowPlaying = () => {
        fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer f8d2e8ac76a2e902ea6930dadf78bfd8',
            },
        });
    };

    return (
        <Container>
            <Swiper
                loop
                timeout={3.5}
                controlsEnabled={false}
                containerStyle={{ width: '100%', height: SCREEN_HEIGHT / 4 }}
            >
                <View style={{ backgroundColor: 'red' }}></View>
                <View style={{ backgroundColor: 'blue' }}></View>
                <View style={{ backgroundColor: 'red' }}></View>
                <View style={{ backgroundColor: 'blue' }}></View>
            </Swiper>
        </Container>
    );
};

export default Movies;
