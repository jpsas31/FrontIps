import * as React from 'react'
import PropTypes from 'prop-types'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { Link as LinkRouter } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import DropdownLogin from './DropdownLogin'
import DropdownRegister from './DropdownRegister'
import { LogoutButton } from '../auth0/buttons/logout-butt'
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation'

function Header (props) {
  const { sections } = props
  const { isAuthenticated } = useAuth0()
  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'info.main' }}>
        <MedicalInformationIcon sx={{ color: 'white' }} fontSize="large" />
        <Typography
          component="h2"
          variant="h5"
          color="white"
          align="left"
          noWrap
          sx={{ flex: 1 }}
        >
          &nbsp;&nbsp;Ips salud en casa
        </Typography>
        {!isAuthenticated && (
          <>
            <DropdownRegister /> &nbsp;&nbsp;&nbsp;
            <DropdownLogin />
          </>
        )}
        {isAuthenticated && (

          <>
            <LogoutButton /> &nbsp;&nbsp;&nbsp;
            <Button component={LinkRouter} variant="outlined" size="small" to={'Dashboard'}
              sx={{
                ml: 1,
                '&.MuiButtonBase-root:hover': {
                  bgcolor: 'white'
                },
                bgcolor: 'white',
                fontWeight: 'bold',
                borderRadius: 2
              }}>
              Gestión
            </Button>
          </>
        )}
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      >
        {sections.map((section) => (
          <Link
            color='#58595B'
            noWrap
            key={section.title}
            variant="button"
            href={section.url}
            underline='none'
            sx={{
              p: 1,
              flexShrink: 0,
              fontWeight: 'bold',
              textTransform: 'uppercase'
            }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  )
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  title: PropTypes.string.isRequired
}

export default Header
