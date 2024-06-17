import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import ProductDetailScreen from "./src/screens/ProductDetailScreen";
import Index from "./src/screens/Index";
import Cart from "./src/screens/cart";
import CrudProducts from "./src/screens/CrudProducts";
import { IconButton, Avatar } from "@react-native-material/core";

const Stack = createNativeStackNavigator();

export default function App() {
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
                <Stack.Screen
                    name="Home"
                    component={Index}
                    options={{
                        headerRight: () => (
                            loggedIn ? (
                                <IconButton
                                    icon={<Avatar label="Yaman KATBY" size={28} />}
                                    onPress={() => setLoggedIn(false)}
                                    style={styles.iconButton}
                                />
                            ) : (
                                <TouchableOpacity
                                    onPress={() => setLoggedIn(true)}
                                    style={styles.loginButton}
                                >
                                    <Text style={styles.loginButtonText}>Login</Text>
                                </TouchableOpacity>
                            )
                        ),
                    }}
                />
                <Stack.Screen name="Product Details" component={ProductDetailScreen} />
                <Stack.Screen name="Cart" component={Cart} />
                <Stack.Screen name="Products Registration" component={CrudProducts} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0', // Example background color
    },
    loginButton: {
        marginRight: 16,
        padding: 8,
        backgroundColor: '#6200EE',
        borderRadius: 4,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    iconButton: {
        marginRight: 16,
    },
});
