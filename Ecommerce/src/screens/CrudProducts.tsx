import React, { useEffect, useState } from 'react';
import { View, FlatList, Modal, StyleSheet, Dimensions, Image, Alert } from 'react-native';
import ProductForm from '../components/ProductForm';
import { Product, NewProduct } from '../types/Product';
import { Surface, Button, Text } from "@react-native-material/core";
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

  const handleCancel = () => {
    setIsModalVisible(false);
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
          style={styles.button}
          color="#6200EE"
        />
        <Button
          title="Delete"
          onPress={() => handleDeleteProduct(item.id)}
          style={styles.button}
          color="#6200EE"
        />
      </View>
    </Surface>
  );

  return (
    <View style={styles.container}>
      <Button title="Add Product" onPress={handleAddProduct} color="#6200EE" />
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        contentContainerStyle={styles.flatList}
        columnWrapperStyle={styles.columnWrapper}
        extraData={products}
      />
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modal}>
          <ProductForm
            initialValues={currentProduct ?? undefined}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
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
    justifyContent: 'center',
    paddingVertical: itemMargin,
  },
  columnWrapper: {
    justifyContent: 'space-around',
  },
  item: {
    margin: itemMargin / 2,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 3,
    width: itemWidth,
  },
  image: {
    resizeMode: 'cover',
    width: itemWidth,
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
  button: {
    marginTop: 5,
    justifyContent: 'center',
    borderRadius: 8,
  },
});

export default CrudProducts;
