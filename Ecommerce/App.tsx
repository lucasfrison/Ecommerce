import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React, {useState} from "react";
import {StyleSheet, Text, TextComponent, TextInput, View} from 'react-native';
import ProductListScreen from "./src/components/ItemsList";
import {
    Backdrop,
    BackdropSubheader,
    AppBar,
    IconButton,
} from "@react-native-material/core";
import {NavigationContainer} from '@react-navigation/native';
import ProductDetailScreen from "./src/components/ProductDetailScreen";
import Index from "./src/components/Index";
import Cart from "./src/components/cart";

const Stack = createNativeStackNavigator()

export default function App() {
    const [revealed, setRevealed] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#6200ee', // Background color of the header
                        elevation: 0, // Remove shadow on Android
                        shadowOpacity: 0, // Remove shadow on iOS
                        borderBottomWidth: 0, // Remove bottom border on iOS
                    },
                    headerTintColor: '#fff', // Text color of the header
                    headerTitleStyle: {
                        fontWeight: 'bold', // Font style of the header title
                    },
                }}
            >
                <Stack.Screen name="Home" component={Index}/>
                <Stack.Screen name="Product Details" component={ProductDetailScreen}/>
                <Stack.Screen name="Cart" component={Cart}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0', // Example background color
    },
})
