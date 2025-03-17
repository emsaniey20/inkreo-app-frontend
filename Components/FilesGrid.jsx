import React from 'react';
import { View, Image, Text, StyleSheet, FlatList } from 'react-native';

const fileData = [
  { id: '1', title: 'Atomic Habits', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3lVnqs2ncnTsJneBCwzbziwQsPBSqjrRLXA&s' },
  { id: '2', title: 'Atomic Habits', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8rnreOaMfAMyVo0jTbUzaVrZxjE-mm4rr_Q&s' },
  { id: '3', title: 'Atomic Habits', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVckxUQ6WxjP7KgbYp0MA26BCH0PKXU8WAow&s' },
  { id: '4', title: 'Atomic Habits', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVckxUQ6WxjP7KgbYp0MA26BCH0PKXU8WAow&s' },
  { id: '5', title: 'Atomic Habits', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVckxUQ6WxjP7KgbYp0MA26BCH0PKXU8WAow&s' },
  { id: '6', title: 'Atomic Habits', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVckxUQ6WxjP7KgbYp0MA26BCH0PKXU8WAow&s' },
  { id: '7', title: 'Atomic Habits', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVckxUQ6WxjP7KgbYp0MA26BCH0PKXU8WAow&s' },
  { id: '8', title: 'Atomic Habits', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVckxUQ6WxjP7KgbYp0MA26BCH0PKXU8WAow&s' },
  { id: '9', title: 'Atomic Habits', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVckxUQ6WxjP7KgbYp0MA26BCH0PKXU8WAow&s' },];

const FilesGrid = () => {
  const renderItem = ({ item }) => (
    <View style={{ width: '50%', padding: 5, alignItems: 'center', justifyContent: 'center' }}>
    <View style={styles.gridItem}>
      <Image source={{ uri: item.image }} style={styles.image} />
    </View>
    <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <FlatList
      data={fileData}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      numColumns={2}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image: {
    width: 120,
    height: 140,
    resizeMode: 'contain',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 5,
  },
  title: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
});

export default FilesGrid;
