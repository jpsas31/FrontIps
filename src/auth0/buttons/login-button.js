import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import Button from '@mui/material/Button'

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <Button className="button__login" variant="outlined" size="small" onClick={() => loginWithRedirect()}>
         Log in
    </Button>

  )
}
