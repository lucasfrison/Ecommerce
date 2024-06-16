import React, { useEffect, useState } from 'react';
import { View, FlatList, Button, Modal, StyleSheet, Dimensions, ScrollView, Image, Alert } from 'react-native';
import ProductForm from '../components/ProductForm';
import { Product, NewProduct } from '../types/Product';
import { Surface, Text } from "@react-native-material/core";
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../services/ProductService';

const numColumns = 2;
let width = Dimensions.get('window').width; // full width

const CrudProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch products');
    }
  };

  const handleAddProduct = () => {
    setCurrentProduct(null);
    setIsModalVisible(true);
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setIsModalVisible(true);
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      Alert.alert('Error', 'Failed to delete product');
    }
  };

  const handleSubmit = async (product: NewProduct) => {
    try {
      if (currentProduct) {
        await updateProduct(currentProduct.id, product);
        setProducts(products.map(p => p.id === currentProduct.id ? { ...product, id: currentProduct.id } : p));
      } else {
        const newProduct = await createProduct(product);
        setProducts([...products, newProduct]);
      }
      setIsModalVisible(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to save product');
    }
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <Surface style={styles.item}>
      <Image 
        source={{ uri: item.image?.[0] ?? 'default_image_url', headers: { 'Accept': 'image/*' } }} 
        style={styles.image} 
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Button
          title="Edit"
          onPress={() => handleEditProduct(item)}
        />
        <Button
          title="Delete"
          onPress={() => handleDeleteProduct(item.id)}
        />
      </View>
    </Surface>
  );

  return (
    <View style={styles.container}>
      <Button title="Add Product" onPress={handleAddProduct} />
      <ScrollView>
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          contentContainerStyle={styles.flatList}
        />
      </ScrollView>
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modal}>
          <ProductForm
            initialValues={currentProduct ?? undefined}
            onSubmit={handleSubmit}
          />
        </View>
      </Modal>
    </View>
  );
};

const itemMargin = 10;
const itemWidth = (width - itemMargin * (numColumns + 1)) / numColumns;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  modal: {
    flex: 1,
    justifyContent: 'center'
  },
  flatList: {
    paddingHorizontal: itemMargin,
    paddingTop: itemMargin,
    flex: 1,
    justifyContent: 'flex-start',
  },
  item: {
    margin: itemMargin,
    marginBottom: 0,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 3,
  },
  image: {
    resizeMode: 'cover',
    width: itemWidth - 15,
    height: itemWidth,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    padding: 10,
  },
  name: {
    fontSize: 18,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default CrudProducts;
