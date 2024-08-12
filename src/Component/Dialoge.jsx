// IOSDialog.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const Dialog = ({ isVisible, title, message, onConfirm, onCancel }) => {
    console.log('isVisible:', isVisible);
    return (
        <Modal isVisible={isVisible} backdropOpacity={0.4} useNativeDriver={true} hideModalContentWhileAnimating={true}>
            <View style={styles.dialogContainer}>
                <View style={styles.dialog}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={onCancel} style={[styles.button, styles.cancelButton]}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onConfirm} style={[styles.button]}>
                            <Text style={styles.confirmButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    dialogContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    dialog: {
        width: '90%',
        paddingTop: 20,
        backgroundColor: 'white',
        borderRadius: 13,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        textAlign: 'center',
        color: '#000',
    },

    message: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20
    },

    buttonContainer: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#e5e5e5',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButton: {
        borderRightWidth: 1,
        borderColor: '#e5e5e5',
    },
    cancelButtonText: {
        color: '#007aff',
        fontSize: 16,
    },
    confirmButtonText: {
        color: '#007aff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default Dialog;