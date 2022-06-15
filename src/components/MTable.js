import * as React from 'react'
// import { faker } from '@faker-js/faker'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Grid, Typography, TablePagination, TableFooter, CircularProgress } from '@mui/material'
import Button from '@mui/material/Button'
import { useExternalApi } from '../hooks/InfoPacienteResponse'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import LinearProgress from '@mui/material/LinearProgress'

function stringToColor (string) {
  let hash = 0
  /* eslint-disable no-bitwise */
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */
  return color
}

function stringAvatar (name) {
  return {
    sx: {
      bgcolor: stringToColor(name)
    },
    children: name[0]
  }
}

export default function MTable () {
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
          <Grid item><Typography sx = {{ fontWeight: 'bold', color: '#851fa2', fontSize: '2 rem', padding: '3px 10px' }}> {titulo} </Typography></Grid>
        </Grid>
      </Box>
    )
  } else {
    return (
      <div>
        <Container maxWidth = 'lg' sx={{ display: 'flex', flexDirection: 'column', mb: 2 }} >
        <Box sx = {{ maxWidth: 'false', pb: 'false' }} >
          <Grid container alignItems = 'center'>
            <Grid item><Typography variant = 'h4' sx = {{ fontWeight: 'bold', color: '#851fa2', fontSize: '10 rem', padding: '3px 10px', mt: '2rem' }}> {titulo} </Typography></Grid>
          </Grid>
          <TableContainer component={Paper} sx = {{ borderRadius: 7, margin: '10px 10px', maxWidth: 950 }}>
            <Table sx = {{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx = {{ fontWeight: 'bold', backgroundColor: '#1565c0', color: '#ffffff' }}>Info de usuario</TableCell>
                  <TableCell sx = {{ fontWeight: 'bold', backgroundColor: '#1565c0', color: '#ffffff' }}>Rol</TableCell>
                  <TableCell sx = {{ fontWeight: 'bold', backgroundColor: '#1565c0', color: '#ffffff' }}>Direccion</TableCell>
                  <TableCell align = 'center' sx = {{ fontWeight: 'bold', backgroundColor: '#1565c0', color: '#ffffff' }}>Estado</TableCell>
                </TableRow>
              </TableHead>
            <TableBody>
              {USERS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.id_usuario}>
                  <TableCell>
                  <Grid container>
                    <Grid item lg = {2}>
                      <Avatar {...stringAvatar(row.nombre)} />
                    </Grid>
                    <Grid item lg = {10}>
                      <Typography sx = {{ fontWeight: 'bold', color: '#8831a3' }}>{row.nombre + ' ' + row.apellido}</Typography>
                      <Typography color= 'textSecondary' variant= 'body2'>{row.correo}</Typography>
                      <Typography color= 'textSecondary' variant= 'body2'>{row.tipo_id + ' ' + row.identificacion}</Typography>
                    </Grid>
                  </Grid>
                  </TableCell>
                  <TableCell>
                    <Typography color= 'primary' variant= 'subtitle1'>{row.rol}</Typography>
                    <Typography color= 'textSecondary' variant= 'body2'>IPS</Typography>
                  </TableCell>
                  <TableCell>{row.direccion}</TableCell>
                  <TableCell align= 'center'><Button variant = 'contained'
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
