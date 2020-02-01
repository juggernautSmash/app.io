import React from 'react'
import axios from 'axios'
import CompanyDisplay from '../../components/CompanyDisplay'
import ProfileContext from '../../utils/ProfileContext'

const CompanyDisplayPage = _ => {

  const [ profileState, setProfileState ] = React.useState({
    photo: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    employees: []
  })

  React.useEffect( () => {
    
    // Get user profile from mongoDb
    let uid = JSON.parse(localStorage.getItem('uid'))
    axios.get(`/api/user/${uid}`)
      .then( ({data: company}) => {
        console.log('axios.get hit')
        setProfileState({
          ...profileState,
          // photo: mUser.photo,
          name: company.name,
          email: company.email,
          phone: company.phone,
          address: company.address
        }) // end setProfileState
      }) // end axios get
  }, [] )
  return (
    <ProfileContext.Provider value={profileState}>
      <CompanyDisplay />
    </ProfileContext.Provider>
  )

}

export default CompanyDisplayPage