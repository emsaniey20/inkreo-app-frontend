import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Image, Keyboard } from 'react-native';
import Octicons from '@expo/vector-icons/Octicons';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

const SearchBar = () => {
  const navigation = useNavigation();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
      navigation.setOptions({
        tabBarStyle: { display: 'none' },
      });
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
      // Show the tab bar by resetting its height
      navigation.setOptions({
        tabBarStyle: { display: 'flex', height: 70 }, // Show the tab bar
      });
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [navigation]);

  return (
    <View style={styles.searchBarContainer}>
      <TouchableOpacity
      onPress={() => {
        // Open the drawer navigation
        navigation.dispatch(DrawerActions.openDrawer());
      }}
      style={{ paddingLeft: 10 }}
    >
      <Octicons name="three-bars" size={20} color="black" style={{ marginLeft: 15, marginRight: 10 }} />
      </TouchableOpacity>
      <TextInput
        placeholder="Search documents, templates ..."
        placeholderTextColor="#B0B0B0"
        style={styles.searchInput}
      />
      <Image source={require('../assets/images/user.png')} style={styles.userIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    height: 50,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'space-between',
    backgroundColor: '#F1F1F1',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 10,
    resizeMode: 'contain',
  },
});

export default SearchBar;
