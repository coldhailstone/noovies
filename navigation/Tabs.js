import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Movies from '../screens/Movies';
import Search from '../screens/Search';
import Tv from '../screens/Tv';

const Tab = createBottomTabNavigator();

const Tabs = () => (
    <Tab.Navigator>
        <Tab.Screen name='Movies' component={Movies} />
        <Tab.Screen name='TV' component={Tv} />
        <Tab.Screen name='Search' component={Search} />
    </Tab.Navigator>
);

export default Tabs;
