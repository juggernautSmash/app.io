import React from 'react'
import './UserForm.css'
import { FormControl, InputLabel, Input, FormHelperText, Button } from '@material-ui/core'

<script src="https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js"></script>

<script src="https://www.gstatic.com/firebasejs/7.7.0/firebase-analytics.js"></script>

<script>

        // Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyBApRnJ1RfuBN8T7xLi2jeDF19v3VDfkEY",
    authDomain: "app-io-f6252.firebaseapp.com",
    databaseURL: "https://app-io-f6252.firebaseio.com",
    projectId: "app-io-f6252",
    storageBucket: "app-io-f6252.appspot.com",
    messagingSenderId: "436155669423",
    appId: "1:436155669423:web:c92be876535e3eb73d2d5a",
    measurementId: "G-PEVS3L4YPC"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

</script>


const CompanyForm = _ => {
    return (
        <form id="UFS">
            <h2>Company Sign-Up</h2>
            <p>
                <FormControl>
                    <InputLabel htmlFor="my-input">User Email</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" />
                    <FormHelperText id="my-helper-text"></FormHelperText>
                </FormControl>
            </p>
            <p>
                <FormControl>
                    <InputLabel htmlFor="my-input">Name</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" />
                    <FormHelperText id="my-helper-text"></FormHelperText>
                </FormControl>
            </p>
            <p>
                <FormControl>
                    <InputLabel htmlFor="my-input">Position</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" />
                    <FormHelperText id="my-helper-text"></FormHelperText>
                </FormControl>
            </p>
            <p>
                <FormControl>
                    <InputLabel htmlFor="my-input">Password</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" />
                    <FormHelperText id="my-helper-text"></FormHelperText>
                </FormControl>
            </p>
            <p>
                <FormControl>
                    <InputLabel htmlFor="my-input">Phone</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" />
                    <FormHelperText id="my-helper-text"></FormHelperText>
                </FormControl>
            </p>
            <p>
                <FormControl>
                    <InputLabel htmlFor="my-input">Location</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" />
                    <FormHelperText id="my-helper-text"></FormHelperText>
                </FormControl>
            </p>
            <p>
                <FormControl>
                    <InputLabel htmlFor="my-input">Timezone</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" />
                    <FormHelperText id="my-helper-text"></FormHelperText>
                </FormControl>
            </p>
            <p>
                <Button>
                    Submit
                </Button>
            </p>
        </form>
    )
}

export default CompanyForm