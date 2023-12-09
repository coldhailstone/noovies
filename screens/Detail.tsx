import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { Movie, TV } from '../api';
import Poster from '../components/Poster';

const Container = styled.ScrollView`
    background-color: ${(props) => props.theme.mainBgColor};
`;

type RootStackParamList = {
    Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const Detail: React.FC<DetailScreenProps> = ({ navigation: { setOptions }, route: { params } }) => {
    useEffect(() => {
        setOptions({
            title: 'title' in params ? params.title : params.name,
        });
    }, []);

    return (
        <Container>
            <Poster path={params.poster_path || ''} />
        </Container>
    );
};

export default Detail;
