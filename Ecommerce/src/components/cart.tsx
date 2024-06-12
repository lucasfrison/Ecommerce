import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Button } from "@react-native-material/core";

type RootStackParamList = {
  Cart: { productId: number, name: string, price: string, image: string };
};

type ProductDetailScreenRouteProp = RouteProp<RootStackParamList, 'Cart'>;

const Cart: React.FC = () => {
  const route = useRoute<ProductDetailScreenRouteProp>();
  const { productId, name, price, image } = route.params;

  const product = {
    id: 2,
    name: "VRAUZIO",
    description: `O Playstation 3 foi o principal console da Sony entre os anos de 2006 e 2013, quando surgiu o Playstation 4. Ele foi um grande marco na indústria dos jogos, tanto pela durabilidade, mas também pela oferta de títulos exclusivos. Ele teve 3 modelos ao todo, indo do original (fat), ao slim e até ao super slim, no final de sua vida útil. Entre os principais games do Playstation 3, podemos citar The Last of Us, God of War 3, Uncharted 2 e GTA V. Seu controle, Dualshock 3, possuía um sensor de movimento que detectava alguns gestos nos controles, mas nunca foi de fato bem empregado nos jogos, sendo apenas um diferencial. O Playstation 3 foi o primeiro console da gigante japonesa a adotar Blu-ray como mídia padrão, o que elevou a qualidade dos jogos, tanto em gráfico, mas também em complexidade e recursos. Este console ainda servia como central de mídias, permitindo assistir à Blu-Ray e acessar internet, via cabo ou WiFi.`,
    image: "noImage",
    price: 22,
  };
  const productList = [product, product];

  return (
      <View style={styles.cart}>

      </View>
  );
};

const styles = StyleSheet.create({
  cart: {
    flex:1
  }
});

export default Cart;
