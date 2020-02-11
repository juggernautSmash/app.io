import React from 'react'
import axios from 'axios'
import CompanyDisplay from '../../components/CompanyDisplay'
import Context from '../../utils/Context'
import firebase from '../../utils/Auth'

const CompanyDisplayPage = _ => {

  const [ state, setState ] = React.useState({
    photoUrl: '',
    companyName: '',
    email: '',
    phone: '',
    address: '',
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

    console.log('getting company profile')
    // set isLoading to true so we can generate a loading page.
    setState({ ...state, isLoading: true})

    state.getLocalStorageItem('uid')
      .then ( uid => {

        // get user info from DB
        console.log('uid from localStorage is...', uid)
        axios.get(`/api/company/${uid}`)
        .then( ({data: user}) => {
          console.log('company axios.get hit', user)
          setState({ // set the parameters in the page to data from mongoDb
            ...state,
            photoUrl: user.photoUrl,
            companyName: user.companyName,
            email: user.email,
            phone: user.phone,
            address: user.address
          }) // end setState
        }) // end axios get
        .catch( e => console.error(e) )
      })
      .catch( e => console.error(e) )
      
  } // end getProfile

  state.getEmployees = employees => {

    let employeesInfo = []

    state.addLocalStorage('employees', employees)
      .then( users => {

        users.forEach( userId => {
          axios.get(`/api/users/${userId}`)
          .then( ({data}) => { 
            console.log('company users...', data )
            let payload = {
              photoUrl: data.photoUrl,
              title: data.title,
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              phone: data.phone
            }
            
            employeesInfo.push(payload)
            setState({ ...state, employees: employeesInfo})
          })
          .catch( e => console.error('error getting employess', e))
        }) //end forEach

      })
      .catch( e => console.error('error adding employess to storage', e))

  } // end getEmployees

  React.useEffect( () => {

    // on page load, get the profile
     state.getProfile()
    
    state.getLocalStorageItem('user')
    .then( ({employees}) => {
      state.getEmployees(employees)
    })
    .catch(e => console.error('error getting company info for employees', e))
    
  }, [ ])

  return (
    <Context.Provider value={state}>
      <CompanyDisplay />
    </Context.Provider>
  )
}

export default CompanyDisplayPage