import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import Alert from '@material-ui/lab/Alert'
import './Dashboard.css'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

const Dashboard = _ => {
  
  const styles = useStyles()

  return (
    <div id="dashboard" className={styles.root}>
      <LinearProgress />
      <Alert severity="success">This is the dashboard</Alert>
      <LinearProgress color="secondary" />
    </div>
  );
}

export default Dashboard