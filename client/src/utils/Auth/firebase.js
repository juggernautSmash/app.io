import app from 'firebase/app'
import 'firebase/auth'

import firebaseConfig from './config'

class Firebase { // create a class called firebase
  constructor() {
    app.initializeApp(firebaseConfig) // initialize firebase
    this.auth = app.auth()
  }

  async register( email, password) {
    // create new user with email and password
    const newUser = await this.auth.createUserWithEmailAndPassword( email, password )
    // return the uid because that is all we need
    return newUser.user.uid
  }

  async login(email, password) {
    // login using firebase.
    const loggedUser = await this.auth.signInWithEmailAndPassword( email, password )
    // return the uid because that is all we need
    return loggedUser.user.uid
  }  

  async logout() {
    // logout user
    await this.auth.signOut();
  }
}

// create new instance of firebase
const firebase = new Firebase()

export default firebase