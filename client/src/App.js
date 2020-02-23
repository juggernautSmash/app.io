import React from 'react'
import { Container } from '@material-ui/core'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import firebase, { useAuth, FirebaseContext } from './utils/Auth'

// components
import HeaderBarPage from './pages/HeaderPage'
import FooterBarPage from './pages/FooterBarPage'
import EmployeeProfilePage from './pages/EmployeeProfilePage'
import CompanyProfilePage from './pages/CompanyProfilePage'
import BoardsPage from './pages/BoardsPage'
import LandingPage from './components/LandingPage'
import TableDisplayPage from './pages/TablePage'

function App(props) {

  const user = useAuth()

  return (
    <Container>
      <BrowserRouter>
        <FirebaseContext.Provider value={{ user, firebase }} >
          <HeaderBarPage />
          <Switch>
            <Route exact path="/" component={ LandingPage } {...props} />
            <Route exact path="/employee" component={EmployeeProfilePage} {...props} />
            <Route exact path="/company" component={CompanyProfilePage} {...props} />
            <Route exact path="/boards" component={BoardsPage} {...props} />
            <Route path="/boards/:boardId" component={TableDisplayPage} {...props} />
            <Route exact path="/tables" component={TableDisplayPage} {...props} />
          </Switch>
          {/* <BottomBarPage /> */}
        </FirebaseContext.Provider>
      </BrowserRouter>
    </Container>
  )

  
}

export default App
