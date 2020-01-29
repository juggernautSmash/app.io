import React from 'react'
import './UserForm.css'
import { FormControl, InputLabel, Input, FormHelperText, Button } from '@material-ui/core'

const CompanyForm = _ => {
    return (
        <form id="UFS">
            <h2>User Sign-Up</h2>
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

export default UserForm