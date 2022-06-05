import * as React from 'react'
// import { faker } from '@faker-js/faker'
import { makeStyles } from '@mui/styles'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Grid, Typography, TablePagination, TableFooter, CircularProgress } from '@mui/material'
import Button from '@mui/material/Button'
import { useExternalApi } from '../hooks/InfoPacienteResponse'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
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

export default function MTable () {
  const classes = useStyles()
  const {
    consultaPacientes,
    consultaTrabajadores,
    cambEstado
  } = useExternalApi()

  const [loading, setIsLoading] = useState(true)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [titulo, setTitulo] = React.useState('Cargando...')

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const [pacientes, setPacientes] = React.useState([])
  const [trabajadores, setTrabajadores] = React.useState([])
  const [USERS, setUsers] = React.useState([])

  useEffect(() => {
    consultaPacientes()
      .then(res => {
        // console.log(res)
        setPacientes(res)
        setTitulo('Gestion de personal')
        setIsLoading(false)
      })
    consultaTrabajadores()
      .then(res => {
        // console.log(res)
        setTrabajadores(res)
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    setUsers([...pacientes, ...trabajadores])
  }, [pacientes, trabajadores])

  function handleClick (row) {
    const json = {
      id_usuario: row.id_usuario,
      estado: !row.estado
    }
    cambEstado(json)
      .then(() => {
        consultaPacientes()
          .then(res => {
          // console.log(res)
            setPacientes(res)
            setTitulo('Gestion de personal')
            setIsLoading(false)
          })
        consultaTrabajadores()
          .then(res => {
          // console.log(res)
            setTrabajadores(res)
            setIsLoading(false)
          })
      })
  }

  function verificarEstado (bol) {
    if (bol) {
      return 'Activo'
    } else {
      return 'Bloqueado'
    }
  }

  if (pacientes.length === 0 || trabajadores.length === 0 || pacientes === undefined || trabajadores === undefined || USERS.length === 0 || USERS.length === undefined) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
        <Grid container alignItems = 'center' sx = {{ display: 'flex' }}>
          <Grid item>{loading && <CircularProgress/>}</Grid>
          <Grid item><p className= {classes.titulo}> {titulo} </p></Grid>
        </Grid>
      </Box>
    )
  } else {
    return (
      <div>
        <Container maxWidth = 'lg' sx={{ display: 'flex', flexDirection: 'column', mb: 2 }} >
        <Box className= {classes.fondo} >
          <Grid container alignItems = 'center'>
            <Grid item><p className= {classes.titulo}> {titulo} </p></Grid>
          </Grid>

          <TableContainer component={Paper} className = {classes.tableContainer}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeaderCell}>Info de usuario</TableCell>
                  <TableCell className={classes.tableHeaderCell}>Rol</TableCell>
                  <TableCell className={classes.tableHeaderCell}>Direccion</TableCell>
                  <TableCell className={classes.tableHeaderCell}>Estado</TableCell>
                </TableRow>
              </TableHead>
            <TableBody>
              {USERS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.id_usuario}>
                  <TableCell>
                  <Grid container>
                    <Grid item lg = {2}>
                      <Avatar alt = {row.nombre + ' ' + row.apellido} src= '.' className= {classes.avatar} />
                    </Grid>
                    <Grid item lg = {10}>
                      <Typography className={classes.name}>{row.nombre + ' ' + row.apellido}</Typography>
                      <Typography color= 'textSecondary' variant= 'body2'>{row.correo}</Typography>
                      <Typography color= 'textSecondary' variant= 'body2'>{row.tipo_id + ' ' + row.identificacion}</Typography>
                    </Grid>
                  </Grid>
                  </TableCell>
                  <TableCell>
                    <Typography color= 'primary' variant= 'subtitle1'>{row.rol}</Typography>
                    <Typography color= 'textSecondary' variant= 'body2'>IPS</Typography>
                  </TableCell>
                  <TableCell >{row.direccion}</TableCell>
                  <TableCell ><Button variant = 'contained' className={classes.status}
                  color = {((row.estado === true && 'success') || (row.estado === false && 'error'))}
                  onClick = {() => { handleClick(row) }}>{verificarEstado(row.estado)}</Button>
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
        </Container>
      </div>
    )
  }
}
