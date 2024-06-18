import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { NewProduct } from '../types/Product';

interface ProductFormProps {
  initialValues?: NewProduct;
  onSubmit: (product: NewProduct) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialValues, onSubmit, onCancel }) => {
  const [name, setName] = useState(initialValues?.name || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [price, setPrice] = useState(initialValues?.price?.toString() || '');
  const [imageBase64, setImageBase64] = useState((initialValues?.image && initialValues.image[0]) || '');

  const handleImagePicker = () => {
    launchImageLibrary({ mediaType: 'photo', includeBase64: true }, (response) => {
      if (response.didCancel) {
        Alert.alert('Cancelled', 'Image selection was cancelled.');
      } else if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const base64String = response.assets[0].base64;
        setImageBase64(`data:image/jpeg;base64,${base64String}`);
      }
    });
  };

  useEffect(() => {
    console.log('Imagem em base64 atualizada:', imageBase64);
  }, [imageBase64]);

  const handleSave = () => {
    const product: NewProduct = {
      name,
      description,
      price: parseFloat(price),
      image: imageBase64 ? [imageBase64] : []
    };
    onSubmit(product);
  };

  const handleReset = () => {
    setName(initialValues?.name || '');
    setDescription(initialValues?.description || '');
    setPrice(initialValues?.price?.toString() || '');
    setImageBase64((initialValues?.image && initialValues.image[0]) || '');
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
      <TouchableOpacity onPress={handleImagePicker}>
        <View style={styles.imagePicker}>
          {imageBase64 ? (
            <Image source={{ uri: imageBase64 }} style={styles.image} />
          ) : (
            <Button title="Pick an Image" onPress={handleImagePicker} />
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <Button
          title="Save"
          onPress={handleSave}
        />
        <Button
          title="Cancel"
          onPress={() => {
            handleReset();
            onCancel();
          }}
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
  imagePicker: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default ProductForm;
