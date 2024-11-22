import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { db, auth } from "../firebase/config";

export default class Likes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes:0,
      meGusta: false
    };
  }

  // componentDidMount() {
  //   this.comprobarMeGusta(this.props.item.id);
  // } 
  // comprobarMeGusta(id) {
  //   db.collection("posts").doc(id).get()
  //     .then((doc) => {
  //       if (doc.exists) {
  //         const data = doc.data();
  //         // Verificamos si el email del usuario está en el array de "likes"
  //         if (data.arrMeGusta && data.arrMeGusta.includes(auth.currentUser.email)) {
  //           this.setState({
  //             meGusta: true,
  //             likes: data.arrMeGusta.length
  //           });
  //         } else {
  //           this.setState({
  //             meGusta: false,
  //             likes: data.arrMeGusta ? data.arrMeGusta.length : 0
  //           });
  //         }
  //       }
  //     });
  // }

  actualizarMeGusta(idDocumento) {
    db.collection("posts").doc(idDocumento).update({
      arrMeGusta: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
    })
      .then(() => {
        this.setState({ meGusta: true,
          likes:this.state.likes + 1
         });
      });
  }

  yaNoMeGusta(idDocumento) {
    db.collection("posts").doc(idDocumento).update({
      arrMeGusta: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email),
    })
      .then(() => {
        this.setState({ meGusta: false,
          likes:this.state.likes - 1
         });
      });
  }


  render() {
    return (
      <View style={styles.container}>

        <TouchableOpacity onPress={() => this.props.navigation.navigate("profile")}>
          <Text style={styles.ownerText}>{this.props.item.data.owner}</Text>
        </TouchableOpacity>

        <Text style={styles.messageText}>{this.props.item.data.mensaje}</Text>
        <h6> Cantidad de likes:
          {Array.isArray(this.props.item.data.arrMeGusta)
            ? this.props.item.data.arrMeGusta.length : 0}</h6>


        {
          this.state.meGusta ?
            (
              <TouchableOpacity
                onPress={() => this.yaNoMeGusta(this.props.item.id)}
                style={styles.btn2}
              >
                <Text style={styles.btnText}>Ya no me gusta</Text>
              </TouchableOpacity>
            )
            :
            (
              <TouchableOpacity
                onPress={() => this.actualizarMeGusta(this.props.item.id)}
                style={styles.btn}
              >
                <Text style={styles.btnText}>Me gusta</Text>
              </TouchableOpacity>
            )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd"
  },
  ownerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5
  },
  messageText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10
  },
  btn: {
    padding: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    alignItems: "center",
  },
  btn2: {
    padding: 10,
    backgroundColor: "#f44336",
    borderRadius: 5,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 14
  }
});