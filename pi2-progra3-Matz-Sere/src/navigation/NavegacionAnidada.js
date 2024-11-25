import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Profile from '../screens/Profile'
import Search from '../screens/Search'
import Principal from '../screens/Principal'
import NuevoPost from '../screens/NuevoPost'

const Tab = createBottomTabNavigator()


export default class NavegacionAnidada extends Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name='principal' component={Principal}
          options={{
            headerShown: false,
            tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />
          }} />
        <Tab.Screen
          name='nuevopost' component={NuevoPost}
          options={{
            headerShown: false,
            tabBarIcon: () => <FontAwesome name="plus" size={24} color="black" />
          }} />
        <Tab.Screen
          name='profile' component={Profile}
          options={{
            headerShown: false,
            tabBarIcon: () => <FontAwesome name="user" size={24} color="black" />
          }} />
        <Tab.Screen
          name='search' component={Search}
          options={{
            headerShown: false,
            tabBarIcon: () => <FontAwesome name="search" size={24} color="black" />
          }} />
      </Tab.Navigator>
    )
  }
}