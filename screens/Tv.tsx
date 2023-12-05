import React from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { useQuery } from 'react-query';
import { tvApi } from '../api';
import Loader from '../components/Loader';
import VMedia from '../components/VMedia';

const Tv = () => {
    const { isLoading: todayLoading, data: todayData } = useQuery(
        ['tv', 'today'],
        tvApi.airingToday
    );
    const { isLoading: topLoading, data: topData } = useQuery(['tv', 'top'], tvApi.topRated);
    const { isLoading: trendingLoading, data: trendingData } = useQuery(
        ['tv', 'trending'],
        tvApi.trending
    );
    const loading = todayLoading || topLoading || trendingLoading;

    return loading ? (
        <Loader />
    ) : (
        <ScrollView>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={trendingData.results}
                renderItem={({ item }) => (
                    <VMedia
                        posterPath={item.poster_path}
                        originalTitle={item.original_name}
                        voteAverage={item.vote_average}
                    />
                )}
            />
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={todayData.results}
                renderItem={({ item }) => (
                    <VMedia
                        posterPath={item.poster_path}
                        originalTitle={item.original_name}
                        voteAverage={item.vote_average}
                    />
                )}
            />
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={topData.results}
                renderItem={({ item }) => (
                    <VMedia
                        posterPath={item.poster_path}
                        originalTitle={item.original_name}
                        voteAverage={item.vote_average}
                    />
                )}
            />
        </ScrollView>
    );
};

export default Tv;
