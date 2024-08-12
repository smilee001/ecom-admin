import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Dialog from './Dialoge';

const Manageproduct = ({ navigation }) => {

    const route = useRoute();
    const refresh = route.params?.refresh;

    const [reload, setReload] = useState(true);

    const [data, setData] = useState([]);

    useEffect(() => {
        console.log('refresh:', refresh);
        try {
            axios.get('http://192.168.42.133:5000/admin/getallproduct')
                .then((response) => {
                    setData(response.data.productData);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        } catch (error) {
            console.error('Error in useEffect:', error);
        }
    }, [route, reload]);

    // console.log(data);

    const [isDialogVisible, setDialogVisible] = useState(false);

    const [deleteID, setDeleteID] = useState('');

    const deleteProduct = async (id) => {
        setDeleteID(id);
        setDialogVisible(true);
    }

    const handleDelete = async () => {
        console.log('deleteID :', deleteID);
        console.log('delete');
        try {
            axios.delete(`http://192.168.42.107:5000/admin/deleteproduct/${deleteID}`)
                .then((response) => {
                    console.log(response);
                    setDeleteID('');
                    setDialogVisible(false);
                    setReload(!reload);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        } catch (error) {
            console.error('Error:', error);
        }
        console.log('deleteID :', deleteID);
    }

    const handleCancel = () => {
        console.log('Cancel button pressed');
        setDeleteID('');
        setDialogVisible(false);
    }

    return (
        <>
            <Dialog
                isVisible={isDialogVisible}
                title="Product Delete ?"
                message="Do you want to delete this Product? You cannot undo this action."
                onConfirm={handleDelete}
                onCancel={handleCancel}
            />
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.image[0] }} style={styles.image} />
                        <View style={styles.content}>
                            <Text style={styles.name}>{item.title}</Text>
                            <Text style={styles.type}>{item.productType}</Text>
                            <Text style={styles.description}>{item.discription}</Text>
                            <View style={styles.footer}>
                                <Text style={styles.price}>${item.price}</Text>
                                <Text style={styles.discount}>${item.discount} OFF</Text>
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditPage', { itemid: item._id })}>
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={() => { deleteProduct(item._id) }}>
                                <Text style={styles.buttonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}

            />

        </>
    )
}

const styles = StyleSheet.create({

    card: {
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        margin: 10,
        overflow: 'hidden',
        elevation: 5,
    },
    image: {
        height: 200,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    content: {
        padding: 15,
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 5,
        backgroundColor: '#fff'
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#000'
    },
    type: {
        fontSize: 14,
        marginBottom: 10,
        color: '#888',
    },
    description: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'justify',
        marginBottom: 10,
        color: '#888'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    discount: {
        fontSize: 14,
        color: '#d63031',
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        marginHorizontal: 10,
        paddingVertical: 10,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default Manageproduct;