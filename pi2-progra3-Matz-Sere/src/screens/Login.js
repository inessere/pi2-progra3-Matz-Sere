import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import Register from "../screens/Register"
import Principal from "../screens/Principal"
import { db, auth } from '../firebase/config'

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state={
          Email:"",
          Password:"",
          error:""
        }
    }



    irARegister(){
        this.props.navigation.navigate('register')
    }

    /*login(email, pass){
        auth.signInWithEmailAndPassword(email, pass)
         .then((response) => {
             this.setState({loggedIn: true});
         })
         .catch(error => {
           this.setState({error: 'Credenciales inválidas.'})
         })
      }

    enviarForm(Email,Password){
      if(
        Email.includes("@") && Password.length>4
      ){
       
      auth.createUserWithEmailAndPassword(Email, Password)
      .then((user) => {
        if(user) {
          db.collection("users").add({
            owner: auth.currentUser.email,
            createdAt:Date.now(),
     
          })
          .then(
            ()=> this.props.navigation.navigate("principal")
          )
        }
      } )
      .catch(err => console.log("hubo un err en firebase", err))

 
        
      }
    }*/

    loginUser(Email, Password){
        if(Email.includes("@") && Password.length > 6){
            // Intentar iniciar sesión con las credenciales del usuario
            auth.signInWithEmailAndPassword(Email, Password)
                .then((response) => {
                    // Si el inicio de sesión es exitoso, navega a la página principal
                    this.props.navigation.navigate("principal")
                })
                .catch(error => {
                    // En caso de error, muestra un mensaje de error
                    this.setState({ error: 'Credenciales inválidas o error al iniciar sesión.' })
                })
        } else {
            this.setState({ error: 'Por favor, ingrese un email y contraseña válidos.' })
        }
    }

    render() {
        return (
          <View style={styles.container}>
            <View style={styles.formContainer}>
              <Text style={styles.title}>Iniciar sesión</Text>
    
              <TextInput
                  style={styles.input}
                  keyboardType='default'
                  placeholder='Ingresa tu Email'
                  onChangeText={(texto) => this.setState({ Email: texto, error:""})}
                  value={this.state.Email}
              />
              
              <TextInput
                  style={styles.input}
                  keyboardType='default'
                  placeholder='Ingresa tu contraseña'
                  onChangeText={(texto) => this.setState({ Password: texto, error:""}) }
                  value={this.state.Password}
                  secureTextEntry={true}
              />
              
              {this.state.error !== "" && 
                <Text style={styles.errorText}>{this.state.error}</Text>
              }
    
              <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.loginUser(this.state.Email, this.state.Password)}
              >
                  <Text style={styles.buttonText}>Iniciar sesión</Text>
              </TouchableOpacity>
            </View>
    
            <TouchableOpacity
                style={styles.registerLink}
                onPress={() => this.irARegister()}
            >
                <Text style={styles.registerText}>¿No tienes cuenta? Regístrate</Text>
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
      registerLink: {
        marginTop: 20,
      },
      registerText: {
        color: '#4CAF50',
        fontSize: 16,
        fontWeight: '500',
      }
    })