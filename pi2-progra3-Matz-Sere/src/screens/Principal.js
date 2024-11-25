import { Text, View, FlatList, StyleSheet } from 'react-native'
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

  goToAnidada() {
    this.props.navigation.navigate("anidada")
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
        .then(
          () => this.props.navigation.navigate('anidada')
        )
    })
  }


  render() {
    return (
      <View style={styles.container}>


        <Text style={styles.title}>Todos los posteos</Text>
        <FlatList
          data={this.state.todosLosPosteos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) =>
            <View style={styles.postContainer}>
              <View style={styles.post}>
                <Likes item={item} />

              </View>
            </View>
          }
        />


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ECE2D0',
  },
  post: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#F5ECE0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C7B299',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    padding: 20,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#5C3D2E',
    fontFamily: 'Georgia',
  },
  postContainer: {
    backgroundColor: '#F5ECE0',
    padding: 15,
    borderColor: '#C7B299',
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.5,
    elevation: 3,
  },
  button: {
    backgroundColor: '#A67D68',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    marginTop: 15,
    alignItems: 'center',
    width: '60%',
    elevation: 3,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
});