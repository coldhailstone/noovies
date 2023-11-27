import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Text, View } from 'react-native';
import Movies from '../screens/Movies';
import Search from '../screens/Search';
import Tv from '../screens/Tv';

const Tab = createBottomTabNavigator();

const Tabs = () => (
    <Tab.Navigator
        screenOptions={{
            tabBarStyle: {
                backgroundColor: 'tomato',
            },
            tabBarActiveTintColor: 'red',
            tabBarInactiveTintColor: 'purple',
            headerTitleStyle: { color: 'tomato' },
            headerRight: () => (
                <View>
                    <Text>Hello</Text>
                </View>
            ),
        }}
    >
        <Tab.Screen name='Movies' component={Movies} />
        <Tab.Screen name='TV' component={Tv} />
        <Tab.Screen name='Search' component={Search} />
    </Tab.Navigator>
);

export default Tabs;
