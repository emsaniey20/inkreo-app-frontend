import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { BlogPostIcon, ProposalIcon, ResumeIcon, ScriptIcon, SearchIcon } from '@utils/iconTabs';
import Research from "./../assets/images/research";

// Categories Data
const categories = [
  { name: 'Blog Post', icon: 'file-pen', iconName: 'BlogPostIcon', bgColor: '#6A5ACD' },
  { name: 'Research', icon: 'search', iconName: 'Research', bgColor: '#FF6347' },
  { name: 'Proposal', icon: 'file-text', iconName: 'ProposalIcon', bgColor: '#20B2AA' },
  { name: 'Script', icon: 'movie-open', iconName: 'ScriptIcon', bgColor: '#FF4500' },
  { name: 'Resume', icon: 'description', iconName: 'ResumeIcon', bgColor: '#4682B4' },
];

// Function to return the right icon component
const getIconComponent = (iconName, icon, size, color) => {
  switch (iconName) {
    case 'BlogPostIcon':
      return <BlogPostIcon name={icon} size={size} color={color} />;
    case 'Research':
      return <Research name={icon} size={size} color={color} />;
    case 'ProposalIcon':
      return <ProposalIcon name={icon} size={size} color={color} />;
    case 'ScriptIcon':
      return <ScriptIcon name={icon} size={size} color={color} />;
    case 'ResumeIcon':
      return <ResumeIcon name={icon} size={size} color={color} />;
    default:
      return null; // Handle if no matching icon is found
  }
};

const CategoryButtons = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {categories.map((category, index) => (
        <View key={index}>
          <TouchableOpacity style={[styles.categoryButton, { backgroundColor: category.bgColor }]}>
            {/* Dynamically render the correct icon */}
            {getIconComponent(category.iconName, category.icon, 24, 'white')}
          </TouchableOpacity>
          <Text style={styles.categoryText}>{category.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    flex: 1,
  },
  categoryButton: {
    width: 60,
    height: 60,
    borderRadius: 35, // Circular shape
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },
  categoryText: {
    marginTop: 8,
    fontSize: 14,
    color: '#555555',
    textAlign: 'center',
  },
});

export default CategoryButtons;
