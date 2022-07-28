import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AdjustIcon from '@mui/icons-material/Adjust'
// import BarChartIcon from '@mui/icons-material/BarChart'
import LogoutIcon from '@mui/icons-material/Logout'
import HomeIcon from '@mui/icons-material/Home'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { Link } from 'react-router-dom'
import LayersIcon from '@mui/icons-material/Layers'
import AssessmentIcon from '@mui/icons-material/Assessment'
// import AddReactionIcon from '@mui/icons-material/AddReaction'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople'
import PeopleIcon from '@mui/icons-material/People'

export default function MainListItemsAdmin () {
  const { logout } = useAuth0()
  return (
    <React.Fragment>
      <ListItemButton component={Link} to={'inicio'}>
        <ListItemIcon>
          <AdjustIcon />
        </ListItemIcon>
        <ListItemText style={{ whiteSpace: 'normal' }} primary="Inicio Admin" />
      </ListItemButton>
    <ListItemButton component={Link} to={'citas-especialidad-report'}>
      <ListItemIcon>
        <AssessmentIcon />
      </ListItemIcon>
      <ListItemText style={{ whiteSpace: 'normal' }} primary="Reporte Citas Especialidad" />
    </ListItemButton>
    {
      /*
>>>>>>> master
      <ListItemButton component={Link} to={'/'}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText style={{ whiteSpace: 'normal' }} primary="Reports" />
      </ListItemButton>
      */
    }
    <ListItemButton component={Link} to={'citas-medio-report'}>
      <ListItemIcon>
        <AssessmentIcon />
      </ListItemIcon>
      <ListItemText style={{ whiteSpace: 'normal' }} primary="Reporte Citas Medio" />
    </ListItemButton>

    <ListItemButton component={Link} to={'data'}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText style={{ whiteSpace: 'normal' }} primary="Dashboard" />
    </ListItemButton>
    <ListItemButton component={Link} to={'info-admin'} >
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText style={{ whiteSpace: 'normal' }} primary="Información Admin" />
      </ListItemButton>
      <ListItemButton component={Link} to={'Admincitas'} >
        <ListItemIcon>
          <CalendarMonthIcon />
        </ListItemIcon>
        <ListItemText style={{ whiteSpace: 'normal' }} primary="Citas" />
      </ListItemButton>
      <ListItemButton component={Link} to={'info-usuarios'} >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText style={{ whiteSpace: 'normal' }} primary="Información usuarios" />
    </ListItemButton>
    <ListItemButton component={Link} to={'citas-paciente-report'}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText style={{ whiteSpace: 'normal' }} primary="CitasPorPaciente" />
    </ListItemButton>
    <ListItemButton component={Link} to={'cumple-report'}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText style={{ whiteSpace: 'normal' }} primary="Cumpleaños" />
    </ListItemButton>
    {
      /*
      <ListItemButton component = {Link} to = {'personal'}>
        <ListItemIcon>
          <AddReactionIcon/>
        </ListItemIcon>
        <ListItemText style={{ whiteSpace: 'normal' }} primary="GPersonal" />
      </ListItemButton>
      {
        /*
        <ListItemButton component = {Link} to = {'personal'}>
          <ListItemIcon>
            <AddReactionIcon/>
          </ListItemIcon>
          <ListItemText style={{ whiteSpace: 'normal' }} primary="GPersonal" />
        </ListItemButton>
        */
      }
      <ListItemButton component={Link} to={'activa'}>
        <ListItemIcon>
          <EmojiPeopleIcon />
        </ListItemIcon>
        <ListItemText style={{ whiteSpace: 'normal' }} primary="Personal" />
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
