import React from 'react'

const ProfileContext = React.createContext({
  uid: '',
  title: '',
  photo: '',
  firstName: '',
  lastName: '',
  company: '',
  email: '',
  phone: '',
  location: '',
  timezone: '',
  address: '',
  contact: '',
  employees: [],
  getEmployees: () => {}
})

export default ProfileContext