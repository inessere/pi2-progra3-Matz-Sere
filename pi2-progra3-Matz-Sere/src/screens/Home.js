import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import Register from "../screens/Register"
import Login from "../screens/Login"

export default class Home extends Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log('props de la screen', this.props)
    } 

    irARegister(){
        this.props.navigation.navigate('register')
    }

    irALogin(){
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
        backgroundColor: '#f9f9f9'
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#333'
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
        color: '#555'
    },
    info: {
        fontSize: 14,
        marginBottom: 20,
        textAlign: 'center',
        color: '#777'
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: 'center',
        width: '80%',
    },
    registerButton: {
        backgroundColor: '#2196F3'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
});
