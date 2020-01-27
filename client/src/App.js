import React from 'react'
import NavBarPage from './pages/NavBarPage'
import FooterBar from './components/FooterBar'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase'

import LandingPage from './components/LandingPage'
import SignUpPage from './pages/SignUpPage'
import CompanySignUpPage from './pages/CompanySignUpPage'
import UserSignUpPage from './pages/UserSignUpPage'
import LoginPage from './pages/LoginPage'
import UserLoginPage from './pages/UserLoginPage'
import CompanyLogin from './components/CompanyLogin'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

function App() {

  // class SignInScreen extends React.Component {
  //   render() {
  //     return (
  //       <div>
  //         <h1>My App</h1>
  //         <p>Please sign-in:</p>
  //         <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  //       </div>
  //     );
  //   }
  // }



  return (
    <BrowserRouter>
      <NavBarPage />
        <Switch>
        <Route exact path="/" render={ _ => <LandingPage />} />
        <Route exact path="/login" render={ _ => <LoginPage />} />
        <Route exact path="/signup" render={ _ => <SignUpPage/> } />
      </Switch>
      <FooterBar />
    </BrowserRouter>
  );
}

export default App
