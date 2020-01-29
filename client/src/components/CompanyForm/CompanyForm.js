import React from 'react'
import { green, red } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import { FormControl, InputLabel, Input, FormHelperText, Button,
    InputAdornment, IconButton, CircularProgress } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import './CompanyForm.css'
import SignUpContext from '../../utils/SignUpContext'
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'

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
    
    const { companyName, email, address, phone, handleInputChange, handleSubmitButton, showPassword, handleShowPassword,
         handleMouseDownPassword, errors, isLoading, password, verifyPassword  } = React.useContext(SignUpContext)

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
                        value={companyName}
                        error={
                            errors.some( e => (e.message.toLowerCase().includes('name') || e.message.toLowerCase().includes('all'))  ? true : false )
                        }
                    />
                    <FormHelperText id="companyName-helper-text">Required</FormHelperText>
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
                        error={
                            errors.some( e => (e.message.toLowerCase().includes('email') || e.message.toLowerCase().includes('all'))  ? true : false )
                        }
                    />
                    <FormHelperText id="email-helper-text">Required</FormHelperText>
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
                <FormControl>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input 
                        id="password" 
                        name="password"
                        aria-describedby="password-helper-text"
                        type={showPassword ? 'text' : 'password'} 
                        onChange={handleInputChange}
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
                            errors.some( e => (e.message.toLowerCase().includes('password') || e.message.toLowerCase().includes('all')) ? true : false )
                        }
                    />
                    <FormHelperText id="password-helper-text">Required
                        {
                            errors.some( e => e.message.toLowerCase().includes('password') ? e.message : '' )
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
                            errors.some( e => (e.message.toLowerCase().includes('password') || e.message.toLowerCase().includes('all')) ? true : false )
                        }
                    />
                    <FormHelperText id="verifyPassword-helper-text">Required
                        {
                            errors.some( e => e.message.toLowerCase().includes('password') ? e.message : '' )
                        }
                    </FormHelperText>
                </FormControl>
            </div>
            <div>
                {
                    errors.length > 0 && (
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            {console.log(errors)}
                            { errors.some( e => e.message.toLowerCase().includes('all')  ? <p>{e.message}</p> : '' )}
                        </Alert>
                    )
                }
            </div>
            <div className={styles.wrapper}>
                <Button 
                    disabled={isLoading}
                    onClick={handleSubmitButton}
                >
                    Submit
                </Button>
                {isLoading && <CircularProgress size={24} className={styles.buttonProgress} />}
            </div>
        </form>
    )
}

export default CompanyForm