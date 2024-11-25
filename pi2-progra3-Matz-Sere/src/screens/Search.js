import React, { Component } from 'react';
import { db } from '../firebase/config';
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      searchInput: '',
      loader: true,
    };
  }

  componentDidMount() {

    db.collection('users').onSnapshot((docs) => {
      let usersArray = [];
      docs.forEach((doc) => {
        usersArray.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      this.setState({
        users: usersArray,
        loader: false,
      });

    });
  }

  render() {
    const { users, searchInput, loader } = this.state;


    const filteredUsers =
      searchInput.length > 0
        ? users.filter(
          (element) =>
            element.data.owner &&
            element.data.owner
              .toLowerCase()
              .includes(searchInput.toLowerCase())
        )
        : users;

    return (
      <View style={styles.container}>

        <TextInput
          style={styles.field}
          keyboardType="default"
          placeholder="Ingresa email..."
          onChangeText={(text) => this.setState({ searchInput: text })}
        />

        {loader ? (
          <Text style={styles.texto}>Cargando usuarios...</Text>
        ) : filteredUsers.length > 0 ? (

          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.userItem}>
                <Text style={styles.userText}>{item.data.owner}</Text>
              </View>
            )}
          />
        ) : (

          <Text style={styles.texto}>El email no existe. Por favor, prueba con otro.</Text>
        )}


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
  field: {
    height: 40,
    borderColor: '#C7B299',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    fontFamily: 'Georgia',
  },
  texto: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    color: '#5C3D2E',
    fontFamily: 'Georgia',
  },
  userItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#C7B299',
    backgroundColor: '#F5ECE0',
    marginBottom: 10,
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
  userText: {
    fontSize: 16,
    color: '#5C3D2E',
    fontFamily: 'Georgia',
  },
  button: {
    backgroundColor: '#A67D68',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
});

export default Search;
