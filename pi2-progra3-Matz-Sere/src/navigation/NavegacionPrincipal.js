import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import Register from '../screens/Register'
import Principal from '../screens/Principal'
import Login from "../screens/Login"
import NavegacionAnidada from './NavegacionAnidada'

const Stack = createNativeStackNavigator()

export default class NavegacionPrincipal extends Component {
  render() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='home' component={Home} options={{headerShown: false}} />
            <Stack.Screen name='login' component={Login} options={{headerShown: false}} />
            <Stack.Screen name='register' component={Register}  options={{headerShown: false}} />
            <Stack.Screen name='anidada' component={NavegacionAnidada}  options={{headerShown: false}} />
            <Stack.Screen name='principal' component={Principal}  options={{headerShown: false}} />
        </Stack.Navigator>
    )
  }
}