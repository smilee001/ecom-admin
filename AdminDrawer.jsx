import React from 'react'
import Home from './src/Component/Home';
import Addproduct from './src/Component/Addproduct';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Entypo';
import { StyleSheet, View } from 'react-native';
import AddProductPage from './src/Component/Addproduct';
import Manageproduct from './src/Component/Manageproduct';

const AdminDrawer = () => {

    const Drawer = createDrawerNavigator();

    return (
        <>
            <Drawer.Navigator initialRouteName="Manageproduct">
                <Drawer.Screen name="Home" component={Home}
                    options={{
                        headerTitle: () => {
                            null
                        },
                        headerRight: () => (
                            <HeaderComponent />
                        ),
                    }}
                />
                <Drawer.Screen name="AddProductPage" component={AddProductPage}
                    options={{
                        headerTitle: () => {
                            null
                        },
                        headerRight: () => (
                            <HeaderComponent />
                        ),
                    }}
                />
                <Drawer.Screen name="Manageproduct" component={Manageproduct}
                    options={{
                        headerTitle: () => {
                            null
                        },
                        headerRight: () => (
                            <HeaderComponent />
                        ),
                    }}
                />
            </Drawer.Navigator>
        </>
    )
}

const HeaderComponent = () => {
    return (
        <View style={style.header}>
            <View style={style.iconsview}>
                <Icon name='magnifying-glass' style={style.headericon} />
                <Icon name='chat' style={style.headericon} />
                <Icon name='bell' style={style.headericon} />
                <Icon name='resize-full-screen' style={style.headericon} />
                <Icon name='grid' style={style.headericon} />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    header: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff'
    },

    iconsview: {
        display: 'flex',
        flexDirection: 'row',
        gap: 30,
        alignItems: 'center'
    },

    headericon: {
        fontSize: 25,
        color: '#7F7F7F'
    }
})

export default AdminDrawer;