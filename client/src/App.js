import React from 'react'
import NavBarPage from './pages/NavBarPage'
import FooterBar from './components/FooterBar'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase'

import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

function App() {
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

  class SignInScreen extends React.Component {
    render() {
      return (
        <div>
          <h1>My App</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
      );
    }
  }



  return (
    <BrowserRouter>
      <NavBarPage />
        <Switch>
        <Route exact path="/login" render={_ => <LoginPage />}>
        </Route>
        <Route exact path="/signup" render={_ => <SignUpPage/> } />
      </Switch>
      <FooterBar />
    </BrowserRouter>
  );
}

export default App
