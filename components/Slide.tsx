import { BlurView } from 'expo-blur';
import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import styled from 'styled-components/native';
import { makeImgPath } from '../utils';
import Poster from './Poster';

const View = styled.View`
    flex: 1;
`;
const BgImg = styled.Image``;
const Title = styled.Text<{ isDark: boolean }>`
    font-size: 16px;
    font-weight: 600;
    color: ${(props) => (props.isDark ? 'white' : props.theme.textColor)};
`;
const Wrapper = styled.View`
    flex-direction: row;
    height: 100%;
    justify-content: center;
    align-items: center;
`;
const Column = styled.View`
    width: 40%;
    margin-left: 15px;
`;
const OverView = styled.Text<{ isDark: boolean }>`
    margin-top: 10px;
    color: ${(props) => (props.isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)')};
`;
const Votes = styled(OverView)`
    margin-top: 5px;
    font-size: 12px;
`;

interface SlideProps {
    backdropPath: string;
    posterPath: string;
    originalTitle: string;
    voteAverage: number;
    overview: string;
}

const Slide: React.FC<SlideProps> = (
    backdropPath,
    posterPath,
    originalTitle,
    voteAverage,
    overview
) => {
    const isDark = useColorScheme() === 'dark';

    <View>
        <BgImg style={StyleSheet.absoluteFill} source={{ uri: makeImgPath(backdropPath) }} />
        <BlurView tint={isDark ? 'dark' : 'light'} intensity={30} style={StyleSheet.absoluteFill}>
            <Wrapper>
                <Column>
                    <Poster path={posterPath} />
                    <Title isDark={isDark}>{originalTitle}</Title>
                    {voteAverage > 0 ? (
                        <Votes isDark={isDark}>{voteAverage.toFixed(1)}/10</Votes>
                    ) : null}
                    <OverView isDark={isDark}>{overview.slice(0, 90)}...</OverView>
                </Column>
            </Wrapper>
        </BlurView>
    </View>;
};

export default Slide;
