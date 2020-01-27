import React from 'react'
import './CompanyForm.css'
import { FormControl, InputLabel, Input, FormHelperText, Button } from '@material-ui/core'
import SignUpContext from '../../utils/SignUpContext'

const CompanyForm = _ => {

    const { name, email, address, phone, handleInputChange, handleSubmitButton } = React.useContext(SignUpContext)

    return (
        <form id="CFS">
            <h2 id="company-modal-title">Company Sign-Up</h2>
            <div>
                <FormControl>
                    <InputLabel htmlFor="name">Company Name</InputLabel>
                    <Input
                        id="name"
                        name="name"
                        aria-describedby="name-helper-text"
                        onChange={handleInputChange}
                        value={name}
                    />
                    <FormHelperText id="name-helper-text"></FormHelperText>
                </FormControl>
            </div>
            <div>
                <FormControl>
                    <InputLabel htmlFor="email">Company Email</InputLabel>
                    <Input
                        id="email"
                        name="email"
                        aria-describedby="email-helper-text"
                        onChange={handleInputChange}
                        value={email}
                    />
                    <FormHelperText id="email-helper-text"></FormHelperText>
                </FormControl>
            </div>
            <div>
                <FormControl>
                    <InputLabel htmlFor="address">Company Address</InputLabel>
                    <Input
                        id="address"
                        name="address"
                        aria-describedby="address-helper-text"
                        onChange={handleInputChange}
                        value={address}
                    />
                    <FormHelperText id="address-helper-text"></FormHelperText>
                </FormControl>
            </div>
            <div>
                <FormControl>
                    <InputLabel htmlFor="phone">Company Phone #</InputLabel>
                    <Input
                        id="phone"
                        name="phone"
                        aria-describedby="phone-helper-text"
                        onChange={handleInputChange}
                        value={phone}
                    />
                    <FormHelperText id="phone-helper-text"></FormHelperText>
                </FormControl>
            </div>
            <div>
                <Button onClick={handleSubmitButton}>
                    Submit
                </Button>
            </div>
        </form>
    )
}

export default CompanyForm