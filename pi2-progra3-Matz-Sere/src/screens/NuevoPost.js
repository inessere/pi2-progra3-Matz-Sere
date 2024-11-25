import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'

export default class NuevoPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Mensaje: "",
            error: ""
        }
    }

    goToAnidada() {
        this.props.navigation.navigate('anidada')
    }

    enviarForm(Mensaje) {

        db.collection("posts").add({
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            mensaje: Mensaje,
            arrMeGusta: []
        })
            .then(() => {

                this.setState({ Mensaje: "" });
                this.props.navigation.navigate("principal");
            })
            .catch((err) => {
                console.log(err);
            });
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Crear un Nuevo Post</Text>

                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='Ingresa tu receta'
                    onChangeText={(texto) => this.setState({ Mensaje: texto, error: "" })}
                    value={this.state.Mensaje}
                />

                {this.state.error !== "" &&
                    <Text style={styles.errorText}>
                        {this.state.error}
                    </Text>
                }

                <TouchableOpacity
                    onPress={() => this.enviarForm(this.state.Mensaje)}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Publicar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ECE2D0',
        justifyContent: 'center'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#5C3D2E',
        fontFamily: 'Georgia',
    },
    input: {
        borderWidth: 1,
        borderColor: '#C7B299',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
        fontSize: 16,
        fontFamily: 'Georgia',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#A67D68',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Arial',
    }
});