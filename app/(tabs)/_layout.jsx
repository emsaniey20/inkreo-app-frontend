import { Tabs, useRouter, } from "expo-router";
import { Foundation, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { FilesFilledIcon, FilesIcon, TemplatesFilledIcon, TemplatesIcon, ToolsFilledIcon, ToolsIcon } from '../../utils/iconTabs';
import { TouchableOpacity } from "react-native";

export default function TabLayout({ children }) {
  const router = useRouter();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#E94560',
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 12, color: '#E94560' },
        tabBarStyle: { backgroundColor: 'white', height: 68 },
        headerLeft: () =>
          <TouchableOpacity onPress={() => router.push("/")}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={35}
              color="black"
              style={{ paddingLeft: 10, paddingRight: "30%" }}
            />
          </TouchableOpacity>,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => focused ? (<Foundation name="home" size={28} color="#E94560" />)  : (<Octicons name="home" size={23} color="#E94560" />),
        }}
      />
      <Tabs.Screen
        name="Files"
        options={{
          title: "Files",
          tabBarIcon: ({ focused }) => focused ? <FilesFilledIcon /> : <FilesIcon />
        }}
      />
      <Tabs.Screen
        name="Templates"
        options={{
          title: 'Templates',
          tabBarIcon: ({ focused }) => focused ? <TemplatesFilledIcon /> : <TemplatesIcon />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Tools"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => focused ? <ToolsFilledIcon /> : <ToolsIcon />
        }}
      />
    </Tabs>
  )
}