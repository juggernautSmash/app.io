import React from 'react'
import { green } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import {
    FormControl, InputLabel, Input, FormHelperText, Button,
    InputAdornment, IconButton, CircularProgress
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import './CompanyForm.css'
import Context from '../../utils/Context'

const useStyles = makeStyles(theme => ({
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    }
}))

const CompanyForm = _ => {

    const styles = useStyles()

    const { 
        companyName,
        email, 
        phone, 
        address,
        showPassword,
        password, 
        verifyPassword, 
        errors, 
        isLoading,
        handleBlur,
        handleInputChange, 
        handleShowPassword, 
        handleMouseDownPassword,
        handleSubmitCompanySignUp,
        displayError,
        clearErrors
    } = React.useContext(Context)

    return (
        <form id="CFS">
            <h2 id="company-modal-title">Company Sign-Up</h2>
            <div>
                <FormControl>
                    <InputLabel htmlFor="companyName">Company Name</InputLabel>
                    <Input
                        id="companyName"
                        name="companyName"
                        aria-describedby="companyName-helper-text"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        onClick={clearErrors}
                        value={companyName}
                    />
                    <FormHelperText id="companyName-helper-text">
                        {/* some text */}
                    </FormHelperText>
                </FormControl>
            </div>
            <div>
                <FormControl>
                    <InputLabel htmlFor="email">Company Email</InputLabel>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        aria-describedby="email-helper-text"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        onClick={clearErrors}
                        value={email}
                        error={
                            errors.some(e => (e.message.toLowerCase().includes('email')) ? true : false)
                        }
                    />
                    <FormHelperText id="email-helper-text">
                        {
                            errors.some(e => (e.message.toLowerCase().includes('email'))) ? displayError(errors) : ''
                        }
                    </FormHelperText>
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
                        onBlur={handleBlur}
                        onClick={clearErrors}
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
                        type="tel"
                        aria-describedby="phone-helper-text"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        onClick={clearErrors}
                        value={phone}
                    />
                    <FormHelperText id="phone-helper-text"></FormHelperText>
                </FormControl>
            </div>
            <div>
                <FormControl>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        id="password"
                        name="password"
                        aria-describedby="password-helper-text"
                        type={showPassword ? 'text' : 'password'}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        onClick={clearErrors}
                        value={password}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        error={
                            errors.some(e => (e.message.toLowerCase().includes('password')) ? true : false)
                        }
                    />
                    <FormHelperText id="password-helper-text">
                    {
                            errors.some(e => (e.message.toLowerCase().includes('password'))) ? displayError(errors) : ''
                        }
                    </FormHelperText>
                </FormControl>
            </div>
            <div>
                <FormControl>
                    <InputLabel htmlFor="verifyPassword">Verify Password</InputLabel>
                    <Input
                        id="verifyPassword"
                        name="verifyPassword"
                        aria-describedby="verifyPassword-helper-text"
                        type={showPassword ? 'text' : 'password'}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        onClick={clearErrors}
                        value={verifyPassword}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        error={
                            errors.some(e => (e.message.toLowerCase().includes('password')) ? true : false)
                        }
                    />
                    <FormHelperText id="verifyPassword-helper-text">
                        {
                            errors.some(e => (e.message.toLowerCase().includes('password'))) ? displayError(errors) : ''
                        }
                    </FormHelperText>
                </FormControl>
            </div>
            <div className={styles.wrapper}>
                <Button
                    disabled={isLoading}
                    onClick={handleSubmitCompanySignUp}
                >
                    Submit
                </Button>
                {isLoading && <CircularProgress size={24} className={styles.buttonProgress} />}
            </div>
        </form>
    )
}

export default CompanyForm