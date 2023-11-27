import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useColorScheme } from 'react-native';
import { BLACK_COLOR, GRAY_100_COLOR, GRAY_200_COLOR, YELLOW_COLOR } from '../colors';
import Movies from '../screens/Movies';
import Search from '../screens/Search';
import Tv from '../screens/Tv';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    const isDark = useColorScheme() === 'dark';
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: isDark ? BLACK_COLOR : 'white',
                },
                tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
                tabBarInactiveTintColor: isDark ? GRAY_100_COLOR : GRAY_200_COLOR,
                headerStyle: {
                    backgroundColor: isDark ? BLACK_COLOR : 'white',
                },
                headerTitleStyle: {
                    color: isDark ? 'white' : BLACK_COLOR,
                },
            }}
        >
            <Tab.Screen name='Movies' component={Movies} />
            <Tab.Screen name='TV' component={Tv} />
            <Tab.Screen name='Search' component={Search} />
        </Tab.Navigator>
    );
};

export default Tabs;
