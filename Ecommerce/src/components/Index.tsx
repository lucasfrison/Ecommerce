import React, { useState } from "react";
import { StyleSheet, View } from 'react-native';
import ProductListScreen from "../components/ItemsList";
import {
  Backdrop,
  BackdropSubheader,
  AppBar,
  IconButton,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function Index({ navigation }: {navigation: any}) {
  const [revealed, setRevealed] = useState(false);

  return (
    <View style={styles.container}>
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
        <BackdropSubheader title="Catálogo de Produtos" />
        <ProductListScreen />
      </Backdrop>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
