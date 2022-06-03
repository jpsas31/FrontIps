import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AdjustIcon from '@mui/icons-material/Adjust'
import BarChartIcon from '@mui/icons-material/BarChart'
// import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
// import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import LogoutIcon from '@mui/icons-material/Logout'
// import PersonIcon from '@mui/icons-material/Person'
import HomeIcon from '@mui/icons-material/Home'
import { Link } from 'react-router-dom'

export default function MainListItems () {
  const { logout } = useAuth0()
  return (
  <React.Fragment>
    {/* <ListItemButton component={Link} to = {'registropaciente'}>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Perfil" />
    </ListItemButton>
    <ListItemButton component={Link} to = {'registromedico'}>
      <ListItemIcon>
        <HealthAndSafetyIcon />
      </ListItemIcon>
      <ListItemText primary="Medicos" />
    </ListItemButton>
    <ListItemButton component={Link} to = {'registroadmin'}>
      <ListItemIcon>
        <SupervisorAccountIcon />
      </ListItemIcon>
      <ListItemText primary="Administrador" />
    </ListItemButton> */}
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
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton component={Link} to={'/'}>
      <ListItemIcon>
        <HomeIcon />
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
      <ListItemText primary="Log Out" />
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
