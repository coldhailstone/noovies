import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect } from 'react';
import { Dimensions, Platform, Share, StyleSheet, TouchableOpacity } from 'react-native';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';
import { Movie, TV, moviesApi, tvApi } from '../api';
import { BLACK_COLOR } from '../colors';
import Loader from '../components/Loader';
import Poster from '../components/Poster';
import { makeImgPath } from '../utils';

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

const Data = styled.View`
    padding: 0px 20px;
`;

const Overview = styled.Text`
    color: ${(props) => props.theme.textColor};
    margin: 20px 0;
`;

const VideoBtn = styled.TouchableOpacity`
    flex-direction: row;
`;

const BtnText = styled.Text`
    color: white;
    font-weight: 600;
    margin-bottom: 10px;
    line-height: 24px;
    margin-left: 10px;
`;

type RootStackParamList = {
    Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const Detail: React.FC<DetailScreenProps> = ({ navigation: { setOptions }, route: { params } }) => {
    const isMovie = 'title' in params;
    const { isLoading, data } = useQuery(
        [isMovie ? 'movies' : 'tv', params.id],
        isMovie ? moviesApi.detail : tvApi.detail
    );
    const shareMedia = async () => {
        const isAndroid = Platform.OS === 'android';
        const hompage = isMovie ? `https://www.imdb.com/title/${data.imdb_id}` : data.homepage;
        if (isAndroid) {
            await Share.share({
                message: `${params.overview}\nCheck it out: ${hompage}`,
                title: 'title' in params ? params.title : params.name,
            });
        } else {
            await Share.share({
                url: hompage,
                title: 'title' in params ? params.title : params.name,
            });
        }
    };
    const ShareButton = () => (
        <TouchableOpacity onPress={shareMedia}>
            <Ionicons name='share-outline' color='white' size={24} />
        </TouchableOpacity>
    );
    useEffect(() => {
        setOptions({
            title: 'title' in params ? 'Movie' : 'TV Show',
        });
    }, []);
    useEffect(() => {
        if (data) {
            setOptions({
                headerRight: () => <ShareButton />,
            });
        }
    }, [data]);

    const openYTLink = async (videoID: string) => {
        const baseUrl = `http://m.youtube.com/watch?v=${videoID}`;
        // await Linking.openURL(baseUrl);
        await WebBrowser.openBrowserAsync(baseUrl);
    };

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
            <Data>
                <Overview>{params.overview}</Overview>
                {isLoading ? <Loader /> : null}
                {data?.videos?.results?.map((video) => (
                    <VideoBtn key={video.key} onPress={() => openYTLink(video.key)}>
                        <Ionicons name='logo-youtube' color='white' size={24} />
                        <BtnText>{video.name}</BtnText>
                    </VideoBtn>
                ))}
            </Data>
        </Container>
    );
};

export default Detail;
