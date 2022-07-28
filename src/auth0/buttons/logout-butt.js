import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import Button from '@mui/material/Button'
export const LogoutButton = () => {
  const { logout } = useAuth0()

  return (
    <Button className="button__logout" variant="outlined" size="small" onClick={() =>
      logout({
        returnTo: window.location.origin
      })
    }
      sx={{
        ml: 1,
        '&.MuiButtonBase-root:hover': {
          bgcolor: 'white'
        },
        bgcolor: 'white',
        fontWeight: 'bold',
        borderRadius: 2
      }}>
      Cerrar Sesión
    </Button>

  )
}
