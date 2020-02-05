import React from 'react'
import useAuth from './useAuth'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component, ...rest }) => { // build the API similar to react-router-dom's Router API

  const user = useAuth()

  console.log('Private user compoent. user is...', user)
  console.log('...rest is ', rest)

  return (

    <Route { ...rest} render={ props => user ?  component : <Redirect to={ { pathname: '/', state: { from: props.location} } } /> } />
  )

}

export default PrivateRoute