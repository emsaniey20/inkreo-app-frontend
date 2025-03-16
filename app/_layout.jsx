import { useEffect, useState } from 'react';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from './onboarding/onboarding_screen';
import LoginScreen from './auth/sign_in_screen';
import RegisterScreen from './auth/register_screen';

SplashScreen.preventAutoHideAsync();
import { CustomDrawerContent } from '@Components';
import { Foundation, Octicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    async function initializeApp() {
      try {
        // Force onboarding every time for development
        setShowOnboarding(true);  
  
        // 🚀 Later, enable this to respect AsyncStorage
        // const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
        // if (!hasSeenOnboarding) {
        //   setShowOnboarding(true);
        // } else {
        //   setShowLogin(true);
        // }
  
      } catch (e) {
        console.error('Error checking app state', e);
      } finally {
        setIsMounted(true);
        await SplashScreen.hideAsync();
        setIsLoading(false);
      }
    }
  
    initializeApp();
  }, []);
  

  if (isLoading || !isMounted) return null;

  if (showOnboarding) {
    return (
      <OnboardingScreen
        onFinish={async () => {
          await AsyncStorage.setItem('hasSeenOnboarding', 'true');
          setShowOnboarding(false);
          setShowLogin(true);
        }}
      />
    );
  }

  if (showLogin) {
    return (
      <LoginScreen
        onLoginSuccess={() => {
          console.log("User logged in!");
        }}
        onRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />
    );
  }

  if (showRegister) {
    return (
      <RegisterScreen
        onRegisterSuccess={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
        onLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />
    );
  }

  return <Slot />; // Ensures a default view is rendered
}
