import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'

firebase.initializeApp({
  apiKey: "AIzaSyBApRnJ1RfuBN8T7xLi2jeDF19v3VDfkEY",
  authDomain: "app-io-f6252.firebaseapp.com",
  databaseURL: "https://app-io-f6252.firebaseio.com",
  projectId: "app-io-f6252",
  storageBucket: "app-io-f6252.appspot.com",
  messagingSenderId: "436155669423",
  appId: "1:436155669423:web:c92be876535e3eb73d2d5a",
  measurementId: "G-PEVS3L4YPC"
})

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/signedIn',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ]
}

export default firebase