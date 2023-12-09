import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Reactm, { useState } from 'react';
import { Dimensions, FlatList } from 'react-native';
import Swiper from 'react-native-swiper';
import { useQuery, useQueryClient } from 'react-query';
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
    const { isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery<MovieResponse>(
        ['movies', 'nowPlaying'],
        moviesApi.nowPlaying
    );
    const { isLoading: upcomingLoading, data: upcomingData } = useQuery<MovieResponse>(
        ['movies', 'upcoming'],
        moviesApi.upcoming
    );
    const { isLoading: trendingLoading, data: trendingData } = useQuery<MovieResponse>(
        ['movies', 'trending'],
        moviesApi.trending
    );

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
                            />
                        ))}
                    </Swiper>
                    {trendingData ? (
                        <HList title='Trending Movies' data={trendingData.results} />
                    ) : null}
                    <ComingSoonTitle>Comming soon</ComingSoonTitle>
                </>
            }
            ItemSeparatorComponent={HSeparator}
            data={upcomingData.results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <HMedia
                    posterPath={item.poster_path || ''}
                    originalTitle={item.title}
                    overview={item.overview}
                    releaseDate={item.release_date}
                />
            )}
        />
    ) : null;
};

export default Movies;
