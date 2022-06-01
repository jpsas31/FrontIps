import * as React from 'react'
import PropTypes from 'prop-types'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { Link as LinkRouter } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import DropdownLogin from './DropdownLogin'
import DropdownRegister from './DropdownRegister'
import { LogoutButton } from '../auth0/buttons/logout-butt'
function Header (props) {
  const { sections, title } = props
  const { isAuthenticated, user } = useAuth0()
  if (isAuthenticated) {
    console.log(user)
  }
  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Button size="small">Subscribe</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        {!isAuthenticated && (
        <>
          <DropdownRegister /> &nbsp;&nbsp;&nbsp;
          <DropdownLogin/>
        </>
        )}
      {isAuthenticated && (

        <>
          <LogoutButton /> &nbsp;&nbsp;&nbsp;
          <Button component={LinkRouter} variant="outlined" size="small" to={'Dashboard'}>
              To Dashboard
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
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
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
