import React, {useState} from "react";
import {Avatar, Button} from '@react-native-material/core';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import ProductListScreen from "../components/ItemsList";
import {
    Backdrop,
    BackdropSubheader,
    AppBar,
    IconButton,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function Index({navigation}: { navigation: any }) {
    const [revealed, setRevealed] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    return (
        <View style={styles.container}>
            <Backdrop
                revealed={revealed}
                header={
                    <AppBar
                        title="Screen title"
                        transparent
                        leading={props => (
                            <IconButton
                                icon={props => (
                                    <Icon name={revealed ? "close" : "menu"} {...props} />
                                )}
                                onPress={() => setRevealed(prevState => !prevState)}
                                {...props}

                            />
                        )}
                        trailing={props =>
                            loggedIn ? (
                                <IconButton
                                    icon={<Avatar label="Yaman KATBY" size={28}/>}
                                    onPress={() => setLoggedIn(!loggedIn)}
                                    {...props}
                                />
                            ) : (
                                <Button
                                    variant="text"
                                    title="Login"
                                    compact
                                    style={{marginEnd: 4}}
                                    onPress={() => setLoggedIn(!loggedIn)}
                                    {...props}
                                />
                            )
                        }
                    />
                }
                backLayer={<View style={{height: 50}}>
                    <View>
                        <IconButton icon={props => <Icon name="cart" {...props} />}
                                    color="white"
                                    onPress={() => navigation.navigate('Cart', {})}
                        />
                    </View>
                </View>}
            >
                <BackdropSubheader title="Produtos"/>
                <ProductListScreen></ProductListScreen>
            </Backdrop>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start', // Adjusts the container's height based on its children
    },
});
