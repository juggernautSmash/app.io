import React from 'react'
import Backdrop from '@material-ui/core/Backdrop'
import { makeStyles } from '@material-ui/core/styles'
import './Loading.css'

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

export default function SimpleBackdrop() {
  const classes = useStyles()

  return (
    <Backdrop className={classes.backdrop} open={true}>
<div class="loadingio-spinner-wedges-fh6hfp2esjt"><div class="ldio-9a8uio72yyr">
<div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div>
</div></div>
    </Backdrop>
  )
}