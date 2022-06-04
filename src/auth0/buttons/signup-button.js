import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import Button from '@mui/material/Button'
export const SignupButton = () => {
  const { loginWithRedirect } = useAuth0()

  /**
   * Using the Signup feature requires you to enable
   * the Auth0 New Universal Login Experience in your tenant.
   * Learn more: https://auth0.com/docs/universal-login/new-experience
   */
  return (
    <Button className="button__sign-up" variant="outlined" size="small" onClick={() =>
      loginWithRedirect({
        screen_hint: 'signup'
      })
    }
  >
          Sign up
    </Button>

  )
}
