import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import AdjustIcon from '@mui/icons-material/Adjust'
import LogoutIcon from '@mui/icons-material/Logout'
import HomeIcon from '@mui/icons-material/Home'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { Link } from 'react-router-dom'
import LayersIcon from '@mui/icons-material/Layers'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'

export default function MainListItemsMedico () {
  const { logout } = useAuth0()
  return (
  <React.Fragment>
    <ListItemButton component={Link} to={'inicio'}>
      <ListItemIcon>
        <AdjustIcon />
      </ListItemIcon>
      <ListItemText style={{ whiteSpace: 'normal' }} primary="Inicio Medico" />
    </ListItemButton>
    <ListItemButton component={Link} to={'info-medico'} >
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText style={{ whiteSpace: 'normal' }} primary="Información del Medico" />
    </ListItemButton>
    <ListItemButton component={Link} to={'turnos'} >
        <ListItemIcon>
          <CalendarTodayIcon />
        </ListItemIcon>
        <ListItemText style={{ whiteSpace: 'normal' }} primary="Turnos Medicos" />
    <ListItemButton component={Link} to={'RegistroHM'}>
      <ListItemIcon>
        <LibraryBooksIcon/>
      </ListItemIcon>
      <ListItemText style={{ whiteSpace: 'normal' }} primary="HM Paciente"/>
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
