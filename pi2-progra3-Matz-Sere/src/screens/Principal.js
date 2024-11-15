import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import Login from "../screens/Login"
import Register from "../screens/Register"

export default class Principal extends Component {

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
      <View>
        <Text> FUNCIONA ESTO VA A SER LA PAGINA PRINCIPAL UNA VEZ QUE EL USUARIO YA ENTRÓ </Text>

      </View>
    )
  }
}