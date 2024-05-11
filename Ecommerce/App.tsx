import { Button } from '@react-native-material/core';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import {StyleSheet, View } from 'react-native';
import ProductListScreen from "./src/components/ItemsList";
import {
  Backdrop,
  BackdropSubheader,
  AppBar,
  IconButton,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";


export default function App() {
  const [revealed, setRevealed] = useState(false);
  return (
      <Backdrop
          revealed={revealed}
          header={
            <AppBar
                title="Screen title"
                transparent
                leading={props => (
                    <IconButton
                        icon={props => (
                            <Icon name={revealed ? "close" : "menu"} {...props} />
                        )}
                        onPress={() => setRevealed(prevState => !prevState)}
                        {...props}
                    />
                )}
            />
          }
          backLayer={<View style={{ height: 120 }} />}
      >
        <BackdropSubheader title="Produtos" />
        <ProductListScreen></ProductListScreen>
      </Backdrop>
  );
}
