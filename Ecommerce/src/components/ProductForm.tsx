import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { NewProduct } from '../types/Product';

interface ProductFormProps {
  initialValues?: NewProduct;
  onSubmit: (product: NewProduct) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialValues, onSubmit }) => {
  const [name, setName] = useState(initialValues?.name || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [price, setPrice] = useState(initialValues?.price?.toString() || '');
  const [image, setImage] = useState((initialValues?.image && initialValues.image[0]) || '');

  const handleSave = () => {
    const product: NewProduct = {
      name,
      description,
      price: parseFloat(price),
      image: image ? [image] : []
    };
    onSubmit(product);
  };

  const handleReset = () => {
    setName(initialValues?.name || '');
    setDescription(initialValues?.description || '');
    setPrice(initialValues?.price?.toString() || '');
    setImage((initialValues?.image && initialValues.image[0]) || '');
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        onChangeText={setName}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        onChangeText={setDescription}
        value={description}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        onChangeText={setPrice}
        value={price}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        onChangeText={setImage}
        value={image}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Save"
          onPress={handleSave}
        />
        <Button
          title="Cancel"
          onPress={handleReset}
          color="#888"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default ProductForm;
