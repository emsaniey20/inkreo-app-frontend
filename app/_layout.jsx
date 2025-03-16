import { CustomDrawerContent } from '@Components';
import { Foundation, Octicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';

export default function Layout() {
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
    </Drawer>
  );
}
