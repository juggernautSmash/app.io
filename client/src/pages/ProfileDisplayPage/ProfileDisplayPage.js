import React from 'react'
import axios from 'axios'
import ProfileDisplay from '../../components/ProfileDisplay'
import Context from '../../utils/Context'

const ProfileDisplayPage = _ => {

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

  // get user info
  state.getProfile = _ => {

    // set isLoading to true so we can generate a loading page.
    setState({ ...state, isLoading: true})

    // get user info from DB
    axios.get(`/api/user/${localStorage.getItem('uid')}`)
      .then( ({data: user}) => {
        console.log('axios.get hit')
        setState({ // set the parameters in the page to data from mongoDb
          ...state,
          title: user.title,
          // photo: mUser.photo,
          firstName: user.firstName,
          lastName: user.lastName,
          company: user.company,
          email: user.email,
          phone: user.phone,
          location: user.location,
          timezone: user.timezone
        }) // end setState
      }) // end axios .then
      .catch( error => console.log(error) )
  } // end getProfile

  React.useEffect( () => {

    // on page load, get the profile
     state.getProfile()
   
  }, [])

  return (
    <Context.Provider value={state}>
      <ProfileDisplay />
    </Context.Provider>
  )
}

export default ProfileDisplayPage