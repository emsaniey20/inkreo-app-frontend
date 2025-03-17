import { useEffect, useState } from 'react';
import { Slot } from 'expo-router';
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

        // Onboarding Flow
        if (!hasSeenOnboarding) {
          setShowOnboarding(true);
        } else if (isLoggedIn !== 'true') {
          // If not logged in, show login screen
          setShowLogin(true);
        } else {
          // User is authenticated
          setIsAuthenticated(true);
        }
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

  // While loading the app (splash screen), return null
  if (isLoading || !isMounted) return null;

  // Onboarding Screen
  if (showOnboarding) {
    return (
      <OnboardingScreen
        onFinish={async () => {
          await AsyncStorage.setItem('hasSeenOnboarding', 'true');
          setShowOnboarding(false);
          setShowLogin(true); // Move to login after onboarding
        }}
      />
    );
  }

  // Login Screen
  if (showLogin) {
    return (
      <LoginScreen
        onLoginSuccess={async () => {
          await AsyncStorage.setItem('isLoggedIn', 'true');
          setShowLogin(false);
          setIsAuthenticated(true); // Show the app after login
        }}
        onRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />
    );
  }

  // Register Screen
  if (showRegister) {
    return (
      <RegisterScreen
        onRegisterSuccess={async () => {
          setShowRegister(false);
          setShowLogin(true); // Move to login after registering
        }}
        onLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />
    );
  }

  // If authenticated, show the drawer navigation and main app
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
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: 'Home',
          }}
        />

        {/* Hide this screen in the drawer */}
      <Drawer.Screen
        name="auth/sign_in_screen"
        // component={LoginScreen}
        options={{
          drawerItemStyle: { display: 'none' },
        }}
      />
      
      {/* Hide this screen in the drawer */}
      <Drawer.Screen
        name="auth/register_screen"
        options={{
          drawerItemStyle: { display: 'none' },
        }}
      />

      {/* Hide Onboarding screen as well */}
      <Drawer.Screen
        name="onboarding/onboarding_screen"
        options={{
          drawerItemStyle: { display: 'none' }, 
        }}
      />
      </Drawer> 
    );
  }

  return null; // Fallback in case something unexpected happens
}
