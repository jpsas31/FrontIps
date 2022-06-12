import * as React from 'react'
import { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import { AccessControlLevel as AccessControlLevelAdmin, useExternalApi as useExternalApiAdmin } from '../hooks/InfoAdminResponse'
import { AccessControlLevel as AccessControlLevelPaciente, useExternalApi as useExternalApiPaciente } from '../hooks/InfoPacienteResponse'
import { AccessControlLevel as AccessControlLevelMedico, useExternalApi as useExternalApiMedico } from '../hooks/InfoMedicoResponse'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import CircularProgress from '@mui/material/CircularProgress'
import TablePacientes from './TablePacientes'
import TableMedicos from './TableMedicos'
import TableAdmins from './TableAdmins'

export default function InfoAdmin (props) {
  const {
    selectedAccessControlLevelAdmin,
    // apiEndpoint,
    apiResponseAdmin,
    getPacientes,
    getMedicos,
    getAdmins,
    updateAdmin
  } = useExternalApiAdmin()

  const {
    selectedAccessControlLevelPaciente,
    // apiEndpoint,
    apiResponsePaciente,

    updatePaciente
  } = useExternalApiPaciente()

  const {
    selectedAccessControlLevelMedico,
    // apiEndpoint,
    apiResponseMedico,

    updateMedico
  } = useExternalApiMedico()

  const [info, setInfo] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [visible, setVisible] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false)
  const [selPaciente, setSelPaciente] = useState(false)
  const [selMedico, setSelMedico] = useState(false)
  const [selAdmin, setSelAdmin] = useState(false)

  const getInfoPacientes = () => {
    setIsUpdated(true)

    setSelMedico(false)
    setSelAdmin(false)
    setSelPaciente(true)
    setInfo('waiting')
  }

  const getInfoMedicos = () => {
    setIsUpdated(true)

    setSelMedico(true)
    setSelAdmin(false)
    setSelPaciente(false)
    setInfo('waiting')
  }

  const getInfoAdmins = () => {
    setIsUpdated(true)

    setSelAdmin(true)
    setSelMedico(false)
    setSelPaciente(false)
    setInfo('waiting')
  }

  useEffect(() => {
    if (isUpdated) {
      if (selPaciente) {
        getPacientes(setInfo)
      } else if (selMedico) {
        getMedicos(setInfo)
      } else if (selAdmin) {
        getAdmins(setInfo)
      }
    }
  }, [isUpdated, selPaciente, selMedico, selAdmin])

  const handleClickOpen = () => { setVisible(true) }
  const handleClose = () => { setVisible(false) }

  const actualizarPaciente = (data) => {
    const transformJson = JSON.parse(JSON.stringify(
      {
        tipo_id: data[1],
        identificacion: data[2],
        nombre: data[3],
        apellido: data[4],
        direccion: data[5],
        ciudad: data[6],
        telefono: data[7],
        correo: data[8],
        edad: data[9],
        nacimiento: new Date(data[10]),
        antecedentes: data[11]
      }
    ))

    const key = data[0]

    setIsLoading(true)
    setIsUpdated(false)
    setSelPaciente(false)
    updatePaciente(transformJson, key)
    handleClickOpen()
    setTimeout(() => {
      setIsUpdated(true)
      setSelPaciente(true)
      setIsLoading(false)
    }, 2000)
  }

  const actualizarMedico = (data) => {
    const transformJson = JSON.parse(JSON.stringify(
      {
        tipo_id: data[1],
        identificacion: data[2],
        tipo_id_cargo: data[3],
        id_especialidad: data[4],
        nombre: data[5],
        apellido: data[6],
        direccion: data[7],
        telefono: data[8],
        correo: data[9],
        salario: data[10],
        certificacion_del_titulo: data[11]
      }
    ))

    const key = data[0]

    setIsLoading(true)
    setIsUpdated(false)
    setSelMedico(false)
    updateMedico(transformJson, key)
    handleClickOpen()
    setTimeout(() => {
      setIsUpdated(true)
      setSelMedico(true)
      setIsLoading(false)
    }, 2000)
  }

  const actualizarAdmin = (data) => {
    const transformJson = JSON.parse(JSON.stringify(
      {
        tipo_id: data[1],
        identificacion: data[2],
        tipo_id_cargo: data[3],
        nombre: data[4],
        apellido: data[5],
        direccion: data[6],
        telefono: data[7],
        correo: data[8],
        salario: data[9]
      }
    ))

    const key = data[0]

    setIsLoading(true)
    setIsUpdated(false)
    setSelAdmin(false)
    updateAdmin(transformJson, key)
    handleClickOpen()
    setTimeout(() => {
      setIsUpdated(true)
      setSelAdmin(true)
      setIsLoading(false)
    }, 2000)
  }

  return (
        <>
          {(info === 'waiting') && <LinearProgress />}
          <AccountCircleIcon sx = {{ mt: 5, display: 'block', marginLeft: 'auto', marginRight: 'auto', fontSize: 80 }}/>
          <Typography component="h1" variant="h6" sx={{ textAlign: 'center', pt: 2, fontSize: '2em', pb: 2 }}>
            Información de los usuarios
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
            <Button disabled = {selPaciente} variant = 'contained' onClick={getInfoPacientes} className={`messages-grid__option ${
                  selectedAccessControlLevelAdmin === AccessControlLevelAdmin.PROTECTED &&
                  'messages-grid__option--active'
                }` }>
                Pacientes
            </Button>
            <Button disabled = {selMedico} variant = 'contained' onClick={getInfoMedicos} className={`messages-grid__option ${
                  selectedAccessControlLevelAdmin === AccessControlLevelAdmin.PROTECTED &&
                  'messages-grid__option--active'
                }` }>
                Médicos
            </Button>
            <Button disabled = {selAdmin} variant = 'contained' onClick={getInfoAdmins} className={`messages-grid__option ${
                  selectedAccessControlLevelAdmin === AccessControlLevelAdmin.PROTECTED &&
                  'messages-grid__option--active'
                }` }>
                Administradores
            </Button>
          </Box>
          {(info !== 'waiting' && info !== '' && isUpdated && selPaciente) &&
            <TablePacientes
              info={info}
              selectedAccessControlLevelPaciente={selectedAccessControlLevelPaciente}
              AccessControlLevelPaciente={AccessControlLevelPaciente}
              actualizarPaciente = {actualizarPaciente}
            />
          }
          {(info !== 'waiting' && info !== '' && isUpdated && selMedico) &&
            <TableMedicos
            info={info}
            selectedAccessControlLevelMedico={selectedAccessControlLevelMedico}
            AccessControlLevelMedico={AccessControlLevelMedico}
            actualizarMedico = {actualizarMedico}
          />
          }
          {(info !== 'waiting' && info !== '' && isUpdated && selAdmin) &&
            <TableAdmins
            info={info}
            selectedAccessControlLevelAdmin = {selectedAccessControlLevelAdmin}
            AccessControlLevelAdmin = {AccessControlLevelAdmin}
            actualizarAdmin = {actualizarAdmin}
          />
          }

          <Dialog onClose={handleClose} open={visible} fullWidth maxWidth="xs">
            <DialogTitle>Alerta</DialogTitle>
            <DialogContent>
              <DialogContentText>
              {isLoading && <CircularProgress />}
              {(!isLoading && selPaciente) && apiResponsePaciente}
              {(!isLoading && selMedico) && apiResponseMedico}
              {(!isLoading && selAdmin) && apiResponseAdmin}
              {
                useEffect(() => {
                  console.log(apiResponseAdmin)
                }, [apiResponseAdmin])
              }
              {
                useEffect(() => {
                  console.log(apiResponsePaciente)
                }, [apiResponsePaciente])
              }
              {
                useEffect(() => {
                  console.log(apiResponseMedico)
                }, [apiResponseMedico])
              }

              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={handleClose}>
                Cerrar
              </Button>
            </DialogActions>
          </Dialog>

        </>
  )
}
