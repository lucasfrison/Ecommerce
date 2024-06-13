import React, { useState } from 'react';
import { View, FlatList, Button, Modal, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import ProductForm from '../components/ProductForm';
import { Product, NewProduct } from '../types/Product';
import { Surface, Text } from "@react-native-material/core";

const numColumns = 2;
let width = Dimensions.get('window').width; // full width

const CrudProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const handleAddProduct = () => {
    setCurrentProduct(null);
    setIsModalVisible(true);
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setIsModalVisible(true);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleSubmit = (product: NewProduct) => {
    if (currentProduct) {
      setProducts(products.map(p => p.id === currentProduct.id ? { ...product, id: currentProduct.id } : p));
    } else {
      setProducts([...products, { ...product, id: Date.now().toString() }]);
    }
    setIsModalVisible(false);
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <Surface style={styles.item}>
      <Image source={{ uri: item.image[0], headers: { 'Accept': 'image/*' } }} style={styles.image} />
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
