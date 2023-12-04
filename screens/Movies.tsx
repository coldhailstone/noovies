import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList } from 'react-native';
import Swiper from 'react-native-swiper';
import { useQuery } from 'react-query';
import styled from 'styled-components/native';
import { moviesApi } from '../api';
import HMedia from '../components/HMedia';
import Slide from '../components/Slide';
import VMedia from '../components/VMedia';

const Loader = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const TrendingScroll = styled.FlatList`
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

const VSeparator = styled.View`
    width: 20px;
`;
const HSeparator = styled.View`
    height: 20px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({ navigation: { navigate } }) => {
    const [refreshing, setRefreshing] = useState(false);
    const { isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery(
        'nowPlaying',
        moviesApi.nowPlaying
    );
    const { isLoading: upcomingLoading, data: upcomingData } = useQuery(
        'upcoming',
        moviesApi.upcoming
    );
    const { isLoading: trendingLoading, data: trendingData } = useQuery(
        'trending',
        moviesApi.trending
    );

    const onRefresh = async () => {};
    const renderVMedia = ({ item }) => (
        <VMedia
            posterPath={item.poster_path}
            originalTitle={item.original_title}
            voteAverage={item.vote_average}
        />
    );
    const renderHMedia = ({ item }) => (
        <HMedia
            posterPath={item.poster_path}
            originalTitle={item.original_title}
            overview={item.overview}
            releaseDate={item.release_date}
        />
    );
    const movieKeyExtractor = (item) => item.id.toString();
    const loading = nowPlayingLoading || upcomingLoading || trendingLoading;

    return loading ? (
        <Loader>
            <ActivityIndicator />
        </Loader>
    ) : (
        <FlatList
            refreshing={refreshing}
            onRefresh={onRefresh}
            ListHeaderComponent={
                <>
                    <Swiper
                        horizontal
                        loop
                        autoplay
                        autoplayTimeout={3.5}
                        showsButtons={false}
                        showsPagination={false}
                        containerStyle={{
                            marginBottom: 30,
                            width: '100%',
                            height: SCREEN_HEIGHT / 4,
                        }}
                    >
                        {nowPlayingData.results.map((movie) => (
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
                        contentContainerStyle={{ paddingHorizontal: 30 }}
                        ItemSeparatorComponent={VSeparator}
                        data={trendingData.results}
                        keyExtractor={movieKeyExtractor}
                        renderItem={renderVMedia}
                    />
                    <ComingSoonTitle>Comming soon</ComingSoonTitle>
                </>
            }
            ItemSeparatorComponent={HSeparator}
            data={upcomingData.results}
            keyExtractor={movieKeyExtractor}
            renderItem={renderHMedia}
        />
    );
};

export default Movies;
