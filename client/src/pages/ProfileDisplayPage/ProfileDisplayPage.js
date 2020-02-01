import React from 'react'
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

  React.useEffect( () => {

    
    let mUser = JSON.parse(localStorage.getItem('mUser'))

    setProfileState({
      ...profileState,
      title: mUser.title,
      // photo: mUser.photo,
      firstName: mUser.firstName,
      lastName: mUser.lastName,
      company: mUser.company,
      email: mUser.email,
      phone: mUser.phone,
      location: mUser.location,
      timezone: mUser.timezone
    })
  }, [])

  return (
    <ProfileContext.Provider value={profileState}>
      <ProfileDisplay />
    </ProfileContext.Provider>
  )

}

export default ProfilePageDisplay