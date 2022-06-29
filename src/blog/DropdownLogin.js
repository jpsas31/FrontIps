import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import { ButtonT } from '../auth0/buttons/butt-titulo'

export default function DropdownLogin () {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        id="login-button"
        aria-controls={open ? 'login-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="outlined"
        size="small"
        sx={{
          ml: 1,
          '&.MuiButtonBase-root:hover': {
            bgcolor: 'white'
          },
          bgcolor: 'white',
          fontWeight: 'bold',
          borderRadius: 2
        }}
      >
        Ingresar
      </Button>
      <Menu
        id="login-menu"
        aria-labelledby="login-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <ButtonT action='login' titulo="Paciente"/>
        <ButtonT action='login' titulo="Medico"/>
        <ButtonT action='login' titulo="Admin"/>

      </Menu>
    </div>
  )
}
