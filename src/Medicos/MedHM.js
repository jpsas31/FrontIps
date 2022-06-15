import * as React from 'react'
import { Box, Grid, Typography, Container, Paper, Avatar, MenuItem, TextField, Button, Card, CardHeader, CardActionArea, CardMedia, Dialog } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useExternalApi } from '../hooks/InfoPacienteResponse'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'

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
      bgcolor: stringToColor(name),
      mt: '1rem',
      ml: '1rem',
      mr: '2rem'
    },
    children: name[0]
  }
}

export default function MedHM () {
  const { register, handleSubmit } = useForm()
  const tipoids = [{ value: 'C.C', label: 'C.C' }, { value: 'T.I', label: 'T.I' }]

  const {
    getPacienteInfo,
    getHM
  } = useExternalApi()

  const [paciente, setPaciente] = useState([])
  const [historias, setHistorias] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingHist, setLoadingHist] = useState(false)
  const [openDia, setOpenDia] = useState(false)

  const handleClick = () => { setLoading(false) }

  const handleOpen = () => {
    setOpenDia(true)
  }

  const onSubmit = (data) => {
    getPacienteInfo(data)
      .then(res => {
        console.log('hijueputa', res)
        setPaciente(res)
      })
  }

  useEffect(() => {
    if (paciente === undefined || paciente.length === 0) {
      setLoading(false)
    } else {
      setLoading(true)
      getHM(paciente[0])
        .then(res => {
          console.log('hijueputica', res)
          setHistorias(res)
        })
    }
  }, [paciente])

  useEffect(() => {
    if (historias === undefined || historias.length === 0) {
      setLoadingHist(false)
    } else {
      setLoadingHist(true)
    }
  })

  if (loading && loadingHist) {
    console.log('hola!!!', paciente)
    console.log('hijueputon', historias)
    return (
      <div>
        <Container maxWidth = 'lg' sx = {{ display: 'flex', flexDirection: 'column', mb: 2 }}>
          <Box sx = {{ maxWidth: 'false', pb: 'false' }}>
            <Grid container>
              <Grid item><Typography variant = 'h4' sx = {{ fontWeight: 'bold', color: '#851fa2', fontSize: '10 rem', padding: '3px 10px', mt: '2rem' }}> Gestion de pacientes </Typography></Grid>
            </Grid>
            <Grid component = {Paper} sx = {{ display: 'flex', maxWidth: 'lg', borderRadius: 7, mt: '1rem', bgcolor: '#1565c0' }}>
              <Grid item><Avatar {...stringAvatar(paciente[0].nombre)}/></Grid>
              <Grid item><Typography variant = 'h6' sx = {{ fontSize: '10 rem', fontWeight: 'bold', color: '#ffffff', mt: '1.2rem', mb: '1rem', ml: '2rem' }} > {paciente[0].nombre} {paciente[0].apellido} </Typography></Grid>
              <Grid item><Button variant="contained" color="error" sx = {{ ml: '36rem', mt: '1rem', mb: '1rem', mr: '1rem' }} onClick = {handleClick}>Cerrar Paciente</Button></Grid>
            </Grid>
          </Box>
          <Box sx = {{ maxWidth: 'false', pb: 'false' }}>
            <Paper elevation = {14} sx = {{ borderRadius: 7, maxWidth: 'lg', mt: '1rem' }}>
              <Box display = 'flex' justifyContent = 'center' sx = {{ mt: '3rem', ml: '2rem', mr: '2rem', mb: '2rem', borderBottom: 1, borderColor: '#851fa2' }}>
                <Grid container rowSpacing = {1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx = {{ mt: '2rem' }}>
                  <Grid item xs={6} align = 'center'>
                    <Typography variant = 'h4' sx = {{ fontSize: '10 rem', fontWeight: 'bold', color: '#851fa2', mt: '5rem', mb: '1rem' }} > Paciente, </Typography>
                  </Grid>
                  <Grid item xs={6}/>
                  <Grid item xs={6} align = 'center'>
                    <Typography variant = 'h3' sx = {{ fontSize: '10 rem', mt: '1rem', mb: '3rem', ml: '5rem' }} > {paciente[0].nombre} </Typography>
                  </Grid>
                  <Grid item xs = {6}/>
                </Grid>
                <Grid container spacing = {2}>
                  <Grid item xs = {2}><Typography variant = 'h5' sx = {{ mt: '5rem', ml: '5rem' }} > {paciente[0].tipo_id} </Typography></Grid>
                  <Grid item xs = {6}><Typography variant = 'h5' sx = {{ mt: '5rem', ml: '1rem' }} > {paciente[0].identificacion} </Typography></Grid>
                  <Grid item xs = {4}/>
                  <Grid item xs = {2}><Typography variant = 'h5' sx = {{ mt: '1rem', ml: '5rem', color: '#851fa2', mr: '1rem' }} > Edad: </Typography></Grid>
                  <Grid item xs = {2}><Typography variant = 'h5' sx = {{ mt: '1rem', ml: '1rem', mr: '2rem' }}> {paciente[0].edad} </Typography></Grid>
                  <Grid item xs = {2}><Typography variant = 'h5' sx = {{ mt: '1rem', ml: '5rem', mr: '2rem', color: '#851fa2' }} > Ciudad: </Typography></Grid>
                  <Grid item xs = {2}><Typography variant = 'h5' sx = {{ mt: '1rem', ml: '1rem', mr: '2rem' }}> {paciente[0].ciudad} </Typography></Grid>
                  <Grid item xs = {4}/>
                </Grid>
              </Box>
              <Box textAlign = 'center' sx = {{ maxWidth: 'lg' }}>
                <Typography variant = 'h4'> HISTORIA CLINICA </Typography>
              </Box>
              <Grid container spacing = {2} direction = 'row' justify = 'flex-start' alignItems= 'flex-start' sx = {{ mt: '1rem', ml: '2rem', mr: '2rem', mb: '2rem' }}>
                {historias.map(elem => (
                  <Grid item xs = {12} sm = {6} md = {3} key = {historias.indexOf(elem)}>
                    <Card elevation = {7} sx={{ maxWidth: 345, mb: '2rem' }} >
                      <CardActionArea>
                        <CardHeader avatar = {<Avatar {...stringAvatar(elem.trabajador.nombre)}/>} title = 'Entrada HM.' subheader = {elem.id_entrada}/>
                        <CardMedia component="img" height="130" image='https://i.imgur.com/dJsL7kH.jpg' alt="Historia clinica"/>
                      </CardActionArea>
                  </Card>
                  </Grid>
                ))}
              </Grid>
              <Box align = 'center' sx = {{ maxWidth: 'lg' }}>
                <Button variant= 'contained' onClick={handleOpen}>Agregar Historia</Button>
              </Box>
              <Dialog open = {openDia}>
                <div>
                  <Typography variant = 'h4'> HISTORIA CLINICA </Typography>
                </div>
              </Dialog>
            </Paper>
          </Box>
        </Container>
      </div>
    )
  } else {
    return (
    <div>
      <Container maxWidth = 'lg' sx = {{ display: 'flex', flexDirection: 'column', mb: 2 }}>
        <Box sx = {{ maxWidth: 'false', pb: 'false' }}>
          <Grid container>
            <Grid item><Typography variant = 'h4' sx = {{ fontWeight: 'bold', color: '#851fa2', fontSize: '10 rem', padding: '3px 10px', mt: '2rem' }}> Gestion de pacientes </Typography></Grid>
          </Grid>
          <form onSubmit = {handleSubmit(onSubmit)}>
          <Grid container space = {2} alignItems="flex-start" component = {Paper} sx = {{ display: 'flex', maxWidth: 'lg', borderRadius: 7, mt: '1rem' }}>
            <Grid item xs><Avatar sx = {{ bgcolor: 'black', padding: '3px 10px', mt: '1rem', mb: '2rem', ml: '1rem' }} /></Grid>
            <Grid item xs = {5} ><Typography variant = 'h6' sx = {{ fontSize: '10 rem', mt: '1.5rem', mb: '2rem', ml: '2 rem' }} > Ingrese el tipo y la identificacion del paciente </Typography></Grid>
            <Grid item xs>
              <TextField select defaultValue = 'C.C' sx = {{ mb: '1rem', mt: '0.5rem', ml: '1rem', borderRadius: 7 }} { ...register('tipo_id', { required: true })} >
                {tipoids.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                {option.label}
                </MenuItem>))}
              </TextField>
            </Grid>
            <Grid item xs = {4} >
              <TextField label = 'Numero' type = 'number' sx = {{ maxWidth: 'lg', mr: '1rem', mb: '1rem', mt: '0.5rem', ml: '1rem', borderRadius: 7 }} { ...register('identificacion', { required: true, maxLength: 25, valueAsNumber: true })} ></TextField>
            </Grid>
            <Grid item xs>
              <Button variant= 'contained' sx = {{ mr: '1rem', mb: '1rem', mt: '1rem', borderRadius: 12 }} endIcon={<SendIcon/>} onClick= {handleSubmit(onSubmit)} />
            </Grid>
          </Grid>
          </form>
        </Box>
      </Container>
    </div>
    )
  }
}
