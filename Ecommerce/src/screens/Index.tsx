import React, { useState } from "react";
import { Avatar, Button } from '@react-native-material/core';
import { StyleSheet, View } from 'react-native';
import ProductListScreen from "../components/ItemsList";
import {
    Backdrop,
    AppBar,
    IconButton,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function Index({ navigation }: { navigation: any }) {
    const [revealed, setRevealed] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <View style={styles.container}>
            <Backdrop
                revealed={revealed}
                header={
                    <AppBar
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
                                    icon={<Avatar label="Yaman KATBY" size={28} />}
                                    onPress={() => setLoggedIn(!loggedIn)}
                                    {...props}
                                />
                            ) : (
                                <Button
                                    variant="text"
                                    title="Login"
                                    compact
                                    style={{ marginEnd: 4 }}
                                    onPress={() => navigation.navigate('Login')}
                                    {...props}
                                />
                            )
                        }
                    />
                }
                backLayer={
                    <View style={{ height: 50, flexDirection: 'row', alignItems: 'center' }}>
                        <IconButton
                            icon={props => <Icon name="cart" {...props} />}
                            color="white"
                            onPress={() => navigation.navigate('Cart')}
                        />
                        <IconButton
                            icon={props => <Icon name="plus" {...props} />}
                            color="white"
                            onPress={() => navigation.navigate('Products Registration')}
                        />
                    </View>
                }
            >
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
