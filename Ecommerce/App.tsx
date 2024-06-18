import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import ProductDetailScreen from "./src/screens/ProductDetailScreen";
import Index from "./src/screens/Index";
import Cart from "./src/screens/cart";
import CrudProducts from "./src/screens/CrudProducts";
import Login from "./src/screens/login";
import Register from "./src/screens/register";
import PaymentScreen from "./src/screens/PaymentScreen";
import UserListScreen from './src/screens/UserListScreen';
import EditUserScreen from './src/screens/EditUserScreen';
import { RootStackParamList } from './src/types/NavigationTypes';
import AdminHome from './src/screens/AdminHome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './src/components/AuthContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </AuthProvider>
  );
};

const MainStack: React.FC = () => {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6200ee',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {user ? (
        <>
          {user.profileType === 'USER' ? (
            <>
              <Stack.Screen
                name="Home"
                component={Index}
                options={{
                  headerRight: () => (
                    <TouchableOpacity onPress={logout} style={styles.loginButton}>
                      <Text style={styles.loginButtonText}>Logout</Text>
                    </TouchableOpacity>
                  ),
                }}
              />
              <Stack.Screen name="Product Details" component={ProductDetailScreen} />
              <Stack.Screen name="Cart" component={Cart} />
              <Stack.Screen name="Payment" component={PaymentScreen} />
            </>
          ) : user.profileType === 'ADMIN' ? (
            <>
              <Stack.Screen
                name="Admin Home"
                component={AdminHome}
                options={{
                  headerRight: () => (
                    <TouchableOpacity onPress={logout} style={styles.loginButton}>
                      <Text style={styles.loginButtonText}>Logout</Text>
                    </TouchableOpacity>
                  ),
                }}
              />
              <Stack.Screen name="Products Registration" component={CrudProducts} />
              <Stack.Screen name="UserList" component={UserListScreen}  />
              <Stack.Screen name="EditUser" component={EditUserScreen} />
            </>
          ) : null}
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
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
});

export default App;
