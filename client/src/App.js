import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

//Components
import FooterBar from './components/FooterBar'
import LandingPage from './components/LandingPage'
import Dashboard from './components/Dashboard'

// Pages
import NavBarPage from './pages/NavBarPage'
import SignUpPage from './pages/SignUpPage'
import CompanySignUpPage from './pages/CompanySignUpPage'
import UserSignUpPage from './pages/UserSignUpPage'
import LoginPage from './pages/LoginPage'
import CompanyLoginPage from './pages/CompanyLoginPage'
import UserLoginPage from './pages/UserLoginPage'
import ProfileDisplayPage from './pages/ProfileDisplayPage'
import CompanyDisplayPage from './pages/CompanyDisplayPage/CompanyDisplayPage'

import firebase, { useAuth, FirebaseContext } from './utils/Auth'

function App() {

  const user = useAuth()

  return (
    <BrowserRouter>
      <FirebaseContext.Provider value={ user, firebase }>
        <NavBarPage />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/login/company" component={CompanyLoginPage} />
          <Route exact path="/login/employee" component={UserLoginPage} />
          <Route exact path="/signup" component={SignUpPage} />
          <Route exact path='/signup/company' component={ CompanySignUpPage } />
          <Route exact path='/signup/employee' component={ UserSignUpPage } />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/userprofile" component={ProfileDisplayPage} />
          <Route exact path="/companyprofile" component={CompanyDisplayPage} />
        </Switch>
        <FooterBar />
      </FirebaseContext.Provider>
    </BrowserRouter>
  )
}

export default App
