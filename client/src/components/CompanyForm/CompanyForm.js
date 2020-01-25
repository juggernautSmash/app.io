import React from 'react'
import './CompanyForm.css'
import { FormControl, InputLabel, Input, FormHelperText, Button } from '@material-ui/core'


const CompanyForm = _ => {
    return (
        <form id="CFS">
            <h2>Company Sign-Up</h2>
            <p>
                <FormControl>
                    <InputLabel htmlFor="my-input">Company Name</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" />
                    <FormHelperText id="my-helper-text"></FormHelperText>
                </FormControl>
            </p>
            <p>
                <FormControl>
                    <InputLabel htmlFor="my-input">Address</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" />
                    <FormHelperText id="my-helper-text"></FormHelperText>
                </FormControl>
            </p>
            <p>
                <FormControl>
                    <InputLabel htmlFor="my-input">Company Contact</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" />
                    <FormHelperText id="my-helper-text">Email</FormHelperText>
                </FormControl>
            </p>
            <p>
                <FormControl>
                    <InputLabel htmlFor="my-input">Employee Emails</InputLabel>
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