import React from 'react'
import NavBarPage from './pages/NavBarPage'
import FooterBar from './components/FooterBar'

import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

function App() {
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
