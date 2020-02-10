import React from 'react'
import axios from 'axios'

import BoardsPage from '../BoardsPage'
import CompanyDisplayPage from '../CompanyDisplayPage'

const DashboardPage = _ => {

  const [ state, setState ] = React.useState({
    isCompany: true
  })

  state.getLocalStorageItem = async function (key) {
    let storedItem = await new Promise( (resolve, reject) => {
      const item = JSON.parse(localStorage.getItem(key))
      item ? resolve(item) : reject(new Error(`localStorage for ${key} does not exist`))
    })

    return storedItem
  }

  state.getPage = _ => {
    state.getLocalStorageItem('uid')
      .then( uid => {

      axios.get(`/api/user/${uid}`)
        .then( ({ data }) => {
          console.log('axios.get is hit. user is...', data )
          data ? setState({ ...state, isCompany: false }) : setState({ ...state, isCompany: true })
        })
        .catch( e => console.error(e) )
      }) // end getLocalStorageItem.then
      .catch( e => console.error(e) ) 
  }

  React.useEffect( () => {

    state.getPage()
  
  }, [ ])

  return (
    <>
    { state.isCompany ? <CompanyDisplayPage /> : <BoardsPage /> }
    </>
  )

}

export default DashboardPage