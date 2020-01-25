import React from 'react'
import './UserForm.css'
import { FormControl, InputLabel, Input, FormHelperText, Button, Paper } from '@material-ui/core'

const UserForm = _ => {
    return (
    <Paper>
        <form id="UFS">
            <h2>User Sign-Up</h2>
            <div>
                <FormControl>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input id="email" aria-describedby="email-helper-text" />
                    <FormHelperText id="email-helper-text"></FormHelperText>
                </FormControl>
            </div>
            <div>
                <FormControl>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Input id="name" aria-describedby="name-helper-text" />
                    <FormHelperText id="name-helper-text"></FormHelperText>
                </FormControl>
            </div>
            <div>
                <FormControl>
                    <InputLabel htmlFor="position">Position</InputLabel>
                    <Input id="position" aria-describedby="position-helper-text" />
                    <FormHelperText id="position-helper-text"></FormHelperText>
                </FormControl>
            </div>
            <div>
                <FormControl>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input id="password" aria-describedby="password-helper-text" />
                    <FormHelperText id="password-helper-text"></FormHelperText>
                </FormControl>
            </div>
            <div>
                <FormControl>
                    <InputLabel htmlFor="phone">Phone</InputLabel>
                    <Input id="phone" aria-describedby="phone-helper-text" />
                    <FormHelperText id="phone-helper-text"></FormHelperText>
                </FormControl>
            </div>
            <div>
                <FormControl>
                    <InputLabel htmlFor="location">Location</InputLabel>
                    <Input id="location" aria-describedby="location-helper-text" />
                    <FormHelperText id="location-helper-text"></FormHelperText>
                </FormControl>
            </div>
            <div>
                <FormControl>
                    <InputLabel htmlFor="timezone">Timezone</InputLabel>
                    <Input id="timezone" aria-describedby="timezone-helper-text" />
                    <FormHelperText id="timezone-helper-text"></FormHelperText>
                </FormControl>
            </div>
            <div>
                <Button>
                    Submit
                </Button>
            </div>
        </form>
    </Paper>
    )
}

export default UserForm