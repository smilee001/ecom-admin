import React, { useEffect, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import DocumentPicker, { types } from 'react-native-document-picker';
import axios from 'axios';

const AddProductPage = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [price, setPrice] = useState('');
  const [priceError, setPriceError] = useState(false);
  const [discount, setDiscount] = useState('');
  const [discountError, setDiscountError] = useState(false);
  const [productType, setProductType] = useState('');
  const [productTypeError, setProductTypeError] = useState(false);
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [image, setImage] = useState([]);
  const [imageURL, setImageURL] = useState([]);
  const [imageError, setImageError] = useState(false);

  const handleAddImages = async () => {
    try {
      const response = await DocumentPicker.pick({
        type: [types.images],
        allowMultiSelection: true
      });

      setImage(prevImages => [...prevImages, ...response])

      const newImageURLs = response.map(item => item.uri);
      setImageURL(prevImageURLs => [...prevImageURLs, ...newImageURLs]);

      setImageError(false);

    } catch (err) {
      console.warn(err);
    }
  };

  const handleAddProduct = () => {
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
      console.log('Add product');
      addProduct();
    }
  };

  const addProduct = async () => {

    const formData = new FormData();

    image.forEach((image, index) => {
      // formData.append(`images[${index}]`, image);
      formData.append('images', {
        name: image.name,
        uri: image.uri,
        type: image.type
      });
    });

    formData.append('title', title);
    formData.append('price', price);
    formData.append('discount', discount);
    formData.append('productType', productType);
    formData.append('discription', description);

    console.log(formData);

    try {
      await axios.post('http://192.168.42.107:5000/admin/addproduct', formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(function (response) {
          console.log(response.data.status === 200);
          setTitle('');
          setPrice('');
          setDiscount('');
          setProductType('');
          setDescription('');
          setImageURL([]);
          setImage([]);
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
          <Text style={styles.title}>Add Product</Text>

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
                <Image key={index} style={{ height: hp(9.7), width: wp(20.1), backgroundColor: 'red', borderRadius: 5 }} source={{ uri: item }} />
              ))}
          </View>

        </View>

        <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
          <Text style={styles.buttonText}>Add Product</Text>
        </TouchableOpacity>

      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-around',
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
    fontWeight: 'bold',
    fontSize: hp(2.2)
  }
});

export default AddProductPage;