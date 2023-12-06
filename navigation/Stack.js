import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Detail from '../screens/Detail';

const NativeStack = createNativeStackNavigator();

const Stack = () => (
    <NativeStack.Navigator
        screenOptions={{
            headerBackTitleVisible: false,
        }}
    >
        <NativeStack.Screen name='Detail' component={Detail} />
    </NativeStack.Navigator>
);

export default Stack;
