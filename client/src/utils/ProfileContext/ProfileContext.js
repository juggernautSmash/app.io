import React from 'react'

const ProfileContext = React.createContext({
  title: '',
  photo: '',
  firstName: '',
  lastName: '',
  companyName: '',
  email: '',
  phone: '',
  location: '',
  timezone: '',
  companyName: '',
  address: '',
  contact: ''
})

export default ProfileContext