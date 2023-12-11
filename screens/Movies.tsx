import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Dimensions, FlatList } from 'react-native';
import Swiper from 'react-native-swiper';
import { GetNextPageParamFunction, useInfiniteQuery, useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components/native';
import { MovieResponse, moviesApi } from '../api';
import HList from '../components/HList';
import HMedia from '../components/HMedia';
import Loader from '../components/Loader';
import Slide from '../components/Slide';

const ListTitle = styled.Text`
    color: white;
    font-size: 18px;
    font-weight: 600;
    margin-left: 30px;
`;

const ComingSoonTitle = styled(ListTitle)`
    margin-bottom: 20px;
`;

const HSeparator = styled.View`
    height: 20px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({ navigation: { navigate } }) => {
    const queryClient = useQueryClient();
    const [refreshing, setRefreshing] = useState(false);
    const getNextPageParam: GetNextPageParamFunction<MovieResponse> = (currentPage) => {
        const nextPage = currentPage.page + 1;
        return nextPage > currentPage.total_pages ? null : nextPage;
    };
    const { isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery<MovieResponse>(
        ['movies', 'nowPlaying'],
        moviesApi.nowPlaying
    );
    const {
        isLoading: upcomingLoading,
        data: upcomingData,
        hasNextPage: upcomingHasNextPage,
        fetchNextPage: upcomingFetchNextPage,
    } = useInfiniteQuery<MovieResponse>(['movies', 'upcoming'], moviesApi.upcoming, {
        getNextPageParam,
    });
    const {
        isLoading: trendingLoading,
        data: trendingData,
        hasNextPage: trendingHasNextPage,
        fetchNextPage: trendingFetchNextPage,
    } = useInfiniteQuery<MovieResponse>(['movies', 'trending'], moviesApi.trending, {
        getNextPageParam,
    });

    const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
    const onRefresh = async () => {
        setRefreshing(true);
        queryClient.refetchQueries(['movies']);
        setRefreshing(false);
    };

    return loading ? (
        <Loader />
    ) : upcomingData ? (
        <FlatList
            onEndReached={() => {
                if (upcomingHasNextPage) {
                    upcomingFetchNextPage();
                }
            }}
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
                        {nowPlayingData?.results.map((movie) => (
                            <Slide
                                key={movie.id}
                                backdropPath={movie.backdrop_path || ''}
                                posterPath={movie.poster_path || ''}
                                originalTitle={movie.title}
                                voteAverage={movie.vote_average}
                                overview={movie.overview}
                                fullData={movie}
                            />
                        ))}
                    </Swiper>
                    {trendingData ? (
                        <HList
                            onEndReached={() => {
                                if (trendingHasNextPage) {
                                    trendingFetchNextPage();
                                }
                            }}
                            title='Trending Movies'
                            data={trendingData.pages.map((page) => page.results).flat()}
                        />
                    ) : null}
                    <ComingSoonTitle>Comming soon</ComingSoonTitle>
                </>
            }
            ItemSeparatorComponent={HSeparator}
            data={upcomingData.pages.map((page) => page.results).flat()}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <HMedia
                    posterPath={item.poster_path || ''}
                    originalTitle={item.title}
                    overview={item.overview}
                    releaseDate={item.release_date}
                    fullData={item}
                />
            )}
        />
    ) : null;
};

export default Movies;
