import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // For the three dots icon and other icons

// Sample recent documents data
const recentDocs = [
    { name: 'Atomic Habits', type: 'doc', icon: 'description', imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3lVnqs2ncnTsJneBCwzbziwQsPBSqjrRLXA&s' },
    { name: 'Atomic Habits', type: 'doc', icon: 'description', imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfl3bCbSemnoEwcYFkKEvwtEnmFpHF6p8IUw&s' },
    { name: 'Atomic Habits', type: 'doc', icon: 'description', imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVckxUQ6WxjP7KgbYp0MA26BCH0PKXU8WAow&s' },
    { name: 'Atomic Habits', type: 'doc', icon: 'description', imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8rnreOaMfAMyVo0jTbUzaVrZxjE-mm4rr_Q&s' },
];

const recentDocuments = () => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {recentDocs.map((doc, index) => (
                    <View key={index} style={styles.cardContainer}>
                        <View style={styles.docCard}>
                            <Image source={{ uri: doc.imgSrc }} style={styles.image} />
                            <View style={styles.bottomRow}>
                                <MaterialIcons name={doc.icon} size={18} color="#F06292" />
                                <Text style={styles.docTitle}>{doc.name}</Text>
                                <MaterialIcons name="more-vert" size={19} color="#9E9E9E" />
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingHorizontal: 10,
    },
    cardContainer: {
        marginRight: 15,
    },
    docCard: {
        backgroundColor: '#F5F5F5',
        width: 145,
        height: 180,
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    image: {
        width: '100%',
        height: '80%',
        resizeMode: 'cover',
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 5,
        backgroundColor: '#FFFFFF',
        width: '100%',
    },
    docTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#555',
        flex: 1,
        textAlign: 'center',
        marginHorizontal: 5,
    },
});

export default recentDocuments;