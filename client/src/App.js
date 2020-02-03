import React from 'react'
import { Container } from '@material-ui/core'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import firebase, { useAuth, FirebaseContext, PrivateRoute } from './utils/Auth'

// components
import NavPage from './pages/NavPage'
import BottomBarPage from './pages/BottomBarPage'
import ProfileDisplayPage from './pages/ProfileDisplayPage'
import BoardsPage from './pages/BoardsPage'
import LandingPage from './components/LandingPage'

function App(props) {

  const user = useAuth()

  return (
    <Container>
      <BrowserRouter>
        <FirebaseContext.Provider value={{ user, firebase }} >
          <NavPage {...props} />
          <Switch>
            <Route exact path="/" component={LandingPage} {...props} />
            <Route exact path="/user" component={ProfileDisplayPage} {...props} />
            <Route exact path="/boards" component={BoardsPage} {...props} />
          </Switch>
          <BottomBarPage {...props} />
        </FirebaseContext.Provider>
      </BrowserRouter>
    </Container>
  )

  
}

export default App
