import React from 'react'
import './CompanyForm.css'
import { FormControl, InputLabel, Input, FormHelperText, Button } from '@material-ui/core'


const CompanyForm = _ => {
    return (
        <form id="CFS">
            <h2>Company Sign-Up</h2>
            <div>
                <FormControl>
                    <InputLabel htmlFor="name">Company Name</InputLabel>
                    <Input id="name" aria-describedby="name-helper-text" />
                    <FormHelperText id="name-helper-text"></FormHelperText>
                </FormControl>
            </div>
            <div>
                <FormControl>
                    <InputLabel htmlFor="address">Address</InputLabel>
                    <Input id="address" aria-describedby="address-helper-text" />
                    <FormHelperText id="address-helper-text"></FormHelperText>
                </FormControl>
            </div>
            <div>
                <FormControl>
                    <InputLabel htmlFor="contact">Company Contact</InputLabel>
                    <Input id="contact" aria-describedby="contact-helper-text" />
                    <FormHelperText id="contact-helper-text">Email</FormHelperText>
                </FormControl>
            </div>
            <div>
                <FormControl>
                    <InputLabel htmlFor="employess">Employees</InputLabel>
                    <Input id="employess" aria-describedby="employess-helper-text" />
                    <FormHelperText id="employess-helper-text"></FormHelperText>
                </FormControl>
            </div>
            <div>
                <Button>
                    Submit
                </Button>
            </div>
        </form>
    )
}

export default CompanyForm