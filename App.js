import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { useAssets } from 'expo-asset';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import Root from './navigation/Root';

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [assets] = useAssets([]);
    const [fonts] = useFonts(Ionicons.font);

    const onLayoutRootView = useCallback(async () => {
        if (assets && fonts) {
            await SplashScreen.hideAsync();
        }
    }, [assets, fonts]);

    if (!assets || !fonts) {
        return null;
    }

    return (
        <NavigationContainer onReady={onLayoutRootView}>
            <Root />
        </NavigationContainer>
    );
}
