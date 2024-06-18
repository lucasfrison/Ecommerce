import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { NewProduct } from '../types/Product';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProductFormProps {
  initialValues?: NewProduct;
  onSubmit: (product: NewProduct) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialValues, onSubmit, onCancel }) => {
  const [name, setName] = useState(initialValues?.name || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [price, setPrice] = useState(initialValues?.price?.toString() || '');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Carregar a URL da imagem salva no AsyncStorage, se existir
    const loadSavedImageUrl = async () => {
      try {
        const savedImageUrl = await AsyncStorage.getItem(`product_image_${name}`);
        if (savedImageUrl) {
          setImageUrl(savedImageUrl);
        }
      } catch (error) {
        console.error('Erro ao carregar URL da imagem do AsyncStorage:', error);
      }
    };

    // Carregar apenas se initialValues estiver definido (edição de produto)
    if (initialValues) {
      loadSavedImageUrl();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues?.name]); // Atualizar apenas quando initialValues.name mudar

  const handleSave = async () => {
    const product: NewProduct = {
      name,
      description,
      price: parseFloat(price),
      image: [imageUrl]
    };
    onSubmit(product);

    // Salvando a URL da imagem no AsyncStorage para uso futuro
    try {
      await AsyncStorage.setItem(`product_image_${name}`, imageUrl);
    } catch (error) {
      console.error('Erro ao salvar URL da imagem no AsyncStorage:', error);
    }
  };

  const handleReset = () => {
    setName(initialValues?.name || '');
    setDescription(initialValues?.description || '');
    setPrice(initialValues?.price?.toString() || '');
    setImageUrl(initialValues?.image?.[0] || '');
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
        onChangeText={setImageUrl}
        value={imageUrl}
      />
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default ProductForm;
