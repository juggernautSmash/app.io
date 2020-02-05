import React from 'react'
import { Container } from '@material-ui/core'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import firebase, { useAuth, FirebaseContext } from './utils/Auth'

// components
import NavPage from './pages/NavPage'
import BottomBarPage from './pages/BottomBarPage'
import ProfileDisplayPage from './pages/ProfileDisplayPage'
import BoardsPage from './pages/BoardsPage'
import LandingPage from './components/LandingPage'

function App() {

  const user = useAuth()

  return (
    <Container>
      <BrowserRouter>
        <FirebaseContext.Provider value={{ user, firebase }}>
          <NavPage />
          <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/user" component={ProfileDisplayPage} />
          <Route exact path="/boards" component={BoardsPage} />
          </Switch>
          <BottomBarPage />
        </FirebaseContext.Provider>
      </BrowserRouter>
    </Container>
  )

  
}

export default App
