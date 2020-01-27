import React from 'react'
import axios from 'axios'
import CompanyForm from '../../components/CompanyForm'
import SignUpContext from '../../utils/SignUpContext'

const CompanySignUp = () => {

  const [ signUpState, setSignUpState ] = React.useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })

  signUpState.handleInputChange = e => setSignUpState({ ...signUpState, [e.target.name]: e.target.value })

  signUpState.handleSubmitButton = e => {
    e.preventDefault()
    axios.post('/api/company', {
      name: signUpState.name,
      email: signUpState.email,
      phone: signUpState.phone,
      address: signUpState.address
    })
    console.log('Submit button pressed')
    console.log(`
    Company Name: ${signUpState.name}
    email: ${signUpState.email}
    address: ${signUpState.address}
    phone#: ${signUpState.phone}
    `)
  }

  return (
    <SignUpContext.Provider value={signUpState}>
      <CompanyForm />
    </SignUpContext.Provider>
  )
}

export default CompanySignUp