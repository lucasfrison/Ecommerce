import { Button } from '@react-native-material/core';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Button title='Open up App.tsx to start working on your app!'/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
