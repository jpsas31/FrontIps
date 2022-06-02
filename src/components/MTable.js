import * as React from 'react'
// import { faker } from '@faker-js/faker'
import { makeStyles } from '@material-ui/core/styles'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Grid, Typography, TablePagination, TableFooter, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress } from '@material-ui/core'
import Button from '@mui/material/Button'
import { useExternalApi } from '../hooks/InfoPacienteResponse'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'

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
  },
  fondo: {
    maxWidth: false,
    pb: false
  },
  titulo: {
    fontWeight: 'bold',
    color: theme.palette.secondary.dark,
    fontSize: '2rem',
    padding: '3px 10px'

  }
}))

const USERS = []
// const STATUSES = ['Activo', 'Bloqueado']
export default function MTable () {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)

  const {
    consultaPacientes
  } = useExternalApi()
  const [pacientes, setPacientes] = useState({})

  useEffect(() => {
    setLoading(true)
    const info = consultaPacientes()
    console.log(info)
    setPacientes(info)
    setTimeout(() => {
      setLoading(false)
      setTitulo('Gestion de personal')
      console.log('hola', pacientes)
    }, 2000)
  }, [])

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [open, setOpen] = React.useState(false)
  const [titulo, setTitulo] = React.useState('Cargando...')
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
  if (JSON.stringify(pacientes) === '{}') {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    )
  } else {
    return (
      <div>
      <Box className= {classes.fondo} >
      <Grid container alignItems = 'center'>
        <Grid item>{loading && <CircularProgress/>}</Grid>
        <Grid item><Typography className = {classes.titulo}> {titulo} </Typography></Grid>
      </Grid>
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
          <tr>
            <td>
            <TablePagination
            rowsPerPageOptions = {[5, 10, 15]}
            component = 'div'
            count = {USERS.length}
            rowsPerPage = {rowsPerPage}
            page = {page}
            onPageChange = {handleChangePage}
            onRowsPerPageChange = {handleChangeRowsPerPage}
            />
            </td>
          </tr>
        </TableFooter>
      </Table>
    </TableContainer>
      </Box>
    </div>
    )
  }
}
