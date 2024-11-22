import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'

export default class NuevoPost extends Component {
    constructor(props){
        super(props)
        this.state={
          Mensaje:"",
          error:""
        }
    }

    enviarForm(Mensaje){

          db.collection("posts").add({
            owner: auth.currentUser.email,
            createdAt:Date.now(),
            mensaje:Mensaje
          })
          .then(
            ()=> this.props.navigation.navigate("principal")
          )
          .catch((err) => console.log(err));
        
        
    }

    render() {
      return (
          <View style={styles.container}>
              <Text style={styles.title}>Crear un Nuevo Post</Text>

              <TextInput
                  style={styles.input}
                  keyboardType='default'
                  placeholder='Ingresa tu comentario'
                  onChangeText={(texto) => this.setState({ Mensaje: texto, error:""})}
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
      backgroundColor: '#f4f4f4',
      justifyContent: 'center'
  },
  title: {
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
      color: '#333'
  },
  input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 10,
      marginBottom: 15,
      backgroundColor: '#fff',
      fontSize: 16
  },
  errorText: {
      color: 'red',
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 10
  },
  button: {
      backgroundColor: '#4CAF50',
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10
  },
  buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold'
  }
})