import { faker } from '@faker-js/faker'
import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Grid, Typography, TablePagination, TableFooter, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import Button from '@mui/material/Button'

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650
  },
  tableContainer: {
    borderRadius: 15,
    margin: '10px 10px',
    maxWidth: 950
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark)
  },
  avatar: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.light)
  },
  name: {
    fontWeight: 'bold',
    color: theme.palette.secondary.dark
  },
  status: {
    fontWeight: 'bold',
    fontSize: '0.75rem',
    color: 'white',
    backgroundColor: 'grey',
    borderRadius: 8,
    padding: '3px 10px',
    display: 'inline-block'
  }
}))

const USERS = []
const STATUSES = ['Activo', 'Bloqueado']

for (let i = 0; i < 14; i++) {
  USERS[i] = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    jobTitle: faker.name.jobTitle(),
    company: faker.company.companyName(),
    joinDate: faker.date.past().toLocaleDateString('en-US'),
    status: STATUSES[Math.floor(Math.random() * STATUSES.length)]
  }
}

console.log(USERS)

function MTable () {
  const classes = useStyles()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [open, setOpen] = React.useState(false)
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <TableContainer component={Paper} className = {classes.tableContainer}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell className={classes.tableHeaderCell}>Info de usuario</TableCell>
          <TableCell className={classes.tableHeaderCell}>Rol</TableCell>
          <TableCell className={classes.tableHeaderCell}>Joining date</TableCell>
          <TableCell className={classes.tableHeaderCell}>Estado</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {USERS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
          <TableRow key={row.name}>
            <TableCell>
              <Grid container>
                <Grid item lg = {2}>
                <Avatar alt={row.name} src = '.' className={classes.avatar}/>
                </Grid>
                <Grid item lg = {10}>
                  <Typography className={classes.name}>{row.name}</Typography>
                  <Typography color= 'textSecondary' variant= 'body2'>{row.email}</Typography>
                  <Typography color= 'textSecondary' variant= 'body2'>{row.phone}</Typography>
                </Grid>
              </Grid>
            </TableCell>
            <TableCell>
              <Typography color= 'primary' variant= 'subtitle'>{row.jobTitle}</Typography>
              <Typography color= 'textSecondary' variant= 'body2'>{row.company}</Typography>
            </TableCell>
            <TableCell >{row.joinDate}</TableCell>

            <TableCell ><Button variant = 'contained' className={classes.status}
            color={
              ((row.status === 'Activo' && 'success')) ||
              ((row.status === 'Bloqueado' && 'error'))
            }
            onClick = {handleClickOpen}>{row.status}</Button>
            <Dialog open = {open} onClose = {handleClose} aria-labelledby = 'alert-dialog-title' aria-describedby = 'alert-dialog-description'>
              <DialogTitle id='alert-dialog-title'>
                {'Cambiar estado de usuario'}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                  Al aceptar, usted estará cambiando el estado del usuario de {row.status} al contrario, ¿está de acuerdo?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={ () => {
                  handleClose()
                  console.log(row.status)
                  if (row.status === 'Activo') {
                    row.status = 'Bloqueado' // revisar lo del boton
                  } else {
                    row.status = 'Activo'
                  }
                }} autoFocus >Aceptar</Button>
              </DialogActions>
            </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TablePagination
          rowsPerPageOptions = {[5, 10, 15]}
          component = 'div'
          count = {USERS.length}
          rowsPerPage = {rowsPerPage}
          page = {page}
          onChangePage = {handleChangePage}
          onChangeRowsPerPage = {handleChangeRowsPerPage}
        />
      </TableFooter>
    </Table>
  </TableContainer>
  )
}

export default MTable
