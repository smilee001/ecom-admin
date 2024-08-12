import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const addData = async () => {

        try {
            await axios.post('http://192.168.42.14:5000/admin/login', {
                email: email,
                password: password
            })
                .then(function (response) {
                    console.log(response.data.status===200);
                    // setEmail('');
                    // setPassword('');
                })
                .catch(function (error) {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>
            <View style={styles.inputContainer}>
                <Icon name="envelope" size={20} color="#fff" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#fff"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="lock" size={30} color="#fff" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#fff"
                    secureTextEntry
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={addData}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,1)',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 15,
        color: '#fff',
    },
    button: {
        width: '100%',
        backgroundColor: '#007bff',
        paddingVertical: 15,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Login;