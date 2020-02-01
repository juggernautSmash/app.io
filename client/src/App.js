import React from 'react'

import FooterBar from './components/FooterBar'
import LandingPage from './components/LandingPage'
import Dashboard from './components/Dashboard'

import NavBarPage from './pages/NavBarPage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import ProfileDisplayPage from './pages/ProfileDisplayPage'
import CompanyDisplayPage from './pages/CompanyDisplayPage/CompanyDisplayPage'
import BoardsPage from './pages/BoardsPage/BoardsPage'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <NavBarPage />
        <Switch>
          <Route exact path="/" render={ _ => <LandingPage />} />
          <Route exact path="/login" render={ _ => <LoginPage />} />
          <Route exact path="/signup" render={ _ => <SignUpPage /> } />
          <Route exact path="/dashboard" render={ _ => <Dashboard /> } />
          <Route exact path="/userprofile" render={ _ => <ProfileDisplayPage />} />
          <Route exact path="/companyprofile" render={ _ => <CompanyDisplayPage />} />
          <Route exact path="/boards" render={ _ => <BoardsPage />} />
      </Switch>
      <FooterBar />
    </BrowserRouter>
  )
}

export default App
