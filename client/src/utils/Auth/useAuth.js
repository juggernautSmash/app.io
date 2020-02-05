import React from 'react'
import firebase from './firebase'

const useAuth = () => {
  const [ user, setUser ] = React.useState(null)

  React.useEffect( () => {
    const unsubscribe = firebase.auth.onAuthStateChanged( loggedUser => loggedUser ? setUser(loggedUser) : setUser(null))

    return () => unsubscribe()
  }, [ ])

  return user
}

export default useAuth