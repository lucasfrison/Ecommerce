import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Alert } from 'react-native';
import { Surface, Button } from "@react-native-material/core";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Product } from '../types/Product';

const numColumns = 2;
let width = Dimensions.get('window').width; // full width

interface ProductItemProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onEdit, onDelete }) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleDeletePress = () => {
    Alert.alert(
      'Delete Product',
      'Do you really want to delete this item?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete(product.id)
        }
      ]
    );
  };  

  return (
    <Surface style={styles.item}>
      <Image source={{ uri: product.image?.[0] }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <Button
          title="Edit"
          onPress={() => onEdit(product)}
          style={styles.button}
          color="#6200EE"
        />
        <Button
          title="Delete"
          onPress={handleDeletePress}
          style={styles.button}
          color="#6200EE"
        />
      </View>
    </Surface>
  );
};

const itemMargin = 10;
const itemWidth = (width - itemMargin * (numColumns + 1)) / numColumns;

const styles = StyleSheet.create({
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
    padding: 10,
  },
  name: {
    fontSize: 18,
  },
  button: {
    width: 80,
    height: 36,
    justifyContent: 'center',
    borderRadius: 8,
  },
});

export default ProductItem;
