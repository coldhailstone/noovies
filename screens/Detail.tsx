import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';
import styled from 'styled-components/native';
import { Movie, TV, moviesApi, tvApi } from '../api';
import Poster from '../components/Poster';
import { makeImgPath } from '../utils';
import { LinearGradient } from 'expo-linear-gradient';
import { BLACK_COLOR } from '../colors';
import { useQuery } from 'react-query';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Container = styled.ScrollView`
    background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
    height: ${SCREEN_HEIGHT / 4}px;
    justify-content: flex-end;
    padding: 0px 20px;
`;

const Background = styled.Image``;

const Column = styled.View`
    flex-direction: row;
`;

const Title = styled.Text`
    color: white;
    font-size: 36px;
    align-self: flex-end;
    width: 80%;
    margin-left: 15px;
    font-weight: 500;
`;

const Overview = styled.Text`
    color: ${(props) => props.theme.textColor};
    margin-top: 20px;
    padding: 0px 20px;
`;

type RootStackParamList = {
    Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const Detail: React.FC<DetailScreenProps> = ({ navigation: { setOptions }, route: { params } }) => {
    const { isLoading: movieLoading, data: movieData } = useQuery(
        ['movies', params.id],
        moviesApi.detail,
        {
            enabled: 'title' in params,
        }
    );
    const { isLoading: tvLoading, data: tvData } = useQuery(['tv', params.id], tvApi.detail, {
        enabled: 'name' in params,
    });
    useEffect(() => {
        setOptions({
            title: 'title' in params ? 'Movie' : 'TV Show',
        });
    }, []);

    return (
        <Container>
            <Header>
                <Background
                    style={StyleSheet.absoluteFill}
                    source={{ uri: makeImgPath(params.backdrop_path || '') }}
                />
                <LinearGradient
                    colors={['transparent', BLACK_COLOR]}
                    style={StyleSheet.absoluteFill}
                />
                <Column>
                    <Poster path={params.poster_path || ''} />
                    <Title>{'title' in params ? params.title : params.name}</Title>
                </Column>
            </Header>
            <Overview>{params.overview}</Overview>
        </Container>
    );
};

export default Detail;
