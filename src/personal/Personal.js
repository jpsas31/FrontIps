import * as React from 'react'
import AddReactionIcon from '@mui/icons-material/AddReaction'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { TextField } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

export default function Personal () {
  const { register, formState: { errors }, handleSubmit } = useForm()
  const [paciente, setPaciente] = useState({})
  const [selectedDate, setSelectedDate] = useState(null)

  // validaciones

  const [nomb, setNomb] = useState('')
  const [leyenNomb, setLeyenNomb] = useState('')
  const [errorNomb, setErrorNomb] = useState(false)

  const onSubmit = (data) => {
    console.log(data)
  }

  const tipoids = [{ value: 'C.C', label: 'C.C' }, { value: 'T.I', label: 'T.I' }]
  const ciudades = [{ value: 'Santiago de Cali', label: 'Santiago de Cali' }]

  return (
      <div>
        <AddReactionIcon sx = {{ mt: 10, display: 'block', marginLeft: 'auto', marginRight: 'auto', fontSize: 100 }}/>
        <Typography component="h1" variant="h5" sx={{ textAlign: 'center', pt: 2, fontSize: '3em', pb: 5 }}>
            Registrar Paciente
        </Typography>
        <Container maxWidth = 'lg' sx={{  width: '75%', display: 'flex', flexDirection: 'column' }} >
          <Paper elevation = {8} sx = {{  padding: 6 }} >
          <form onSubmit = {handleSubmit(onSubmit)} style ={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
          <div>
            <TextField
              select
              label = 'Identificacion'
              defaultValue = 'C.C'
              { ...register('tipo_id', { required: true } ) }
              sx = {{ mx: 1, my: 2, width: '15ch' }}
              >
                {tipoids.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>))}
              </TextField>
            <TextField
              label = "Numero"
              defaultValue = {paciente.id_paciente}
              { ...register('id_paciente', { required: true, maxLength: 25 })}
              sx = {{ mx: 1, my: 2, width: '20ch' }}
              />
              {errors.id_paciente?.type === 'required' && <p> El id es requerido </p>}
              <TextField
                onChange = {(e) => {
                  setNomb(e.target.value)
                  if (/^[A-Za-z\s]*$/.test(nomb)){
                    setErrorNomb(false)
                    setLeyenNomb('')
                    
                  } else { 
                    setErrorNomb(true)
                    setLeyenNomb('El nombre no es valido, use solo letras y espacios')
                    
                  }
                }}
                error = {errorNomb}
                id="outlined-error-helper-text"
                label="Nombre"
                helperText= {leyenNomb}
              />
              <TextField
                onChange = {(e) => {
                  setNomb(e.target.value)
                  if (/^[A-Za-z\s]*$/.test(nomb)){
                    setErrorNomb(false)
                    setLeyenNomb('')
                    
                  } else { 
                    setErrorNomb(true)
                    setLeyenNomb('El nombre no es valido, use solo letras y espacios')
                    
                  }
                }}
                error = {errorNomb}
                id="outlined-error-helper-text"
                label="Nombre"
                helperText= {leyenNomb}
                {...register('nombre', { required: true, minLength: 1, pattern: /^[A-Za-z\s]*$/i })}
              sx={{ mx: 1, my: 2, width: '20ch' }}
              />
            
            <TextField
              label="Apellido"
              defaultValue = ''
              {...register('apellido', { required: true })}
              sx={{ mx: 1, my: 2, width: '30ch' }}
            />
          </div>
          <div> 
            <TextField
              id = 'textfield-direccion'
              label = 'Direccion'
              defaultValue = ''
              {...register('direccion', {required: true})}
              sx = { { mx: 1, my: 2, width: '30ch' } }
            />
            <TextField
              select
              label='Ciudad'
              defaultValue = 'Santiago de Cali'
              {...register('ciudad', { required: true })}
              sx = {{ mx: 1, my: 2, width: '30ch' }}
            >
              {ciudades.map((option) => (
                <MenuItem key= {option.value} value = {option.value}>
                  {option.label}
                </MenuItem>
              ))}
              </TextField>
            <TextField
              label='Telefono'
              defaultValue=''
              {...register('telefono', { required: true, minLength: 6, pattern: /^\d+$/i})}
              sx = {{ mx: 1, my: 2, width: '20ch' }}/>
          </div>
          <div>
            <LocalizationProvider dateAdapter = {AdapterDateFns}>
              <DatePicker
                label = 'Ingrese fecha de nacimiento'
                disableFuture
                value = {selectedDate}
                {...register('fecha') }
                onChange = {(newDate) => {
                  setSelectedDate(newDate)
                }}
                renderInput= {(params => (
                  <TextField { ...params } helperText = {params?.inputProps?.placeholder} />
                ))}
                sx={{ mx: 1, my: 2, width: '20ch' }}
                />
            </LocalizationProvider>
            <TextField
              label = 'Edad'
              defaultValue = ''
              {...register('edad', {required: true })}
              sx = {{ mx: 1, my: 2, width: '20ch' }}
             />
             <TextField
              label = 'Correo electronico'
              defaultValue = ''
              {...register('correo', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i})}

              sx = {{ mx: 1, my: 2, width: '40ch' }}
             />
          </div>
          </form>
          </Paper>
          </Container>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <Button color="secondary">Limpiar</Button>
          <Button variant = 'contained' onClick={handleSubmit(onSubmit)} > Registrar </Button>
          </Box>
      </div>
  )
}
