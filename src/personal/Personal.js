import * as React from 'react'
import AddReactionIcon from '@mui/icons-material/AddReaction'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Container from '@mui/material/Container'
import { makeStyles } from '@material-ui/core'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { TextField } from '@mui/material'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import Alert from '@mui/material/Alert'
import { useExternalApi } from '../hooks/InfoPacienteResponse'

const useStyles = makeStyles((theme) => ({
  titulo: {
    fontWeight: 'bold',
    fontSize: '1rem',
    padding: '1 rem 1rem',
    color: theme.palette.primary.dark
  },
  icono: {
    padding: '1rem',
    color: theme.palette.primary.dark
  },
  fondo: {
    maxWidth: false,
    pb: false
  },
  container: {
    borderRadius: 15,
    margin: '3rem 3rem 3rem 3rem'
  },
  box: {
    pt: '20rem'
  }
}))

export default function Personal () {
  const classes = useStyles()
  const { register, handleSubmit } = useForm()

  const {
    createPaciente
  } = useExternalApi()

  // validaciones
  const [dir, setDir] = useState('')
  const [fecha, setFecha] = useState('')
  const [edad, setEdad] = useState('')
  const [num, setNum] = useState('')
  const [leyenNum, setLeyenNum] = useState('')
  const [errorNum, setErrorNum] = useState(false)

  const [nomb, setNomb] = useState('')
  const [leyenNomb, setLeyenNomb] = useState('')
  const [errorNomb, setErrorNomb] = useState(false)

  const [ape, setApe] = useState('')
  const [leyenApe, setLeyenApe] = useState('')
  const [errorApe, setErrorApe] = useState(false)

  const [tel, setTel] = useState('')
  const [leyenTel, setLeyenTel] = useState('')
  const [errorTel, setErrorTel] = useState(false)

  const [email, setEmail] = useState('')
  const [leyenEmail, setLeyenEmail] = useState('')
  const [errorEmail, setErrorEmail] = useState(false)

  const onSubmit = (data) => {
    createPaciente(data)
  }

  function verificar () {
    return errorEmail || errorTel || errorApe || errorNomb || errorNum
  }

  function limpiar () {
    setNum('')
    setNomb('')
    setApe('')
    setDir('')
    setTel('')
    setFecha('')
    setEdad('')
    setEmail('')
  }

  const tipoids = [{ value: 'C.C', label: 'C.C' }, { value: 'T.I', label: 'T.I' }]
  const ciudades = [{ value: 'Santiago de Cali', label: 'Santiago de Cali' }]

  return (
      <>
        <AddReactionIcon className = {classes.icono} sx = {{ mt: '3rem', display: 'block', marginLeft: 'auto', marginRight: 'auto', fontSize: 100 }}/>
        <Typography className= {classes.titulo} component="h1" variant="h5" sx={{ textAlign: 'center', pt: 1, fontSize: '3em', pb: 1 }}>Registrar Paciente</Typography>
        <Container maxWidth = 'lg' sx = {{ width: '75%', display: 'flex', flexDirection: 'column', mb: 2 }}>
          <Paper elevation = {8} sx = {{ padding: 6 }}>
            <form onSubmit = {handleSubmit(onSubmit)} style ={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div>
                <TextField select label = 'Identificacion' defaultValue = 'C.C' { ...register('tipo_id', { required: true })} sx = {{ mx: 1, my: 2, width: '15ch' }}>
                  {tipoids.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>))}
                </TextField>
                <TextField label = "Numero" { ...register('identificacion', { required: true, maxLength: 25, valueAsNumber: true })} sx = {{ mx: 1, my: 2, width: '20ch' }} helperText = {leyenNum} error = {errorNum} value = {num}
                  onChange = {(e) => {
                    setNum(e.target.value)
                    if (/^\d+$/.test(num)) {
                      setErrorNum(false)
                      setLeyenNum('')
                    } else {
                      setErrorNum(true)
                      setLeyenNum('Identificacion invalida, ingrese digitos')
                    }
                  }}
                />
                <TextField label = 'Nombre' { ...register('nombre', { required: true, pattern: /^[A-Za-z\s]*$/i }) } sx = { { mx: 1, my: 2, width: '20ch' } } helperText = { leyenNomb } error = { errorNomb } value = {nomb}
                  onChange = {(e) => {
                    setNomb(e.target.value)
                    if (/^[A-Za-z\s]*$/.test(nomb)) {
                      setErrorNomb(false)
                      setLeyenNomb('')
                    } else {
                      setErrorNomb(true)
                      setLeyenNomb('Nombre invalido, ¡no puede contener digitos!')
                    }
                  }}
                />
                <TextField label="Apellido" {...register('apellido', { required: true, pattern: /^[A-Za-z\s]*$/i }) } sx={{ mx: 1, my: 2, width: '30ch' } } helperText = { leyenApe } error = { errorApe } value = {ape}
                  onChange = {(e) => {
                    setApe(e.target.value)
                    if (/^[A-Za-z\s]*$/.test(ape)) {
                      setErrorApe(false)
                      setLeyenApe('')
                    } else {
                      setErrorApe(true)
                      setLeyenApe('Apellido invalido, ¡No puede contener digitos!')
                    }
                  }}
                />
              </div>
              <div>
                <TextField id = 'textfield-direccion' label = 'Direccion' { ...register('direccion', { required: true }) } sx = {{ mx: 1, my: 2, width: '30ch' }} value = {dir} onChange = {(e) => {
                  setDir(e.target.value)
                }}
                />
                <TextField select label='Ciudad' defaultValue = 'Santiago de Cali' {...register('ciudad', { required: true })} sx = {{ mx: 1, my: 2, width: '30ch' }}>
                  {ciudades.map((option) => (
                    <MenuItem key= {option.value} value = {option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField label='Telefono' {...register('telefono', { required: true, minLength: 6, pattern: /^\d+$/i })} sx = {{ mx: 1, my: 2, width: '20ch' } } helperText = {leyenTel} error = {errorTel} value = {tel} onChange = {(e) => {
                  setTel(e.target.value)
                  if (/^\d+$/.test(tel)) {
                    setErrorTel(false)
                    setLeyenTel('')
                  } else {
                    setErrorTel(true)
                    setLeyenTel('Telefono invalido, datos diferentes a digitos')
                  }
                }}
                />
              </div>
              <div>
                <TextField label = '' type = "date" {...register('nacimiento', { required: true })} sx = {{ mx: 1, my: 2, width: '20ch' }} helperText = 'Fecha de nacimiento' value = {fecha} onChange = { (e) => {
                  setFecha(e.target.value)
                }}/>
                <TextField label = 'Edad' color = 'secondary' variant = 'filled' { ...register('edad', { required: true })} type = 'number' sx = { { mx: 1, my: 2, width: '20ch' }} value = {edad} onChange = { (e) => {
                  setEdad(e.target.value)
                }}/>
                <TextField label = 'Correo electronico' { ...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i }) } sx = { { mx: 1, my: 2, width: '40ch' } } helperText = {leyenEmail } error = {errorEmail } value = {email}
                  onChange = { (e) => {
                    setEmail(e.target.value)
                    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                      setErrorEmail(false)
                      setLeyenEmail('')
                    } else {
                      setErrorEmail(true)
                      setLeyenEmail('Correo electronico invalido')
                    }
                  }}
                />
              </div>
            </form>
            <Box className= {classes.box} sx = {{ pb: '1rem', pt: '3rem' }}>
              {verificar() && <Alert variant="outlined" severity="error"> Hay errores en los datos — ¡Reviselos! </Alert>}
            </Box>
          </Paper>
        </Container>
        <Box sx={{ display: 'flex', alignItems: 'center', height: 300, justifyContent: 'center', gap: 10 }}>
          <Button variant="contained" onClick= { () => { limpiar() }} startIcon={<DeleteIcon />}> Limpiar </Button>
          <Button variant="contained" onClick= {handleSubmit(onSubmit)} endIcon={<SendIcon />}> Registrar paciente </Button>
        </Box>
      </>
  )
}
