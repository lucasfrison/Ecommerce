import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Surface } from "@react-native-material/core";
import { View, Text, FlatList, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

let width = Dimensions.get('window').width; // full width
const numColumns = 2;

interface Product {
    id: string;
    name: string;
    price: string;
    description: string;
    images: string[] | null;
}

const ProductItem: React.FC<Product> = ({ id, name, price, images, description }) => {
    const navigation = useNavigation<StackNavigationProp<any>>();

    const handlePress = () => {
        navigation.navigate('Product Details', {
            productId: id,
            name: name,
            price: price,
            description: description,
            images: images,
        });
    };

    return (
        <Surface
            elevation={4}
            category="medium"
            style={styles.item}>
            {images && images.length > 0 ? (
                <Image source={{ uri: images[0] }} style={styles.image} />
            ) : (
                <View style={[styles.image, styles.noImage]}>
                    <Text>No Image Available</Text>
                </View>
            )}
            <View style={styles.detailsContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.price}>R${price}</Text>
                <Button
                    title="Details"
                    onPress={handlePress}
                />
            </View>
        </Surface>
    );
};

const ProductListScreen: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/products');
                setProducts(response.data);
            } catch (err) {
                setError('Failed to fetch products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />;
    }

    if (error) {
        return <Text style={styles.errorText}>{error}</Text>;
    }

    return (
        <FlatList
            data={products}
            renderItem={({ item }) => (
                <ProductItem
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    images={item.images}
                    description={item.description}
                />
            )}
            keyExtractor={item => item.id}
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
    noImage: {
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
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
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    errorText: {
        color: 'red',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default ProductListScreen;
