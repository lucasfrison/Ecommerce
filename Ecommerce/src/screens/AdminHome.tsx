import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Surface } from "@react-native-material/core";
import { Orders } from '../types/Orders';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Payment: undefined;
  'Products Registration': undefined;
  'UserList' : undefined;
};

type AdminHomeNavigationProp = StackNavigationProp<RootStackParamList, 'Products Registration'>;

const AdminHome: React.FC = () => {
  const [clientOrders, setClientOrders] = useState<Orders[]>([]);
  const navigation = useNavigation<AdminHomeNavigationProp>();

  useEffect(() => {
    const getclientOrders = async () => {
      try {
        const existingOrders = await AsyncStorage.getItem('order');
        if (existingOrders) {
          const orders = JSON.parse(existingOrders);
          setClientOrders(orders);
        }
      } catch (error) {
        console.error('Error retrieving cart items: ', error);
      }
    };

    getclientOrders();
  }, []);

  const calculateTotal = (order: Orders) => {
    // Calculate the total price by summing the price of all products
    const totalPrice = order.products.reduce((total, product) => total + product.price, 0);
    return totalPrice.toFixed(2); // Return total price formatted to 2 decimal places
  };
  
  const calculateAllTotal = (orders: Orders[]) => {
    return orders.reduce((accumulatedTotal, currentOrder) => {
      // Calculate the total price for each order's products
      const orderTotalPrice = currentOrder.products.reduce((productTotal, product) => {
        return productTotal + product.price;
      }, 0);
  
      // Add the order's total price to the accumulated total
      return accumulatedTotal + orderTotalPrice;
    }, 0);
  };
  

  const confirmOrder = async (index: number) => {
    try {
      const updatedOrders = [...clientOrders];
      updatedOrders.splice(index, 1);
      setClientOrders(updatedOrders);
      await AsyncStorage.setItem('order', JSON.stringify(updatedOrders));
    } catch (error) {
      console.error('Error removing item: ', error);
    }
  };

  const navigateToProductsRegistration = () => {
    navigation.navigate('Products Registration');
  };

  const navigateToUserList = () => {
    navigation.navigate('UserList');
  };

  return (
    <View style={styles.container}>
      <Surface elevation={6} category="medium" style={styles.orderInner}>
        <FlatList
          data={clientOrders}
          renderItem={({ item, index }) => (
            <View style={styles.orderItem}>
              <View style={styles.itemDetails}>
                <Text style={styles.itemClientName}>{item.ClientName}</Text>
                <Text style={styles.itemTotal}>R$ <Text style={styles.bold}>{calculateTotal(item)}</Text></Text>
              </View>
              <TouchableOpacity onPress={() => confirmOrder(index)} style={styles.removeButton}>
                <AntDesign name="check" size={24} color="black" />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.orderItemList}
        />
        <View style={styles.orderTotal}>
          <Text style={styles.totalText}>Total in orders: </Text>
          <Text style={styles.totalAmount}>R$ {calculateAllTotal(clientOrders)}</Text>
        </View>
      </Surface>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={navigateToProductsRegistration}>
          <AntDesign name="plus" size={28} color="white" />
          <Text style={styles.buttonText}>Product Registration</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToUserList}>
          <AntDesign name="plus" size={28} color="white" />
          <Text style={styles.buttonText}>List of Users</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BDD4E7',
    alignItems: 'center',
    justifyContent: 'space-between', // Para alinhar o conteúdo na vertical
  },
  orderInner: {
    height: Dimensions.get('window').height / 2 + 75,
    marginTop: 60,
    width: Dimensions.get('window').width - 50,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  orderItemList: {
    paddingHorizontal: 10,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  itemDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemClientName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemTotal: {
    fontSize: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  removeButton: {
    padding: 10,
  },
  orderTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  totalText: {
    color: '#4E4187',
    fontSize: 20,
  },
  totalAmount: {
    color: '#4E4187',
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
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
});

export default AdminHome;
