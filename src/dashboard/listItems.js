import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AdjustIcon from '@mui/icons-material/Adjust'
import BarChartIcon from '@mui/icons-material/BarChart'
import LogoutIcon from '@mui/icons-material/Logout'
import AddReactionIcon from '@mui/icons-material/AddReaction'
import { Link } from 'react-router-dom'

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

    { /* Se agrega opcion RegistroUsuario de panel administrativo */ }

    <ListItemButton component = {Link} to = {'personal'}>
      <ListItemIcon>
        <AddReactionIcon/>
      </ListItemIcon>
      <ListItemText primary="Regist Usuarios (Panel Admin)" /> 
    </ListItemButton>

    { /* Se agregaOpcion de activaUsuarios de panel administrativo */ }

    <ListItemButton component = {Link} to = {'activa'}>
      <ListItemIcon>
        <AddReactionIcon/>
      </ListItemIcon>
      <ListItemText primary="Personal" /> 
    </ListItemButton>

    <ListItemButton component={Link} to={'data'}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton component={Link} to={'/'}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Ir a la pagina principal" />
    </ListItemButton>
    <ListItemButton component={Link} to={'/'} onClick={() =>
      logout({
        returnTo: window.location.origin
      })
    }>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Ir a la pagina principal" />
    </ListItemButton>
  </React.Fragment>
  )
}

// export const secondaryListItems = (
//   <React.Fragment>
//     <ListSubheader component="div" inset>
//       Saved reports
//     </ListSubheader>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Current month" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItemButton>
//   </React.Fragment>
// )
