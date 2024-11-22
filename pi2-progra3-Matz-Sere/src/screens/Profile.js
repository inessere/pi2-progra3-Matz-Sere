import { Text, View, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { db, auth } from "../firebase/config";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      userPosts: [],
      error:""
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
        this.props.navigation.navigate("login");
      })
      .catch(error => {
        this.setState({ error: 'Hubo un error' })
    })
  }

  irAPrincipal() {
    this.props.navigation.navigate('principal')
  }

  render() {
    return (
        
      <View style={styles.container}>

        <TouchableOpacity onPress={() => this.irAPrincipal()} style={styles.button}>
          <Text style={styles.buttonText}>Volver a la pagina principal</Text>
        </TouchableOpacity>
        
        <Text style={styles.title}>Perfil del Usuario</Text>

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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  post: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  postText: {
    fontSize: 16,
    marginBottom: 10,
  },
  deleteButton: {
    padding: 10,
    backgroundColor: '#f44336',
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 15,
    backgroundColor: '#2196F3',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#2196F3',
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
