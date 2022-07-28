import * as React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { makeStyles } from '@mui/styles'
import { Table, TableBody, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Typography, TablePagination, CircularProgress } from '@mui/material'
import Button from '@mui/material/Button'

import { useExternalApi } from '../hooks/InfoCitaResponse'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650
  },
  tableContainer: {
    borderRadius: 15,
    margin: '10px 10px'
    // maxWidth: 950
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
    width: 200
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
    pb: false,
    width: '100%'
  },
  titulo: {
    fontWeight: 'bold',
    color: theme.palette.secondary.dark,
    fontSize: '2rem',
    padding: '3px 10px'
  }
}))

export default function CitasTable () {
  const classes = useStyles()
  const {
    getCita,
    // deleteCita,
    // apiResponseCita,
    cancelarCita,
    createCita
  } = useExternalApi()
  const { user } = useAuth0()
  const [loading, setIsLoading] = useState(true)
  const [tipoCita, setTipoCita] = useState()
  const [page, setPage] = React.useState(0)
  const [isLoading, setLoading] = useState(true)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [titulo, setTitulo] = React.useState('Cargando...')
  const [visible, setVisible] = useState(false)
  const [visibleCancel, setVisibleCancel] = useState(false)
  const [canceladas, setCanceladas] = useState([])
  const handleClose = () => { setVisible(false) }
  const handleCancel = () => { setVisibleCancel(!visibleCancel) }
  const handleOpen = (row) => {
    setTipoCita(row.medio)
    setVisible(true)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const [citas, setCitas] = React.useState()

  useEffect(() => {
    getCita(setCitas)
    setTitulo('Gestion de Citas')
    setIsLoading(false)
  }, [])

  // function handleClick (row) {
  //   const json = {
  //     id_usuario: row.id_usuario,
  //     estado: !row.estado
  //   }
  // }
  // function verificarEstado (bol) {
  //   if (bol) {
  //     return 'Activo'
  //   } else {
  //     return 'Bloqueado'
  //   }
  // }

  if (typeof citas === 'undefined') {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
        <Grid container alignItems='center' sx={{ display: 'flex' }}>
          <Grid item>{loading && <CircularProgress />}</Grid>
          <Grid item><p className={classes.titulo}> {titulo} </p></Grid>
        </Grid>
      </Box>
    )
  } else {
    return (

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Box className={classes.fondo} >
          <Grid container alignItems='center'>
            <Grid item><p className={classes.titulo}> {titulo} </p></Grid>
          </Grid>

          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeaderCell}>Tipo de Cita</TableCell>
                  <TableCell className={classes.tableHeaderCell}>Medio</TableCell>
                  <TableCell className={classes.tableHeaderCell}>Precio</TableCell>
                  <TableCell className={classes.tableHeaderCell}>Fecha</TableCell>
                  <TableCell className={classes.tableHeaderCell}>Hora de Entrada</TableCell>
                  <TableCell className={classes.tableHeaderCell}>Hora de Salida</TableCell>
                  <TableCell className={classes.tableHeaderCell}>Entrar a la cita</TableCell>
                  <TableCell className={classes.tableHeaderCell}>Cancelación</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {citas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Typography color='primary' variant='subtitle1'>{row.tipoCita}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color='primary' variant='subtitle1'>{row.medio}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color='primary' variant='subtitle1'>{row.Precio}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color='primary' variant='subtitle1'>{row.fecha}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color='primary' variant='subtitle1'>{row.horaEntrada}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color='primary' variant='subtitle1'>{row.horaSalida}</Typography>
                    </TableCell>
                    {/* <TableCell >{row.direccion}</TableCell> */}
                    <TableCell ><Button disabled={!row.aprobacion || row.cancelada} variant='contained'
                      onClick={() => {
                        const value = { ...row, email: user.email }
                        createCita(value)
                        handleOpen(row)
                      }}>Obtener información de la cita</Button>
                    </TableCell>
                    <TableCell >
                      {
                        row.cancelada
                          ? <Typography align='center' variant='h7' style={{ color: 'red', align: 'center' }}>
                           CITA CANCELADA </Typography>
                          : <Button
                              variant="contained"
                              color="primary"
                              disabled={canceladas.includes(row.id)}
                              size="small"
                              onClick={async () => {
                                setCanceladas([...canceladas, row.id])
                                handleCancel()

                                setVisibleCancel(true)
                                setLoading(true)
                                await cancelarCita([row.id])
                                await getCita(setCitas)
                                setLoading(false)
                              }}>
                              CANCELAR CITA
                          </Button>
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                // component="div"
                count={citas.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Table>
          </TableContainer>
          <Dialog onClose={handleCancel} open={visibleCancel} fullWidth maxWidth="xs">
          <DialogTitle>
            {isLoading && <div>Procesando</div>}
            {!isLoading && <div>Completado</div>}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {isLoading && <CircularProgress />}
              {!isLoading && <div></div>}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleCancel}>
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
          <Dialog onClose={handleClose} open={visible} fullWidth maxWidth="xs">
            <DialogTitle>
              información de Cita
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                {tipoCita === 'Chat' && <p>Para ir a la cita escriba al chat de este <a href='https://www.m.me/111935198225289' target="_blank" rel="noreferrer">link</a> y su medico se comunicara con usted</p>}
                {(tipoCita === 'Llamada' || tipoCita === 'Video llamada') && <p>Para acceder a su cita debe usar el link que se le acaba de enviar a su correo</p>}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={handleClose}>
                Cerrar
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Paper>

    )
  }
}
