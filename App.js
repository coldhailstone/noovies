import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { useAssets } from 'expo-asset';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { useColorScheme } from 'react-native';
import Root from './navigation/Root';
import { ThemeProvider } from 'styled-components/native';
import { darkTheme, lightTheme } from './styled';

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [assets] = useAssets([]);
    const [fonts] = useFonts(Ionicons.font);

    const onLayoutRootView = useCallback(async () => {
        if (assets && fonts) {
            await SplashScreen.hideAsync();
        }
    }, [assets, fonts]);

    const isDark = useColorScheme() === 'dark';
    if (!assets || !fonts) {
        return null;
    }

    return (
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
            <NavigationContainer onReady={onLayoutRootView}>
                <Root />
            </NavigationContainer>
        </ThemeProvider>
    );
}
