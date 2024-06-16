import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Button } from "@react-native-material/core";

type RootStackParamList = {
  ProductDetail: { productId: string, name: string, price: string, description: string, images: string[] | null };
};

type ProductDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

const ProductDetailScreen: React.FC = () => {
  const route = useRoute<ProductDetailScreenRouteProp>();
  const { productId, name, price, description, images } = route.params;

  const product = {
    id: productId,
    name: name,
    description: description,
    images: images,
    price: price,
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.name}>{product.name}</Text>
      {product.images && product.images.length > 0 ? (
        <Image source={{ uri: product.images[0] }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.noImage]}>
          <Text>No Image Available</Text>
        </View>
      )}
      <Text style={styles.price}>R$ {product.price}</Text>
      <Text style={styles.bold}>Em até 10x sem juros</Text>
      <Text>Entrega Grátis em: <Text style={styles.bold}>7 dias úteis</Text></Text>
      <Text style={styles.description}>{product.description}</Text>
      <Button
        title="Adicionar ao carrinho"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  noImage: {
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    height: 300, // Ajuste conforme necessário
  },
});

export default ProductDetailScreen;
