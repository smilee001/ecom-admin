import React, { useEffect, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useRoute } from "@react-navigation/native";
import DocumentPicker, { types } from 'react-native-document-picker';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Entypo';

const EditPage = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [price, setPrice] = useState('');
    const [priceError, setPriceError] = useState(false);
    const [discount, setDiscount] = useState('');
    const [discountError, setDiscountError] = useState(false);
    const [productType, setProductType] = useState('');
    const [productTypeError, setProductTypeError] = useState(false);
    const [description, setDescription] = useState('');
    const [descriptionError, setDescriptionError] = useState(false);
    const [image, setImage] = useState([]);
    const [imageURL, setImageURL] = useState([]);
    const [imageError, setImageError] = useState(false);

    const route = useRoute();
    const id = route.params?.itemid;

    const [data, setData] = useState();

    useEffect(() => {
        axios.get(`http://192.168.42.107:5000/admin/getsingleproduct/${id}`)
            .then((response) => {
                console.log('Fetched data:', response.data.data);
                const productData = response.data.data;
                setData(productData);
                setTitle(productData.title);
                setPrice(productData.price);
                setDiscount(productData.discount.toString());
                setProductType(productData.productType);
                setDescription(productData.discription);
                setImageURL(productData.image);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [id]);

    const handleAddImages = async () => {
        setImageURL([]);
        try {
            const response = await DocumentPicker.pick({
                type: [types.images],
                allowMultiSelection: true
            });

            setImage(prevImages => [...prevImages, ...response]);

            console.log(image);

            const newImageURLs = response.map(item => item.uri);
            setImageURL(prevImageURLs => [...prevImageURLs, ...newImageURLs]);

            setImageError(false);

        } catch (err) {
            console.warn(err);
        }
    };

    useEffect(() => {
        console.log('images: ', image);
    }, [image])

    const removeimg = (index) => {
        setImageURL(prevImageURLs => prevImageURLs.filter((_, i) => i !== index));
    };

    // useEffect(() => {
    //     console.log('image :  ', image);
    // }, [image])

    const updatedata = () => {
        let hasError = false;

        if (title.trim() === '') {
            setTitleError(true);
            hasError = true;
        }

        if (price.trim() === '') {
            setPriceError(true);
            hasError = true;
        }

        if (discount.trim() === '') {
            setDiscountError(true);
            hasError = true;
        }

        if (productType.trim() === '') {
            setProductTypeError(true);
            hasError = true;
        }

        if (description.trim() === '') {
            setDescriptionError(true);
            hasError = true;
        }

        if (imageURL.length === 0) {
            setImageError(true);
            hasError = true;
        }

        if (!hasError) {
            console.log('Save');
            saveChanage();
        }
    };

    const saveChanage = async () => {

        const formData = new FormData();

        console.log('images', image);

        image.forEach((image, index) => {
            // formData.append(`images[${index}]`, image);
            formData.append('images', {
                name: image.name,
                uri: image.uri,
                type: image.type
            });
        });

        console.log('id:', id);
        console.log(formData);

        try {
            await axios.patch(`http://192.168.42.107:5000/admin/updateProductimages/${id}`, formData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(function (response) {
                    console.log(response.data.status === 200);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } catch (error) {
            console.error('Error:', response.data.error);
        }

        try {
            await axios.patch(`http://192.168.42.107:5000/admin/updateproductdata/${id}`, {
                title: title,
                price: price,
                discount: discount,
                productType: productType,
                discription: description
            })
                .then(function (response) {
                    console.log(response.data.status === 200);
                    navigation.navigate('Manageproduct', { refresh: true });
                })
                .catch(function (error) {
                    console.log(error);
                });
        } catch (error) {
            console.error('Error:', response.data.error);
        }
    }


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollview} showsVerticalScrollIndicator={false}>
                <View>
                    <Text style={styles.title}>Edit Product</Text>

                    {titleError && <Text style={styles.errorText}>Title cannot be empty</Text>}
                    <TextInput
                        style={[styles.input, styles.inputLarge, titleError && styles.inputError]}
                        value={title}
                        onChangeText={(text) => {
                            setTitle(text);
                            if (titleError && text.trim() !== '') setTitleError(false);
                        }}
                        placeholder="Title"
                        placeholderTextColor="#aaa"
                    />

                    {priceError && <Text style={styles.errorText}>Price cannot be empty</Text>}
                    <TextInput
                        style={[styles.input, styles.inputLarge, priceError && styles.inputError]}
                        value={price}
                        onChangeText={(text) => {
                            setPrice(text);
                            if (priceError && text.trim() !== '') setPriceError(false);
                        }}
                        placeholder="Price"
                        placeholderTextColor="#aaa"
                        keyboardType="numeric"
                    />

                    {discountError && <Text style={styles.errorText}>Discount cannot be empty</Text>}
                    <TextInput
                        style={[styles.input, styles.inputLarge, discountError && styles.inputError]}
                        value={discount}
                        onChangeText={(text) => {
                            setDiscount(text);
                            if (discountError && text.trim() !== '') setDiscountError(false);
                        }}
                        placeholder="Discount"
                        placeholderTextColor="#aaa"
                        keyboardType="numeric"
                    />

                    {productTypeError && <Text style={styles.errorText}>Product Type cannot be empty</Text>}
                    <TextInput
                        style={[styles.input, styles.inputLarge, productTypeError && styles.inputError]}
                        value={productType}
                        onChangeText={(text) => {
                            setProductType(text);
                            if (productTypeError && text.trim() !== '') setProductTypeError(false);
                        }}
                        placeholder="Product Type"
                        placeholderTextColor="#aaa"
                    />

                    {descriptionError && <Text style={styles.errorText}>Description cannot be empty</Text>}
                    <TextInput
                        style={[styles.input, styles.multilineInput, descriptionError && styles.inputError]}
                        value={description}
                        onChangeText={(text) => {
                            setDescription(text);
                            if (descriptionError && text.trim() !== '') setDescriptionError(false);
                        }}
                        placeholder="Description"
                        placeholderTextColor="#aaa"
                        multiline
                    />

                    {imageError && <Text style={styles.errorText}>Please add at least one image</Text>}
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#555' }]} onPress={handleAddImages}>
                        <Text style={[styles.buttonText, { color: '#000' }]}>Add Images</Text>
                    </TouchableOpacity>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: wp(3.1), flexWrap: 'wrap', marginVertical: hp(1.5) }}>
                        {imageURL.length !== 0 &&
                            imageURL.map((item, index) => (
                                <View key={index} style={styles.imgcover}>
                                    <Image style={{ height: hp(9.7), width: wp(20.1), backgroundColor: 'red', borderRadius: 5 }} source={{ uri: item }} />

                                    <TouchableOpacity style={styles.removeicon} onPress={() => removeimg(index)}>
                                        <Icon style={styles.removeicon} name='squared-minus' />
                                    </TouchableOpacity>
                                </View>
                            ))}
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={updatedata}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: wp(5),
        backgroundColor: '#222',
    },

    scrollview: {
        paddingTop: hp(2),
        paddingBottom: hp(4)
    },

    title: {
        fontSize: hp(4),
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: hp(1)
    },

    input: {
        backgroundColor: '#333',
        color: '#fff',
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 5,
        padding: wp(2),
        marginBottom: hp(2),
        fontSize: hp(2.2)
    },
    inputLarge: {
        fontSize: hp(2.2)
    },
    errorText: {
        color: 'red',
        marginBottom: hp(0.5),
    },
    inputError: {
        borderColor: 'red',
    },
    multilineInput: {
        height: hp(15),
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#5cb85c',
        borderRadius: 5,
        paddingVertical: hp(1.6)
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: hp(2.2),
        fontWeight: 'bold',
    },
    imgcover: {
        position: 'relative',
    },
    removeicon: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: '#fff',
        fontSize: hp(2),
        backgroundColor: '#000',
        borderBottomLeftRadius: wp(0.5),
    }
});

export default EditPage;