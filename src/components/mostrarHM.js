import React, { useEffect, useState } from 'react'
import { Box, Container, Grid, Typography, Button, TextField, LinearProgress, Dialog, MenuItem } from '@mui/material'
import Editor from './EditorTexto2/EditorUse'
import { useForm } from 'react-hook-form'

export default function MostrarHM ({ aparezco, functionDescargar, historia, functionBuscar, functionDescargar2 }) {
  const [doctor, setDoctor] = useState([])
  const [paciente, setPaciente] = useState([])
  const [formula, setFormula] = useState([])
  const [loading, setLoading] = useState(false)
  const [fecha, setFecha] = useState('')
  const [descripcion, setDescripcion] = useState()
  const [descripcionForm, setDescripcionForm] = useState()
  const [dataCard, setDataCard] = useState(false)
  const { register, handleSubmit } = useForm()

  const tipoSangre = [{ value: 'A' }, { value: 'B' }, { value: 'O' }, { value: 'AB' }]
  const RHtipos = [{ value: '+' }, { value: '-' }]

  const handleOpenData = () => { setDataCard(true) }
  const handleCloseData = () => { setDataCard(false) }

  const onSubmit = (data) => {
    functionDescargar2([descripcion, descripcionForm, historia.fecha, historia.id_entrada, doctor.tipo_id, doctor.identificacion, doctor.nombre, doctor.apellido, doctor.correo, paciente.tipo_id, paciente.identificacion, paciente.nombre, paciente.apellido, paciente.edad, paciente.correo, paciente.direccion, paciente.telefono, historia.id_formula, data.peso, data.talla, data.tipoSangre, data.RH, data.frecuencia])
    handleCloseData()
  }

  useEffect(() => {
    functionBuscar(historia)
      .then(res => {
        setPaciente(res[0].paciente)
        setDoctor(res[0].trabajador)
        setFormula(res[0].formula)
        setFecha(res[0].fecha.slice(0, 10))
        setDescripcion(JSON.parse(res[0].descripcion))
        setDescripcionForm(JSON.parse(res[0].formula.prescripcion))
      })
  }, [])

  useEffect(() => {
    if (typeof paciente === 'undefined' || typeof doctor === 'undefined' || typeof formula === 'undefined' || typeof descripcion === 'undefined' || typeof descripcionForm === 'undefined') {
      setLoading(false)
    } else {
      setLoading(true)
    }
  }, [paciente, doctor, formula, descripcion, descripcionForm])

  if (loading) {
    return (
        <div>
          <Container maxWidth = 'lg' sx = {{ display: 'flex', flexDirection: 'column', mb: 2 }}>
            <Box sx = {{ maxWidth: 'false', pb: 'false' }}>
              <Grid container spacing = {3}><Grid item xs = {12}><Typography variant = 'h4' textAlign = 'center' sx = {{ fontWeight: 'bold', color: '#851fa2', fontSize: '10 rem', padding: '3px 10px', mt: '2rem' }}> Entrada No. {historia.id_entrada} </Typography></Grid></Grid>
            </Box>
            <Box sx = {{ maxWidth: 'false', pb: 'false', mt: '1rem', border: 1, borderRadius: 5, borderColor: '#bdbdbd' }}>
              <Grid container spacing = {3}>
                <Grid item xs = {8}><Typography variant = 'h5' sx = {{ padding: '3px 10px', mt: '1.5rem', mb: '1rem', fontWeight: 'bold' }}> Fecha: </Typography></Grid>
                <Grid item xs = {4}><TextField disabled value = {fecha} sx = {{ ml: '5rem', mt: '1rem', mb: '1rem', mr: '1rem' }}/></Grid>
               </Grid>
            </Box>
            <Box sx = {{ maxWidth: 'false', pb: 'false', mt: '1rem', border: 1, borderRadius: 5, borderColor: '#bdbdbd' }}>
              <Grid container spacing = {3}>
                <Grid item xs = {12}><Typography variant = 'h5' sx = {{ padding: '3px 10px', mt: '1rem', fontWeight: 'bold', borderBottom: 1, borderColor: '#bdbdbd' }}> Información del médico </Typography></Grid>
                <Grid item xs = {6}><Typography variant = 'h6' sx = {{ padding: '3px 10px', border: 1, borderRadius: 3, ml: '1rem', mr: '1rem', mb: '1rem', borderColor: '#bdbdbd' }}> Identificacion: {doctor.tipo_id} {doctor.identificacion}</Typography></Grid>
                <Grid item xs = {6}><Typography variant = 'h6' sx = {{ padding: '3px 10px', border: 1, borderRadius: 3, ml: '1rem', mr: '1rem', mb: '1rem', borderColor: '#bdbdbd' }}> Nombre: {doctor.nombre} {doctor.apellido} </Typography></Grid>
              </Grid>
            </Box>
            <Box sx = {{ maxWidth: 'false', pb: 'false', mt: '1rem', border: 1, borderRadius: 5, borderColor: '#bdbdbd' }}>
              <Grid container spacing = {3}>
                <Grid item xs = {12}><Typography variant = 'h5' sx = {{ padding: '3px 10px', mt: '1rem', fontWeight: 'bold', borderBottom: 1, borderColor: '#bdbdbd' }}> Información del paciente </Typography></Grid>
                <Grid item xs = {4}><Typography variant = 'h6' sx = {{ padding: '3px 10px', border: 1, borderRadius: 3, ml: '1rem', borderColor: '#bdbdbd' }}> Id: {paciente.tipo_id} {paciente.identificacion}</Typography></Grid>
                <Grid item xs = {5}><Typography variant = 'h6' sx = {{ padding: '3px 10px', border: 1, borderRadius: 3, borderColor: '#bdbdbd' }}> Nombre: {paciente.nombre} {paciente.apellido} </Typography></Grid>
                <Grid item xs = {3}><Typography variant = 'h6' sx = {{ padding: '3px 10px', border: 1, borderRadius: 3, ml: '1rem', mr: '1rem', borderColor: '#bdbdbd' }}> Edad: {paciente.edad} </Typography></Grid>
                <Grid item xs = {5}><Typography variant = 'h6' sx = {{ padding: '3px 10px', border: 1, borderRadius: 3, ml: '1rem', mb: '1rem', borderColor: '#bdbdbd' }}> {paciente.correo} </Typography></Grid>
                <Grid item xs = {4}><Typography variant = 'h6' sx = {{ padding: '3px 10px', border: 1, borderRadius: 3, mb: '1rem', borderColor: '#bdbdbd' }}> Dir: {paciente.direccion} </Typography></Grid>
                <Grid item xs = {3}><Typography variant = 'h6' sx = {{ padding: '3px 10px', border: 1, borderRadius: 3, mr: '1rem', mb: '1rem', borderColor: '#bdbdbd' }}> Tel: {paciente.telefono} </Typography></Grid>
              </Grid>
            </Box>
            <Box sx = {{ maxWidth: 'false', pb: 'false', mt: '1rem', border: 1, borderRadius: 5, borderColor: '#bdbdbd' }}>
              <Grid container spacing = {3}>
                <Grid item xs = {12}><Typography variant = 'h5' sx = {{ padding: '3px 10px', mt: '1rem', fontWeight: 'bold', borderBottom: 1, borderColor: '#bdbdbd' }}> Descripcion</Typography></Grid>
                <Grid item xs = {12}><Typography variant = 'h6' sx = {{ mr: '1rem', ml: '1rem' }}> Descripcion de la entrada medica registrada: </Typography></Grid>
                <Grid item xs = {12} sx = {{ mr: '1rem', ml: '1rem', mb: '1rem' }}><Editor titulo = 'Antecedentes' texto = { descripcion } setTexto = {setDescripcion}/></Grid>
              </Grid>
            </Box>
            <Box sx = {{ maxWidth: 'false', pb: 'false', mt: '1rem', border: 1, borderRadius: 5, borderColor: '#bdbdbd' }}>
              <Grid container spacing = {3}>
                <Grid item xs = {12}><Typography variant = 'h5' sx = {{ padding: '3px 10px', mt: '1rem', fontWeight: 'bold', borderBottom: 1, borderColor: '#bdbdbd' }}> Formula N. {historia.id_formula}</Typography></Grid>
                <Grid item xs = {12}><Typography variant = 'h6' sx = {{ mr: '1rem', ml: '1rem' }}> Descripcion de la formula medica registrada: </Typography></Grid>
                <Grid item xs = {12} sx = {{ mr: '1rem', ml: '1rem', mb: '1rem' }}><Editor titulo = 'Antecedentes' texto = { descripcionForm } setTexto = {setDescripcionForm}/></Grid>
              </Grid>
            </Box>
            <Box textAlign='center'>
              <Button variant = 'contained' onClick = {aparezco} sx = {{ mt: '2rem', mb: '1rem', mr: '1rem' }}> REGRESAR </Button>
              <Button variant = 'contained' onClick = {() => { functionDescargar([descripcion, descripcionForm, historia.fecha, historia.id_entrada, doctor.tipo_id, doctor.identificacion, doctor.nombre, doctor.apellido, doctor.correo, paciente.tipo_id, paciente.identificacion, paciente.nombre, paciente.apellido, paciente.edad, paciente.correo, paciente.direccion, paciente.telefono, historia.id_formula]) }} sx = {{ mt: '2rem', mb: '1rem', mr: '1rem' }}> DESCARGAR </Button>
              <Button variant = 'contained' onClick = {handleOpenData} sx = {{ mt: '2rem', mb: '1rem', mr: '1rem' }}> CERTIFICADO </Button>
            </Box>
            <Dialog open = {dataCard} PaperProps={{ sx: { minWidth: 600, maxWidth: 600, minHeight: 600, maxHeight: 600, top: 10, left: 10, m: 0 } }}>
              <div>
                <Container maxWidth = 'lg' sx = {{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx = {{ maxWidth: 'false', pb: 'false' }}>
                      <Grid container spacing = {3}><Grid item xs = {12}><Typography variant = 'h4' textAlign = 'center' sx = {{ fontWeight: 'bold', color: '#851fa2', fontSize: '10 rem', padding: '3px 10px', mt: '2rem' }}> Datos requeridos </Typography></Grid></Grid>
                    </Box>
                    <Box sx = {{ maxWidth: 'false', pb: 'false', mt: '1rem', border: 1, borderRadius: 5, borderColor: '#bdbdbd' }}>
                      <Grid container spacing = {3}>
                        <Grid item xs = {3}><Typography variant = 'h5' sx = {{ padding: '3px 10px', mt: '1.5rem', mb: '1rem', fontWeight: 'bold' }}> Peso(kg) </Typography></Grid>
                        <Grid item xs = {3}><TextField type = 'number' sx = {{ mt: '1rem', mb: '1rem' }} {...register('peso', { required: true, maxLength: 3, valueAsNumber: true })}/></Grid>
                        <Grid item xs = {3}><Typography variant = 'h5' sx = {{ padding: '3px 10px', mt: '1.5rem', mb: '1rem', fontWeight: 'bold' }}> Talla(cm) </Typography></Grid>
                        <Grid item xs = {3}><TextField type = 'number' sx = {{ mt: '1rem', mb: '1rem', mr: '1rem' }} {...register('talla', { required: true, maxLength: 3, valueAsNumber: true })}/></Grid>
                        <Grid item xs = {4}><Typography variant = 'h5' sx = {{ padding: '3px 10px', mt: '1.5rem', mb: '1rem', fontWeight: 'bold' }}> Grupo sanguineo: </Typography></Grid>
                        <Grid item xs = {3}>
                          <TextField select defaultValue = 'A' sx = {{ mt: '1rem', mb: '1rem', mr: '1rem' }} {...register('tipoSangre', { required: true })}>
                            {tipoSangre.map((option) => (
                              <MenuItem key = {option.value} value = {option.value}>
                                {option.value}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs = {3}><Typography variant = 'h5' sx = {{ padding: '3px 10px', mt: '1.5rem', mb: '1rem', fontWeight: 'bold' }}> RH </Typography></Grid>
                        <Grid item xs = {2}>
                          <TextField select defaultValue = '+' sx = {{ mt: '1rem', mb: '1rem', mr: '1rem' }} {...register('RH', { required: true })}>
                            {RHtipos.map((option) => (
                              <MenuItem key = {option.value} value = {option.value}>
                                {option.value}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid>
                        <Grid item xs = {6}><Typography variant = 'h5' sx = {{ padding: '3px 10px', mt: '1.5rem', mb: '1rem', fontWeight: 'bold' }}> Frecuencia cardiaca (BPM) </Typography></Grid>
                        <Grid item xs = {6}><TextField type = 'number' sx = {{ mt: '1rem', mb: '1rem' }} {...register('frecuencia', { required: true, maxLength: 3, valueAsNumber: true })}/></Grid>
                      </Grid>
                    </Box>
                    <Box textAlign='center'>
                      <Button variant = 'contained' onClick = {handleCloseData} sx = {{ mt: '2rem', mb: '1rem', mr: '1rem' }}> CANCELAR </Button>
                      <Button variant = 'contained' onClick = {handleSubmit(onSubmit)} sx = {{ mt: '2rem', mb: '1rem', mr: '1rem' }}> GENERAR CERTIFICADO </Button>
                    </Box>
                  </form>
                </Container>
              </div>
            </Dialog>
          </Container>
        </div>
    )
  } else {
    return (
      <div>
        <Container maxWidth='lg' sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
          <Box sx={{ maxWidth: 'false', pb: 'false' }}>
            <LinearProgress color="secondary" />
            <Grid container spacing={3}><Grid item xs={12}><Typography variant='h4' textAlign='center' sx={{ fontWeight: 'bold', color: '#851fa2', fontSize: '10 rem', padding: '3px 10px', mt: '2rem' }}> Cargando... </Typography></Grid></Grid>
          </Box>
        </Container>
      </div>
    )
  }
}
