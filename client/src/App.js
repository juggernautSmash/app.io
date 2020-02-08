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
import TableDisplayPage from './pages/TablePage'

function App(props) {

  const user = useAuth()

  return (
    <Container>
      <BrowserRouter>
        <FirebaseContext.Provider value={{ user, firebase }} >
          <NavPage />
          <Switch>
            <Route exact path="/" component={ user ? BoardsPage : LandingPage } {...props} />
            <Route exact path="/user" component={ProfileDisplayPage} {...props} />
            <Route exact path="/boards" component={BoardsPage} {...props} />
            <Route exact path="/tables" component={TableDisplayPage} {...props} />
          </Switch>
          <BottomBarPage />
        </FirebaseContext.Provider>
      </BrowserRouter>
    </Container>
  )

  
}

export default App
