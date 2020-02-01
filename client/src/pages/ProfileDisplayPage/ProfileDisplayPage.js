import React from 'react'
import axios from 'axios'
import ProfileDisplay from '../../components/ProfileDisplay'
import ProfileContext from '../../utils/ProfileContext'

const ProfilePageDisplay = _ => {

  const [ profileState, setProfileState ] = React.useState({
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

  profileState.getLocalStorage = ( key ) => {
    return localStorage.getItem(key)
  }

  profileState.getProfile = _ => {
    let uid = JSON.parse(localStorage.getItem('uid'))
    axios.get(`/api/user/${uid}`)
      .then( ({data: user}) => {
        console.log('axios.get hit')
        setProfileState({ // set the parameters in the page to data from mongoDb
          ...profileState,
          title: user.title,
          // photo: mUser.photo,
          firstName: user.firstName,
          lastName: user.lastName,
          company: user.company,
          email: user.email,
          phone: user.phone,
          location: user.location,
          timezone: user.timezone
        }) // end setProfileState
      }) // end axios get
  } // end getProfile

  React.useEffect( () => {

    profileState.isLoading ? setTimeout( ()=> {console.log('3 second timeout')}, 3000 ) : profileState.getProfile()

    // Get user profile from mongoDb
   
  }, [])

  return (
    <ProfileContext.Provider value={profileState}>
      <ProfileDisplay />
    </ProfileContext.Provider>
  )
}

export default ProfilePageDisplay