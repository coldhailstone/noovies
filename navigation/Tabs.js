import { Ionicons } from '@expo/vector-icons';
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
                tabBarLabelStyle: {
                    marginTop: -5,
                    fontSize: 12,
                    fontWeight: 600,
                },
            }}
        >
            <Tab.Screen
                name='Movies'
                component={Movies}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name='film-outline' color={color} size={size} />;
                    },
                }}
            />
            <Tab.Screen
                name='TV'
                component={Tv}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name='tv-outline' color={color} size={size} />;
                    },
                }}
            />
            <Tab.Screen
                name='Search'
                component={Search}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        return <Ionicons name='search-outline' color={color} size={size} />;
                    },
                }}
            />
        </Tab.Navigator>
    );
};

export default Tabs;
