import React, { useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { GetNextPageParamFunction, useInfiniteQuery, useQueryClient } from 'react-query';
import { TVResponse, tvApi } from '../api';
import HList from '../components/HList';
import Loader from '../components/Loader';

const Tv = () => {
    const queryClient = useQueryClient();
    const [refreshing, setRefreshing] = useState(false);
    const getNextPageParam: GetNextPageParamFunction<TVResponse> = (currentPage) => {
        const nextPage = currentPage.page + 1;
        return nextPage > currentPage.total_pages ? null : nextPage;
    };
    const {
        isLoading: todayLoading,
        data: todayData,
        hasNextPage: todayHasNextPage,
        fetchNextPage: todayFetchNextPage,
    } = useInfiniteQuery<TVResponse>(['tv', 'today'], tvApi.airingToday, {
        getNextPageParam,
    });
    const {
        isLoading: topLoading,
        data: topData,
        hasNextPage: topHasNextPage,
        fetchNextPage: topFetchNextPage,
    } = useInfiniteQuery<TVResponse>(['tv', 'top'], tvApi.topRated, {
        getNextPageParam,
    });
    const {
        isLoading: trendingLoading,
        data: trendingData,
        hasNextPage: trendingHasNextPage,
        fetchNextPage: trendingFetchNextPage,
    } = useInfiniteQuery<TVResponse>(['tv', 'trending'], tvApi.trending, {
        getNextPageParam,
    });

    const loading = todayLoading || topLoading || trendingLoading;
    const onRefresh = async () => {
        setRefreshing(true);
        queryClient.refetchQueries(['tv']);
        setRefreshing(false);
    };

    return loading ? (
        <Loader />
    ) : (
        <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            contentContainerStyle={{ paddingVertical: 30 }}
        >
            <HList
                title='Trending TV'
                data={trendingData.pages.map((page) => page.results).flat()}
                onEndReached={() => {
                    if (trendingHasNextPage) {
                        trendingFetchNextPage();
                    }
                }}
            />
            <HList
                title='Airing Today'
                data={todayData.pages.map((page) => page.results).flat()}
                onEndReached={() => {
                    if (todayHasNextPage) {
                        todayFetchNextPage();
                    }
                }}
            />
            <HList
                title='Top Rated TV'
                data={topData.pages.map((page) => page.results).flat()}
                onEndReached={() => {
                    if (topHasNextPage) {
                        topFetchNextPage();
                    }
                }}
            />
        </ScrollView>
    );
};

export default Tv;
