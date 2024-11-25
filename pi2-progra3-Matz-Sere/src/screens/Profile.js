import { Text, View, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { db, auth } from "../firebase/config";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      userPosts: [],
      error: ""
    };
  }

  componentDidMount() {
    db.collection("users")
      .where("owner", "==", auth.currentUser.email)
      .onSnapshot(docs => {
        let userData = null;
        docs.forEach(doc => {
          userData = {
            id: doc.id,
            data: doc.data()
          };
        });

        this.setState({ userInfo: userData });
      });


    db.collection("posts")
      .where("owner", "==", auth.currentUser.email)
      .onSnapshot(docs => {
        let postsArray = [];
        docs.forEach(doc => {
          postsArray.push({
            id: doc.id,
            data: doc.data()
          });
        });

        this.setState({ userPosts: postsArray });
      });
  }

  deletePost(post) {
    db.collection("posts")
      .doc(post)
      .delete()
      .then(() => {
      })
      .catch(error => {
        this.setState({ error: 'Hubo un error' })
      })
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.props.navigation.navigate("home");
      })
      .catch(error => {
        this.setState({ error: 'Hubo un error' })
      })
  }


  render() {
    return (

      <View style={styles.container}>


        <Text style={styles.title}>Perfil del usuario 👤</Text>

        {
          this.state.userInfo ? (
            <View>
              <Text style={styles.info}>Nombre de usuario: {this.state.userInfo.data.username}</Text>
              <Text style={styles.info}>Email: {auth.currentUser.email}</Text>
              <Text style={styles.info}>Cantidad de posteos: {this.state.userPosts.length}</Text>
            </View>
          ) : ""

        }

        <Text style={styles.subtitle}>Posteos del usuario:</Text>
        {
          this.state.userPosts.length > 0 ?
            <FlatList
              data={this.state.userPosts}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) =>
                <View style={styles.post}>
                  <Text style={styles.postText}>{item.data.mensaje}</Text>

                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => this.deletePost(item.id)}
                  >
                    <Text style={styles.deleteButtonText}>Borrar</Text>
                  </TouchableOpacity>
                </View>
              }
            />
            :
            <Text>No hay posteos del usuario.</Text>

        }

        <TouchableOpacity style={styles.logoutButton} onPress={() => this.logout()}>
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </TouchableOpacity>
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
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#5C3D2E',
    textAlign: 'center',
    fontFamily: 'Georgia',
  },
  info: {
    fontSize: 16,
    color: '#5C3D2E',
    marginBottom: 10,
    fontFamily: 'Georgia',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#5C3D2E',
    fontFamily: 'Georgia',
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
  postText: {
    fontSize: 16,
    color: '#5C3D2E',
    marginBottom: 10,
    fontFamily: 'Georgia',
  },
  deleteButton: {
    padding: 10,
    backgroundColor: '#D89E8C',
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Arial',
  },
  logoutButton: {
    padding: 15,
    backgroundColor: '#A67D68',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  button: {
    backgroundColor: '#A67D68',
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
    width: '60%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  }
});


