import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Button } from "@react-native-material/core";

type RootStackParamList = {
  ProductDetail: { productId: number, name: string, price: string, image: string };
};

type ProductDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

const ProductDetailScreen: React.FC = () => {
  const route = useRoute<ProductDetailScreenRouteProp>();
  const { productId, name, price, image } = route.params;

  const product = {
    id: productId,
    name: name,
    description: `O Playstation 3 foi o principal console da Sony entre os anos de 2006 e 2013, quando surgiu o Playstation 4. Ele foi um grande marco na indústria dos jogos, tanto pela durabilidade, mas também pela oferta de títulos exclusivos. Ele teve 3 modelos ao todo, indo do original (fat), ao slim e até ao super slim, no final de sua vida útil. Entre os principais games do Playstation 3, podemos citar The Last of Us, God of War 3, Uncharted 2 e GTA V. Seu controle, Dualshock 3, possuía um sensor de movimento que detectava alguns gestos nos controles, mas nunca foi de fato bem empregado nos jogos, sendo apenas um diferencial. O Playstation 3 foi o primeiro console da gigante japonesa a adotar Blu-ray como mídia padrão, o que elevou a qualidade dos jogos, tanto em gráfico, mas também em complexidade e recursos. Este console ainda servia como central de mídias, permitindo assistir à Blu-Ray e acessar internet, via cabo ou WiFi.`,
    image: image,
    price: price,
  };

  const handleAddToCart = () => {

  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.name}>{product.name}</Text>
      <Image source={{ uri: product.image, headers: { 'Accept': 'image/*' } }} style={styles.image} />
      <Text style={styles.price}>{product.price}</Text>
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
  addToCartButton: {
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  addToCartButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;
