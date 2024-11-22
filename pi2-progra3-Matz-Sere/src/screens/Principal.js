import { Text, View, TouchableOpacity, FlatList, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import Likes from '../Components/Likes'
import { db } from "../firebase/config"

export default class Principal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      todosLosPosteos: []
    }
  }

  irANuevoPost() {
    this.props.navigation.navigate('nuevopost')
  }

  irAProfile() {
    this.props.navigation.navigate("profile")
  }

  componentDidMount() {
    db.collection("posts").orderBy("createdAt", "desc").limit(10).onSnapshot(docs => {
      let arrDocs = []
      docs.forEach((doc) => {
        arrDocs.push({
          id: doc.id,
          data: doc.data()
        })
      })
      this.setState({
        todosLosPosteos: arrDocs
      })
    })
  }

  filtrarPosteos() {
    const { todosLosPosteos, textoBusqueda } = this.state;
    if (!textoBusqueda.trim()) return todosLosPosteos; // Si no hay texto, devuelve todo
    return todosLosPosteos.filter(post =>
      post.data.owner.toLowerCase().includes(textoBusqueda.toLowerCase())
    );
  }

  render() {
    return (
      <View style={styles.container}>

        <TouchableOpacity onPress={() => this.irAProfile()} style={styles.button}>
          <Text style={styles.buttonText}> Mi perfil</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Todos los Posteos</Text>
        <FlatList
          data={this.state.todosLosPosteos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) =>
            <View style={styles.postContainer}>
              <Likes item={item} navigation={this.props.navigation} />

            </View>
          }
        />
        <TouchableOpacity onPress={() => this.irANuevoPost()} style={styles.button}>
          <Text style={styles.buttonText}>Crear publicación</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  postContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  },
  owner: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8
  },
  message: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});