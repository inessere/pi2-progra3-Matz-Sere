import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'


export default class Home extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate('anidada');
            }
        });
    }

    irARegister() {
        this.props.navigation.navigate('register')
    }

    irALogin() {
        this.props.navigation.navigate('login')
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>¡Bienvenido a nuestra app de recetas!</Text>
                <Text style={styles.description}>
                    Aquí puedes explorar miles de recetas, compartir tus propias creaciones y descubrir nuevas ideas para tu cocina.
                </Text>
                <Text style={styles.info}>
                    Únete ahora y comienza a inspirarte con la comunidad. ¡Regístrate o inicia sesión para acceder a todo el contenido!
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.irALogin()}
                >
                    <Text style={styles.buttonText}>Ir al login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.registerButton]}
                    onPress={() => this.irARegister()}
                >
                    <Text style={styles.buttonText}>Ir al register</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FAF3E0',
    },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#5C3D2E', 
        fontFamily: 'Arial', 
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
        color: '#6F4E37', 
        fontFamily: 'Arial',
    },
    info: {
        fontSize: 14,
        marginBottom: 20,
        textAlign: 'center',
        color: '#8B5A2B', 
        fontFamily: 'Arial',
    },
    button: {
        backgroundColor: '#A5D6A7', 
        paddingVertical: 8, 
        paddingHorizontal: 25,
        borderRadius: 20, 
        marginBottom: 10,
        alignItems: 'center',
        width: '70%',
        elevation: 3, 
    },
    registerButton: {
        backgroundColor: '#FFAB91', 
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 14, 
        fontWeight: '600',
        fontFamily: 'Arial',
    },
});
