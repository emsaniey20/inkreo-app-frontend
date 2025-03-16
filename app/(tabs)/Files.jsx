import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SimpleLineIcons, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { FileList, FilesGrid } from '@Components';


const Files = () => {
  const [viewMode, setViewMode] = useState('grid');  // State to toggle between grid and list

  // Toggle between grid and list views
  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === 'grid' ? 'list' : 'grid'));
  };

   return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TextInput
          placeholder="Search files"
          placeholderTextColor="#B0B0B0"
          style={styles.searchInput}
        />
        <MaterialIcons name="filter-list" size={26} color="black" />
      </View>

      {/* Header with View Mode Toggle Icon */}
      <View style={styles.recentContainer}>
        <Text style={styles.recentContainerText}>Files</Text>

        {/* Toggle Icon for Grid and List Views */}
        <TouchableOpacity onPress={toggleViewMode}>
          {viewMode === 'grid' ? (
            <FontAwesome6 name="list" size={24} color="black" style={styles.icon} />
          ) : (
            <SimpleLineIcons name="grid" size={24} color="black" style={styles.icon} />
          )}
        </TouchableOpacity>
      </View>

      {/* Conditionally Render Grid or List */}
      <View style={{ marginBottom: "68%" }}>
        {viewMode === 'grid' ? <FilesGrid /> : <FileList />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 2,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#F1F1F1',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  recentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recentContainerText: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 20,
    marginBottom: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default Files;