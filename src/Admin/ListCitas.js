import * as React from 'react'
import { Grid, CircularProgress, ButtonGroup, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { useExternalApi } from '../hooks/InfoCitaResponse'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import { DataGrid, GridFooter, GridFooterContainer } from '@mui/x-data-grid'
import LinearProgress from '@mui/material/LinearProgress'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function CitasTableAdmin () {
  const {
    // getCita,
    getAllCitas,
    aprobarCita,
    cancelarCita
  } = useExternalApi()
  const [loading, setIsLoading] = useState(true)
  const [isLoading, setLoading] = useState(true)
  const [aprobadas, setAprobadas] = useState([])
  const [visible, setVisible] = useState(false)
  const [canceladas, setCanceladas] = useState([])
  const handleClose = () => { setVisible(false) }
  // const handleClose = () => { setVisible(false) }

  const renderDetailsButton = (params) => {
    const disable = aprobadas.includes(params.row.id) || params.row.cancelada || canceladas.includes(params.row.id)
    if (params.row.aprobacion) {
      return <Typography align='center' variant='h7' style={{ color: 'green', align: 'center' }}>
      APROBADA </Typography>
    }
    return (
        <strong>
            <Button
                variant="contained"
                color="primary"
                disabled={disable}
                size="small"
                onClick={() => {
                  setAprobadas([...aprobadas, params.row.id])
                }}
            >
                APROBAR CITA
            </Button>
        </strong>
    )
  }
  const renderDetailsButtonCancel = (params) => {
    const disable = canceladas.includes(params.row.id) || aprobadas.includes(params.row.id)
    if (params.row.cancelada) {
      return <Typography align='center' variant='h7' style={{ color: 'red', align: 'center' }}>
      CITA CANCELADA</Typography>
    }
    return (
        <strong>
            <Button
                variant="contained"
                color="primary"
                disabled={disable}
                size="small"
                onClick={() => {
                  setCanceladas([...canceladas, params.row.id])
                }}
            >
                CANCELAR CITA
            </Button>
        </strong>
    )
  }
  const columns = [
    { field: 'tipoCita', headerName: 'ESPECIALIDAD', width: 150 },
    { field: 'Precio', headerName: 'PRECIO', width: 150 },
    { field: 'horaEntrada', headerName: 'ENTRADA', width: 100 },
    { field: 'horaSalida', headerName: 'SALIDA', width: 100 },
    { field: 'medio', headerName: 'MEDIO', width: 100 },
    { field: 'fecha', headerName: 'FECHA', width: 100 },
    { field: 'idMedico', headerName: 'ID MEDICO', width: 150 },
    { field: 'nombreMedico', headerName: 'NOMBRE DEL MEDICO', width: 200 },
    { field: 'idPaciente', headerName: 'ID PACIENTE', width: 150 },
    { field: 'nombrePaciente', headerName: 'NOMBRE DEL PACIENTE', width: 200 },
    {
      field: 'APROBAR',
      width: 150,
      renderCell: renderDetailsButton,
      disableClickEventBubbling: true
    },
    {
      field: 'CANCELAR',
      width: 150,
      renderCell: renderDetailsButtonCancel,
      disableClickEventBubbling: true
    }
  ]

  const [citas, setCitas] = React.useState()

  useEffect(() => {
    getAllCitas(setCitas, true)
    setIsLoading(false)
  }, [])

  const footer = () => <GridFooterContainer>
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
    <Button
                onClick={() => {
                  setAprobadas([])
                  setCanceladas([])
                }}
            >
                CANCELAR
  </Button>
   <Button
                onClick={async () => {
                  setVisible(true)
                  setLoading(true)
                  await aprobarCita(aprobadas)
                  await cancelarCita(canceladas)
                  await getAllCitas(setCitas, true)
                  setAprobadas([])
                  setCanceladas([])
                  setLoading(false)
                }}
            >
                GUARDAR CAMBIOS
            </Button>
            </ButtonGroup>
  <GridFooter sx={{
    border: 'none' // To delete double border.
  }} />
</GridFooterContainer>
  if (typeof citas === 'undefined') {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
        <Grid container alignItems='center' sx={{ display: 'flex' }}>
          <Grid item>{loading && <CircularProgress />}</Grid>
        </Grid>
      </Box>
    )
  } else {
    return (

      <div style={{ height: '93%', width: '100%', overflow: 'hidden' }}>
      <DataGrid rows={citas} columns={columns} components={{ Footer: footer }} />
      <Dialog onClose={handleClose} open={visible} fullWidth maxWidth="xs">
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
            <Button variant="outlined" onClick={handleClose}>
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </div>

    )
  }
}
