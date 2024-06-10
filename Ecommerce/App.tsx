import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {StyleSheet, Text, TextComponent, TextInput, View} from 'react-native';
import ProductListScreen from "./src/components/ItemsList";
import {
    Backdrop,
    BackdropSubheader,
    AppBar,
    IconButton,
} from "@react-native-material/core";
import { NavigationContainer } from '@react-navigation/native';
import ProductDetailScreen from "./src/components/ProductDetailScreen";
import Index from "./src/components/Index";

const Stack = createNativeStackNavigator()

export default function App() {
    const [revealed, setRevealed] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Index} />
          <Stack.Screen name="Product Details" component={ProductDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})
