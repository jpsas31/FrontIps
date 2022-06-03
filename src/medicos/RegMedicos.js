import React from 'react'
import { useForm } from 'react-hook-form'

// {useState, useEffect, useRef, useReducer, useMemo}
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { useExternalApi } from '../hooks/InfoMedicoResponse'
// import { width } from '@mui/system'

export default function RegMedicos () {
  const { handleSubmit, register } = useForm()

  const tipoids = [{ value: 'C.C', label: 'C.C' }, { value: 'T.I', label: 'T.I' }]
  const especialidades = [
    { value: '1', label: 'General' },
    { value: '2', label: 'Psicologia' },
    { value: '3', label: 'Pediatria' },
    { value: '4', label: 'Cardiologia' },
    { value: '5', label: 'Dermatologia' },
    { value: '6', label: 'Oftalmologia' }]

  const {
    createMedico
  } = useExternalApi()

  const onSubmit = data => {
    console.log(data)
    createMedico(data)
  }

  const { logout } = useAuth0()

  return (
  <div>
    <h1 align="center">Registro de medicos</h1>
    <div align = "center">
    <form onSubmit={handleSubmit(onSubmit)}>
    <Paper width = '50%' elevation = {8} sx = {{ padding: 4 }} >
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid item xs = {2}>
          <TextField
                select
                fullWidth
                label="Tipo"
                defaultValue = {'C.C'}
                {...register('tipo_id', { required: true })}
              >
                {tipoids.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>))}
          </TextField>
        </Grid>

        <Grid item xs = {8}>
          <TextField fullWidth id="id" label="Identificacion" name = "Identificacion" variant="outlined" type = "number"
          {...register('identificacion', { required: true })}/>
        </Grid>

        <Grid item xs = {5} >
          <TextField fullWidth id="nombre" label="Nombre" variant="outlined" type = "text"
          {...register('nombre', { required: true })}/>
        </Grid>

        <Grid item xs = {5} >
          <TextField fullWidth id="apellido" label="Apellido" variant="outlined" type = "text"
          {...register('apellido', { required: true })}/>
        </Grid>

        <Grid item xs = {5}>
        <TextField
                select
                fullWidth
                label="Especialidad"
                defaultValue = {1}
                {...register('id_especialidad', { required: true })}
              >
                {especialidades.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>))}
          </TextField>
        </Grid>

        <Grid item xs = {5}>
          <TextField fullWidth id="direccion" label="Direccion" variant="outlined"
          {...register('direccion', { required: true })}/>
        </Grid>

        <Grid item xs = {5}>
          <TextField fullWidth id="telefono" label="Telefono" variant="outlined" type = "number"
          {...register('telefono', { required: true, minLength: 10 })}/>
        </Grid>

        <Grid item xs = {5}>
            <TextField fullWidth id="correo" label="Correo" variant="outlined"
            {...register('correo', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i })}/>
        </Grid>

        <Grid item xs = {5}>
          <Button variant="outlined" component={Link} to={'/'} onClick={() => logout({
            returnTo: window.location.origin
          })
        }>
          Atras</Button>
        </Grid>

        <Grid item xs = {5}>
          <Button variant="contained" type = "submit" onClick={handleSubmit(onSubmit)}>Enviar</Button>
        </Grid>

      </Grid></Paper>
    </form>

    </div>

  </div>
  )
}
