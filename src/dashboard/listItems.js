import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AdjustIcon from '@mui/icons-material/Adjust'
import BarChartIcon from '@mui/icons-material/BarChart'
import LogoutIcon from '@mui/icons-material/Logout'
import HomeIcon from '@mui/icons-material/Home'
import { Link } from 'react-router-dom'
import LayersIcon from '@mui/icons-material/Layers'
import AddReactionIcon from '@mui/icons-material/AddReaction'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople'

export default function MainListItems () {
  const { logout } = useAuth0()
  return (
  <React.Fragment>
    <ListItemButton component={Link} to={'inicio'}>
      <ListItemIcon>
        <AdjustIcon />
      </ListItemIcon>
      <ListItemText primary="Inicio" />
    </ListItemButton>
    <ListItemButton component={Link} to={'data'}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton component={Link} to={'/'}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton component={Link} to={'info-paciente'} >
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Información Paciente" />
    </ListItemButton>
    <ListItemButton component={Link} to={'/'}>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Ir a la pagina principal" />
    </ListItemButton>
    <ListItemButton component = {Link} to = {'personal'}>
      <ListItemIcon>
        <AddReactionIcon/>
      </ListItemIcon>
      <ListItemText primary="GPersonal" />
    </ListItemButton>

    { /* Se agregaOpcion de activaUsuarios de panel administrativo */ }

    <ListItemButton component = {Link} to = {'activa'}>
      <ListItemIcon>
        <EmojiPeopleIcon/>
      </ListItemIcon>
      <ListItemText primary="Personal" />
    </ListItemButton>
    <ListItemButton component={Link} to={'/'} onClick={() =>
      logout({
        returnTo: window.location.origin
      })
    }>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Log Out" />
    </ListItemButton>
  </React.Fragment>
  )
}
