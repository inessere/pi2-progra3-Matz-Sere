import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import Login from "../screens/Login"


export default class Register extends Component {
    constructor(props){
        super(props)
        this.state={
          Email:"",
          Username:"",
          Password:"",
          error:""
        }
    }

    irAlLogin(){
        this.props.navigation.navigate('login')
    }

    enviarForm(Email,Username,Password){
      if(
        Email.includes("@") && Username.length>1 && Password.length>6 
      ){
      
      auth.createUserWithEmailAndPassword(Email, Password)
      .then((user) => {
        if(user) {
          db.collection("users").add({
            owner: auth.currentUser.email,
            createdAt:Date.now(),
            username:Username
          })
          .then(
            ()=> this.props.navigation.navigate("login")
          )
        }
      } )
      .catch(error => {
        this.setState({ error: 'Hubo un error al registrarse. Verifique los datos ingresados.' })
    })
    } else {
    // Validar los datos del formulario
    this.setState({ error: 'Por favor, ingrese un email, nombre y contraseña válidos (mínimo 7 caracteres).' })
    }
    }

    render() {
        return (
          <View style={styles.container}>
            <View style={styles.formContainer}>
              <Text style={styles.title}>Regístrate</Text>
    
              <TextInput
                  style={styles.input}
                  keyboardType='email-address'
                  placeholder='Ingresa tu Email'
                  onChangeText={(texto) => this.setState({ Email: texto, error: "" })}
                  value={this.state.Email}
              />
    
              <TextInput
                  style={styles.input}
                  keyboardType='default'
                  placeholder='Ingresa tu nombre'
                  onChangeText={(texto) => this.setState({ Username: texto, error: "" })}
                  value={this.state.Username}
              />
    
              <TextInput
                  style={styles.input}
                  keyboardType='default'
                  placeholder='Ingresa tu contraseña'
                  onChangeText={(texto) => this.setState({ Password: texto, error: "" })}
                  value={this.state.Password}
                  secureTextEntry={true}
              />
    
              {this.state.error !== "" && 
                <Text style={styles.errorText}>{this.state.error}</Text>
              }
    
              <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.enviarForm(this.state.Email, this.state.Username, this.state.Password)}
              >
                  <Text style={styles.buttonText}>Registrarse</Text>
              </TouchableOpacity>
            </View>
    
            <TouchableOpacity
                style={styles.loginLink}
                onPress={() => this.irAlLogin()}
            >
                <Text style={styles.loginText}>¿Ya tienes cuenta? Inicia sesión</Text>
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
        backgroundColor: '#f7f7f7',
        padding: 20,
      },
      formContainer: {
        backgroundColor: '#ffffff',
        padding: 30,
        borderRadius: 10,
        width: '100%',
        maxWidth: 400,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
        alignItems: 'center',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
      },
      input: {
        height: 45,
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 15,
        paddingLeft: 10,
        borderRadius: 8,
        fontSize: 16,
      },
      button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 8,
        marginTop: 10,
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
      },
      errorText: {
        color: 'red',
        marginBottom: 15,
      },
      loginLink: {
        marginTop: 20,
      },
      loginText: {
        color: '#4CAF50',
        fontSize: 16,
        fontWeight: '500',
      }
    })