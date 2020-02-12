import React from 'react'
import axios from 'axios'
import CompanyDisplay from '../../components/CompanyDisplay'
import CompanyContext from '../../utils/CompanyContext'
import firebase from '../../utils/Auth'

const CompanyDisplayPage = _ => {

  const [ state, setState ] = React.useState({
    photoUrl: '',
    companyName: '',
    email: '',
    phone: '',
    address: '',
    profile: {},
    employees: [],
    isLoading: false
  })

  state.handleFileUpload = _ => document.getElementById('imgInput').click()

  state.handleImageUpload = e => {
    console.log('handleUploadImage is running')
    //e.preventDefault()
    if(e.target.files[0]){
      const image = e.target.files[0]

      firebase.storage
        .ref(`images/${image.name}`)
        .put(image)
        .then( data => {
          data.ref.getDownloadURL()
            .then( url => {
              setState({ ...state, photoUrl: url})
              let id = JSON.parse(localStorage.getItem('user'))._id
              axios.put(`/api/company/${id}`, { photoUrl: url })
                .then( r => console.log('profile axios hit. response... ', r ))
            })
        })
    } //end if
  }

 // store to localStorage
  state.addLocalStorage = async function (key, value) {
    console.log(`Putting key "${key}" in localStorage with value`, value)

    let storedItem = await new Promise( (resolve, reject) => {
      localStorage.setItem(key, JSON.stringify(value))
      const item = JSON.parse(localStorage.getItem(key))
      item ? resolve(item) : reject(new Error(`localStorage for ${key} does not exist`))
    })

    return storedItem
  }

  //get date from localStorage
  state.getLocalStorageItem = async function (key) {
    let storedItem = await new Promise( (resolve, reject) => {
      const item = JSON.parse(localStorage.getItem(key))
      item ? resolve(item) : reject(new Error(`localStorage for ${key} does not exist`))
    })

    return storedItem
  }

  state.getProfile = _ => {
    setState({ ...state, isLoading: true })

    state.getLocalStorageItem('user')
    .then( dBprofile => {

      let employees = []

      let profile = {
        photoUrl: dBprofile.photoUrl,
        companyName: dBprofile.companyName,
        email: dBprofile.email,
        phone: dBprofile.phone,
        address: dBprofile.address
      }

      dBprofile.employees.forEach( employee => {
        console.log('getting the employee info for employee id: ', employee)
        axios.get(`/api/employees/${employee}`)
        .then( ({data}) => {
          console.log('employee data is ', data)
          let payload = {
            photoUrl: data.photoUrl,
            title: data.title,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone
          }
  
          employees.push(payload)
        })
        .catch( e => console.error('error getting employee data', e))
      }) // end forEach

      setTimeout( () =>{ 
        setState({ ...state, profile, employees, isLoading: false})
       }, 5000)

    })
    .catch( e => console.error('Error getting user from storage', e))
      
  } // end getProfile
  React.useEffect( () => {

    //on page load, get the profile
    state.getProfile()
    
  }, [ ])

  return (
    <CompanyContext.Provider value={state}>
      <CompanyDisplay />
    </CompanyContext.Provider>
  )
}

export default CompanyDisplayPage