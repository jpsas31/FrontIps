import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import AdjustIcon from '@mui/icons-material/Adjust'
import LogoutIcon from '@mui/icons-material/Logout'
import HomeIcon from '@mui/icons-material/Home'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { Link } from 'react-router-dom'
import LayersIcon from '@mui/icons-material/Layers'

export default function MainListItemsPaciente () {
  const { logout } = useAuth0()
  return (
  <React.Fragment>
    <ListItemButton component={Link} to={'inicio'}>
      <ListItemIcon>
        <AdjustIcon />
      </ListItemIcon>
      <ListItemText style={{ whiteSpace: 'normal' }} primary="Inicio Paciente" />
    </ListItemButton>

    <ListItemButton component={Link} to={'info-paciente'} >
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText style={{ whiteSpace: 'normal' }} primary="Información del Paciente" />
    </ListItemButton>

    <ListItemButton component={Link} to={'solicitar-cita'} >
        <ListItemIcon>
          <CalendarMonthIcon />
        </ListItemIcon>
        <ListItemText style={{ whiteSpace: 'normal' }} primary="Solicitar Cita" />
    </ListItemButton>

    <ListItemButton component={Link} to={'/'}>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText style={{ whiteSpace: 'normal' }} primary="Ir a la pagina principal" />
    </ListItemButton>
    <ListItemButton component={Link} to={'/'} onClick={() =>
      logout({
        returnTo: window.location.origin
      })
    }>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText style={{ whiteSpace: 'normal' }} primary="Log Out" />
    </ListItemButton>
  </React.Fragment>
  )
}
