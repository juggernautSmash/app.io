import React from 'react'
import BottomBar from '../../components/BottomBar'
import { FirebaseContext } from '../../utils/Auth'

const BottomBarPage = _ => {

  const { user } = React.useContext(FirebaseContext)

  return (
    <>
    {user ? <BottomBar /> : null}
    </>
  )
}

export default BottomBarPage