import React from 'react'
import axios from 'axios'
import CompanyDisplay from '../../components/CompanyDisplay'
import Context from '../../utils/Context'

const CompanyDisplayPage = _ => {

  const [ state, setState ] = React.useState({
    title: '',
    photo: '',
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    location: '',
    timezone: '',
    isLoading: false
  })

  state.getProfile = _ => {

    // set isLoading to true so we can generate a loading page.
    setState({ ...state, isLoading: true})

    // get user info from DB
    axios.get(`/api/user/${localStorage.getItem('uid')}`)
      .then( ({data: user}) => {
        console.log('axios.get hit')
        setState({ // set the parameters in the page to data from mongoDb
          ...state,
          // photo: mUser.photo,
          name: user.company,
          email: user.email,
          phone: user.phone,
          address: user.location
        }) // end setState
      }) // end axios get
  } // end getProfile

  React.useEffect( () => {
    // on page load, get the profile
     state.getProfile()
   
  }, [])

  return (
    <Context.Provider value={state}>
      <CompanyDisplay />
    </Context.Provider>
  )
}

export default CompanyDisplayPage