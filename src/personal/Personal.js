import * as React from 'react'
import AddReactionIcon from '@mui/icons-material/AddReaction'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { TextField } from '@mui/material'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import Alert from '@mui/material/Alert'

export default function Personal () {
  const { register, handleSubmit } = useForm()

  // validaciones
  const [tipoid, setTipoid] = useState('C.C')
  const [num, setNum] = useState('')
  const [leyenNum, setLeyenNum] = useState('')
  const [errorNum, setErrorNum] = useState(false)

  const [nomb, setNomb] = useState('')
  const [leyenNomb, setLeyenNomb] = useState('')
  const [errorNomb, setErrorNomb] = useState(false)

  const [ape, setApe] = useState('')
  const [leyenApe, setLeyenApe] = useState('')
  const [errorApe, setErrorApe] = useState(false)

  const [dir, setDir] = useState('')
  const [ciudad, setCiudad] = useState('Santiago de Cali')
  const [nacimiento, setNacimiento] = useState('')
  const [edad, setEdad] = useState('')

  const [tel, setTel] = useState('')
  const [leyenTel, setLeyenTel] = useState('')
  const [errorTel, setErrorTel] = useState(false)

  const [email, setEmail] = useState('')
  const [leyenEmail, setLeyenEmail] = useState('')
  const [errorEmail, setErrorEmail] = useState(false)

  const onSubmit = (data) => {
    console.log(data)
  }

  function limpiar () {
    setTipoid('C.C')
    setNum('')
    setNomb('')
    setApe('')
    setDir('')
    setCiudad('Santiago de Cali')
    setNacimiento('')
    setEdad('')
    setTel('')
    setEmail('')
  }

  function verificar () {
    return errorEmail || errorTel || errorApe || errorNomb || errorNum
  }

  const tipoids = [{ value: 'C.C', label: 'C.C' }, { value: 'T.I', label: 'T.I' }]
  const ciudades = [{ value: 'Santiago de Cali', label: 'Santiago de Cali' }]

  return (
      <div>
        <AddReactionIcon sx = {{ mt: 10, display: 'block', marginLeft: 'auto', marginRight: 'auto', fontSize: 100 }}/>
        <Typography component="h1" variant="h5" sx={{ textAlign: 'center', pt: 2, fontSize: '3em', pb: 5 }}>
            Registrar Paciente
        </Typography>
        <Container maxWidth = 'lg' sx={{ width: '80%', display: 'flex', flexDirection: 'column' }} >
          <Paper elevation = {8} sx = {{ padding: 6 }} >
          <form onSubmit = {handleSubmit(onSubmit)} style ={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
          <div>
            <TextField select label = 'Identificacion' defaultValue = 'C.C' { ...register(tipoid, { required: true })} sx = {{ mx: 1, my: 2, width: '15ch' }}
              onChange = {(e) => {
                setTipoid(e.target.value)
              }}
            >
                {tipoids.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>))}
              </TextField>
            <TextField label = "Numero" defaultValue = '' { ...register(num, { required: true, maxLength: 25, valueAsNumber: true })} sx = {{ mx: 1, my: 2, width: '20ch' }} helperText = {leyenNum} error = {errorNum}
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
            <TextField label = 'Nombre' defaultValue = '' { ...register(nomb, { required: true, pattern: /^[A-Za-z\s]*$/i }) } sx = { { mx: 1, my: 2, width: '20ch' } } helperText = { leyenNomb } error = { errorNomb }
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
            <TextField label="Apellido" defaultValue = '' {...register(ape, { required: true, pattern: /^[A-Za-z\s]*$/i }) } sx={{ mx: 1, my: 2, width: '30ch' } } helperText = { leyenApe } error = { errorApe }
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
            <TextField id = 'textfield-direccion' label = 'Direccion' defaultValue = '' { ...register(dir, { required: true }) } sx = {{ mx: 1, my: 2, width: '30ch' }}
              onChange = {(e) => {
                setDir(e.target.value)
              }}
            />
            <TextField select label='Ciudad' defaultValue = 'Santiago de Cali' {...register(ciudad, { required: true })} sx = {{ mx: 1, my: 2, width: '30ch' }}
              onChange = {(e) => {
                setCiudad(e.target.value)
              }}
            >
              {ciudades.map((option) => (
                <MenuItem key= {option.value} value = {option.value}>
                  {option.label}
                </MenuItem>
              ))}
              </TextField>
            <TextField label='Telefono' defaultValue='' {...register(tel, { required: true, minLength: 6, pattern: /^\d+$/i })} sx = {{ mx: 1, my: 2, width: '20ch' } } helperText = {leyenTel} error = {errorTel} onChange = {(e) => {
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
            <TextField label = '' defaultValue = '' type = "date" {...register(nacimiento, { required: true })} sx = {{ mx: 1, my: 2, width: '20ch' }} helperText = 'Fecha de nacimiento'
              onChange = {(e) => {
                setNacimiento(e.target.value)
              }}
            />
            <TextField label = 'Edad' defaultValue = '' color = 'secondary' variant = 'filled' { ...register(edad, { required: true })} type = 'number' sx = { { mx: 1, my: 2, width: '20ch' }}
              onChange = {(e) => {
                setEdad(e.target.value)
              }}/>
             <TextField label = 'Correo electronico' defaultValue = '' { ...register(email, { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i }) } sx = { { mx: 1, my: 2, width: '40ch' } } helperText = {leyenEmail } error = {errorEmail }
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
          </Paper>
          {verificar() && <Alert variant="outlined" severity="error"> Hay errores en los datos — ¡Reviselos! </Alert>}
          <Box sx={{ display: 'flex', alignItems: 'center', height: 300, justifyContent: 'center', gap: 10 }}>
          <Button variant="outlined" startIcon={<DeleteIcon />}
            onClick = {() => limpiar()}> Limpiar </Button>
            <Button variant="contained" onClick= {handleSubmit(onSubmit)} endIcon={<SendIcon />}> Registrar paciente </Button>
          </Box>
          </Container>
      </div>
  )
}
