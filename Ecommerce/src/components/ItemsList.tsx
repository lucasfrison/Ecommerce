import React from 'react';
import { Pressable, Surface } from "@react-native-material/core";
import { View, Text, FlatList,Image, StyleSheet, Dimensions } from 'react-native';

let width = Dimensions.get('window').width; //full width
let height = Dimensions.get('window').height; //full height
const numColumns = 2;

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

const products: Product[] = [
  { id: 1, name: 'Product 1', price: '$10', image: '../../assets/produtos/img2.png' },
  { id: 2, name: 'Product 2', price: '$20', image: '../../assets/produtos/img2.png' },
  { id: 3, name: 'Product 3', price: '$30', image: '../../assets/produtos/img2.png' },
  { id: 4, name: 'Product 4', price: '$40', image: '../../assets/produtos/img2.png' },
  { id: 5, name: 'Product 5', price: '$50', image: '../../assets/produtos/img2.png' },
];

interface ProductItemProps {
  name: string;
  price: string;
  image: string;
}

const ProductItem: React.FC<ProductItemProps> = ({ name, price, image }) => (
    <Surface
        elevation={4}
        category="medium"
        style={styles.item}>
      <Image source={ {uri: image, headers: { 'Accept': 'image/*'}} } style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>
    </Surface>

);

const ProductListScreen: React.FC = () => {
  return (
        <FlatList
            data={products}
            renderItem={({ item }) => <ProductItem name={item.name} price={item.price}  image={item.image}/>}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.flatList}
        />

  );
};

const itemMargin = 10;
const itemWidth = (width - itemMargin * (numColumns + 1)) / numColumns;

const styles = StyleSheet.create({
  flatList: {
    paddingHorizontal: itemMargin,
    paddingTop: itemMargin,
  },
  item: {
    margin: itemMargin,
    marginBottom: 0,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 3,
  },
  image: {
    resizeMode : 'cover',
    width: itemWidth-15,
    height: itemWidth,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  detailsContainer: {
    flex: 1, // Use flex to expand the details container
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

export default ProductListScreen;
