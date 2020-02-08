import React from 'react'
import axios from 'axios'
import ProfileDisplay from '../../components/ProfileDisplay'
import Context from '../../utils/Context'
import firebase from '../../utils/Auth'

const ProfileDisplayPage = props => {

  const [ state, setState ] = React.useState({
    title: '',
    photoUrl: '',
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    location: '',
    timezone: '',
    isLoading: false
  })

  state.getLocalStorageItem = async function (key) {
    let storedItem = await new Promise( (resolve, reject) => {
      const item = JSON.parse(localStorage.getItem(key))
      item ? resolve(item) : reject(new Error(`localStorage for ${key} does not exist`))
    })

    return storedItem
  }

  // get user info
  state.getProfile = _ => {

    // set isLoading to true so we can generate a loading page.
    setState({ ...state, isLoading: true})

    // get user info from DB
    state.getLocalStorageItem('uid')
      .then( uid => {
        console.log('getProfile _id is', uid)
        
        axios.get(`/api/user/${uid}`)
        .then( ({data: user}) => {
          console.log('axios.get hit', user)
          setState({ // set the parameters in the page to data from mongoDb
            ...state,
            title: user.title,
            photoUrl: user.photoUrl,
            firstName: user.firstName,
            lastName: user.lastName,
            company: user.company,
            email: user.email,
            phone: user.phone,
            location: user.location,
            timezone: user.timezone
          }) // end setState
        }) // end axios .then
        .catch( e => console.error(e) ) // axios catch
      }) // end getLocalStorageItem.then
      .catch( e => console.error(e) //getLocalStorageItem catch
  } // end getProfile

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
              axios.put(`/api/users/${id}`, { photoUrl: url })
                .then( r => console.log('profile axios hit. response... ', r ))
            })
        })
    } //end if
  }

  React.useEffect( () => {

    // on page load, get the profile
     state.getProfile()
   
  }, [])

  return (
    <Context.Provider value={state}>
      <ProfileDisplay />
    </Context.Provider>
  )
}

export default ProfileDisplayPage
