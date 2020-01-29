import React from 'react'
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
    
    let mUser =  JSON.parse(localStorage.getItem('mUser'))

    setProfileState({ 
      ...profileState, 
      photo: mUser.photo,
      company: mUser.name,
      email: mUser.email,
      phone: mUser.phone,
      address: mUser.address,
      employees: mUser.user
   })


  }, [] )
  return (
    <ProfileContext.Provider value={profileState}>
      <CompanyDisplay />
    </ProfileContext.Provider>
  )

}

export default CompanyDisplayPage