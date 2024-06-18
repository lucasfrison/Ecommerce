import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import ProductListScreen from "../components/ItemsList";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Avatar, Button } from '@react-native-material/core';
import { Backdrop, AppBar, IconButton,} from "@react-native-material/core";

export default function Index({ navigation }: { navigation: any }) {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by name"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <Icon name="magnify" size={24} color="gray" style={styles.searchIcon} />
            </View>
            <View style={styles.content}>
                <ProductListScreen searchQuery={searchQuery} />
            </View>
            <View style={styles.bottomBar}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Cart')}
                >
                    <Icon name="cart" size={28} color="white" />
                    <Text style={styles.buttonText}>Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Products Registration')}
                >
                    <Icon name="plus" size={28} color="white" />
                    <Text style={styles.buttonText}>Product Registration</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        margin: 8,
        height: 40,
    },
    searchInput: {
        flex: 1,
        height: '100%',
        paddingLeft: 8,
    },
    searchIcon: {
        padding: 8,
    },
    content: {
        flex: 1,
        marginBottom: 60,
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#6200EE',
        padding: 10,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 60,
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        marginTop: 4,
    },
});
