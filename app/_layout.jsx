import { useEffect, useState } from 'react';
import { Stack, useRouter, Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from './onboarding/onboarding_screen';
import LoginScreen from './auth/sign_in_screen';
import RegisterScreen from './auth/register_screen';
import { CustomDrawerContent } from '@Components';
import { Foundation, Octicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    async function initializeApp() {
      try {
        const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');

        // Force onboarding every time for development
        setShowOnboarding(true);

        if (!hasSeenOnboarding) {
          setShowOnboarding(true);
        } else if (isLoggedIn !== 'true') {
          setShowLogin(true);
        } else {
          setIsAuthenticated(true);
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
        onLoginSuccess={async () => {
          await AsyncStorage.setItem('isLoggedIn', 'true');
          setShowLogin(false);
          setIsAuthenticated(true);
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
        onRegisterSuccess={async () => {
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

  if (isAuthenticated) {
    return (
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={({ route }) => ({
          drawerType: 'front',
          headerShown: false,
          drawerActiveTintColor: '#E94560',
          drawerInactiveTintColor: '#333',
          drawerActiveBackgroundColor: '#fff',
          drawerLabelStyle: { fontSize: 16 },
          drawerIcon: ({ focused }) => {
            if (route.name === '(tabs)') {
              return focused ? (
                <Foundation name="home" size={28} color="#E94560" />
              ) : (
                <Octicons name="home" size={23} color="#333" />
              );
            }
          },
        })}
      >
        <Drawer.Screen name="(tabs)" options={{ drawerLabel: 'Home' }} />
        <Drawer.Screen name="auth/sign_in_screen" options={{ drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name="auth/register_screen" options={{ drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name="onboarding/onboarding_screen" options={{ drawerItemStyle: { display: 'none' } }} />
      </Drawer>
    );
  }

  return null;
}
