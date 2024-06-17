import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions, FlatList} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Button, Snackbar, Surface} from "@react-native-material/core";
import {StackNavigationProp} from "@react-navigation/stack";

type RootStackParamList = {
    Cart: { productId: number, name: string, price: string, image: string };
};

type ProductDetailScreenRouteProp = RouteProp<RootStackParamList, 'Cart'>;

let width = Dimensions.get('window').width; // full width
let height = Dimensions.get('window').height; // full height
const itemMargin = 10;
const numColumns = 2;

const itemWidth = (width - itemMargin * (numColumns + 1)) / numColumns;

interface ProductItemProps {
    id: number;
    name: string;
    price: string;
    image: string;
}

const ProductItem: React.FC<ProductItemProps> = ({id, name, price, image}) => {
    const navigation = useNavigation<StackNavigationProp<any>>();

    return (
        <Surface
            elevation={4}
            category="medium"
            style={styles.item}>
            <View style={{justifyContent: "center", alignItems: "center"}}>
                <Image source={{uri: image, headers: {'Accept': 'image/*'}}} style={styles.image}/>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.price}>{price}</Text>
            </View>
        </Surface>
    );
};

const Cart: React.FC = () => {

    const route = useRoute<ProductDetailScreenRouteProp>();

    interface Product {
        id: number;
        name: string;
        price: string;
        image: string;
    }

    const products: Product[] = [
        {id: 1, name: 'Product 1', price: '$10', image: '../../assets/produtos/img2.png'},
        {id: 2, name: 'Product 2', price: '$20', image: '../../assets/produtos/img2.png'},
        {id: 3, name: 'PlayStation 3', price: '$30', image: '../../assets/produtos/img3.jpg'},
        {id: 4, name: 'Product 4', price: '$40', image: '../../assets/produtos/img2.png'},
        {id: 5, name: 'Product 5', price: '$50', image: '../../assets/produtos/img2.png'},
    ];

    interface ProductItemProps {
        id: number;
        name: string;
        price: string;
        image: string;
    }

    return (
        <View style={styles.cart}>
            <Surface
                elevation={6}
                category="medium"
                style={styles.cartInner}>
                <View>
                    <Surface
                        elevation={1}
                        category="medium"
                        style={styles.lojaContainer}>
                        <View style={styles.loja}>
                            <FlatList
                                data={products}
                                renderItem={({item}) => <ProductItem id={item.id} name={item.name} price={item.price} image={item.image}/>}
                                keyExtractor={item => item.id.toString()}
                                numColumns={2}
                                contentContainerStyle={styles.flatList}
                            />
                        </View>
                    </Surface>
                    <View style = {styles.cartView}>
                      <Text style={{color: "#4E4187"}}>Total:</Text>
                      <Text style={{color: "#4E4187"}}>R$2000,00</Text>
                    </View>
                </View>
            </Surface>
        </View>
    );
};

const styles = StyleSheet.create({

    cart: {
        flex: 1,
        backgroundColor: "#4E4187",
        alignItems: "center",
    },
    flatList: {
        paddingHorizontal: itemMargin,
        paddingTop: itemMargin,
        flex: 1,
        justifyContent: 'flex-start', // Adjusts the container's height based on its children
        flexGrow: 1,
    },
    cartInner: {
        height: height/2 + 75,
        marginTop: 60,
        width: width - 50,
        backgroundColor: "#F3DE2C",
        justifyContent: "space-between",
    },
    cartView: {
        flexDirection: "row",
        justifyContent:"space-between",
        marginTop: 15,
        marginHorizontal: 15
    },
    lojaContainer: {
        height: height/2 + 20,
    },
    loja: {
        height: height/2,
        marginBottom: 10,
    },
    item: {
        margin: itemMargin,
        marginBottom: 0,
        borderRadius: 8,
        backgroundColor: '#fff',
        elevation: 3,
        width: width/3 + 5,
    },
    image: {
        resizeMode: 'cover',
        width: width / 4,
        height: width / 4,
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

export default Cart;
