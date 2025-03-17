import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native'
import { useRouter, } from "expo-router";
import React, { useState } from 'react';
import { AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { CategoryButtons, SearchBar, RecentDocuments, BlogPost, Proposal } from '@Components';
import { BlurView } from 'expo-blur';


const Home = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const router = useRouter();

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const menuStyles = {
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      },
    ],
    opacity: animation,
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <View style={{ paddingHorizontal: 10, }}>
          <SearchBar />
        </View>

        <View style={styles.bannerContainer}>
          <Image source={require('../../assets/images/homeTheme.png')}
            style={styles.bannerImage}
          />

        </View>

        <CategoryButtons />

        <View style={styles.recentContainer}>
          <Text style={styles.recentContainerText}>Recent</Text>
          <TouchableOpacity onPress={() => router.push("/Files")} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: "#808080DE" }} >View All</Text>
            <Entypo name="chevron-right" size={26} color="#808080DE" />
          </TouchableOpacity>
        </View>
        <RecentDocuments />

        <View style={styles.recentContainer}>
          <Text style={styles.recentContainerText}>Blog Post</Text>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: "#808080DE" }} >View All</Text>
            <Entypo name="chevron-right" size={26} color="#808080DE" />
          </TouchableOpacity>
        </View>
        <BlogPost />

        <View style={styles.recentContainer}>
          <Text style={styles.recentContainerText}>Proposal</Text>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: "#808080DE" }} >View All</Text>
            <Entypo name="chevron-right" size={26} color="#808080DE" />
          </TouchableOpacity>
        </View>
        <Proposal />

      </ScrollView>

      {/* Dark Blur Background When Menu is Visible */}
      {menuVisible && (
        <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
          <BlurView intensity={50} style={StyleSheet.absoluteFill} />
        </View>
      )}

      {menuVisible ? (
         <TouchableOpacity style={styles.createButton} onPress={toggleMenu}>
          <AntDesign name="close" size={28} color="#fff" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.createButton} onPress={toggleMenu}>
          <MaterialIcons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      )}


      {/* Animated Menu */}
      {menuVisible && (
        <Animated.View
          style={[
            {
              position: 'absolute',
              bottom: 80,
              right: 0,
              borderRadius: 10,
              padding: 15,
            },
            menuStyles,
          ]}
        >
          <TouchableOpacity style={{ padding: 10, justifyContent: "flex-end", alignItems: "center", flexDirection: "row", gap: 10 }}>
            <View style={{
              borderRadius: 15,
              backgroundColor: '#fff',
              height: 35,
              justifyContent: "center",
              alignItems: "center",
              width: 150,
            }}>
              <Text>Choose Template</Text>
            </View>
            <View style={{
              borderRadius: 10,
              backgroundColor: '#fff',
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              width: 40,
            }}>
              <Entypo name="text-document" size={28} color="#E94560" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 10, justifyContent: "flex-end", alignItems: "center", flexDirection: "row", gap: 10 }}>
            <View style={{
              borderRadius: 15,
              backgroundColor: '#fff',
              height: 35,
              justifyContent: "center",
              alignItems: "center",
              width: 120,
            }}>
              <Text>New Word file</Text>
            </View>
            <View style={{
              borderRadius: 10,
              backgroundColor: '#fff',
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              width: 40,
            }}>
              <MaterialCommunityIcons name="file-word-box" size={28} color="#E94560" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 10, justifyContent: "flex-end", alignItems: "center", flexDirection: "row", gap: 10 }}>
            <View style={{
              borderRadius: 15,
              backgroundColor: '#fff',
              height: 35,
              justifyContent: "center",
              alignItems: "center",
              width: 120,
            }}>
              <Text>New Docs file</Text>
            </View>
            <View style={{
              borderRadius: 10,
              backgroundColor: '#fff',
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              width: 40,
            }}>
              <MaterialCommunityIcons name="text-box" size={28} color="#E94560" />
            </View>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  bannerContainer: {
    height: 200,
    margin: 10,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  recentContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recentContainerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
  },

  createButton: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 40,
    right: 20,
    backgroundColor: '#E94560', // Pink background
    width: 55,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default Home;