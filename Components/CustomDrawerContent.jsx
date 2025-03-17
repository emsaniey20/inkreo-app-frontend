import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { useRouter } from "expo-router";

const recentDocs = [
  { id: '1', title: 'Winter Documentation', route: 'Files/Winter' },
  { id: '2', title: 'Incredible Letter', route: 'Files/Incredible' },
  { id: '3', title: 'Formal Intro', route: 'Files/Formal' },
  { id: '4', title: 'My CV', route: 'Files/CV' },
  { id: '5', title: 'Medical Documentation', route: 'Files/Medical' },
  { id: '6', title: 'New PDF', route: 'Files/PDF' },
  { id: '7', title: 'Letter to my sister', route: 'Files/Sister' },
  { id: '8', title: 'Homecoming', route: 'Files/Homecoming' },
];

export default function CustomDrawerContent(props) {
  const [expanded, setExpanded] = useState(true);
  const [activeDoc, setActiveDoc] = useState(null); 
  const navigation = useRouter();

  return (
    <DrawerContentScrollView showsHorizontalScrollIndicator {...props} style={{ flex: 1, padding: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Image
          source={require('../assets/images/user.png')}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            marginTop: 10,
          }}
        />
        {/* Use props.navigation to close the drawer */}
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <MaterialCommunityIcons name="close" size={28} color="#E94560" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: '#E94560',
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 8,
          marginTop: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: 'white', fontSize: 16, justifyContent: "center", alignItems: "center" }}>+ Create a Doc</Text>
      </TouchableOpacity>

      <DrawerItemList {...props} />
     
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 16, color: 'gray' }}>Recent Docs</Text>
        <MaterialCommunityIcons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="gray"
          style={{ marginLeft: 8 }}
        />
      </TouchableOpacity>

      {expanded && recentDocs.map((item) => {
        const isActive = activeDoc === item.id; 

        return (
          <DrawerItem
            key={item.id}
            label={item.title}
            onPress={() => {
              setActiveDoc(item.id); // Set the active document when clicked
              navigation.push(item.route); // Navigate to the document route
            }}
            icon={() => <MaterialCommunityIcons name="file-document" size={20} />}
            activeTintColor="#E94560"
            inactiveTintColor="#333"
            style={{
              backgroundColor: isActive ? '#FFE4ED' : 'transparent',
              borderColor: isActive ? '#E94560' : 'transparent',
              borderWidth: 0,
              borderLeftColor: isActive ? '#E94560' : 'transparent',
              borderRadius: 10,
              color: '#E94560',
            }}
          />
        );
      })}
    </DrawerContentScrollView>
  );
}
