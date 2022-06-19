import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import { ButtonT } from '../auth0/buttons/butt-titulo'
export default function DropdownRegister () {
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
        id="signup-button"
        aria-controls={open ? 'sign-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="outlined"
        size="small"
      >
        Sign up
      </Button>
      <Menu
        id="sign-menu"
        aria-labelledby="signup-button"
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
        <ButtonT returnTo= '/Dashboard/RegistroPaciente' action='signup' titulo="Paciente"/>
        <ButtonT returnTo= '/Dashboard/RegistroMedico' action='signup' titulo="Medico"/>
        <ButtonT returnTo= '/Dashboard/RegistroAdmin' action='signup' titulo="Admin"/>
      </Menu>
    </div>
  )
}
