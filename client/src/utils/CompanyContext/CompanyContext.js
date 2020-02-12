import React from 'react'

const CompanyContext = React.createContext({
  photoUrl: '',
  companyName: '',
  email: '',
  phone: '',
  address: '',
  profile: {},
  employees: [],
  isLoading: false,
  handleFileUpload: () => {},
  handleImageUpload: () => {},
  getProfile: () => {},
  getEmployees: () => {}
})

export default CompanyContext