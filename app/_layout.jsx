import { useEffect, useState } from 'react';
import { Stack, useRouter, Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  useEffect(() => {
    async function initializeApp() {
      try {
        // Check if user has seen onboarding
        const seenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
        if (!seenOnboarding) {
          setHasSeenOnboarding(false);
          router.replace('/onboarding/onboarding_screen'); // Navigate to onboarding
        } else {
          setHasSeenOnboarding(true);
          router.replace('/auth/sign_in_screen'); // Navigate to login
        }
      } catch (e) {
        console.error('Error checking app state', e);
      } finally {
        await SplashScreen.hideAsync();
        setIsLoading(false);
      }
    }

    initializeApp();
  }, []);

  if (isLoading) return null;

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="onboarding/onboarding_screen" options={{ title: "Onboarding", headerShown: false }} />
      <Stack.Screen name="auth/sign_in_screen" options={{ title: "Sign In", headerShown: false }} />
      <Stack.Screen name="auth/register_screen" options={{ title: "Register", headerShown: false }} />
    </Stack>
  );
}
