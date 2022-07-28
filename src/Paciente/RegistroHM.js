import * as React from 'react'
import { Box, Grid, Typography, Container, Paper, Avatar, Card, CardHeader, CardActionArea, CardMedia, Dialog } from '@mui/material'
import { useAuth0 } from '@auth0/auth0-react'
import { useState, useEffect } from 'react'
import { useExternalApi } from '../hooks/InfoPacienteResponse'
import { useExternalApi as ApiHTML } from '../hooks/InfoEntradasResponse'
import MostrarHMPaciente from '../components/mostrarHMPaciente'

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

export default function RegistroHM () {
  const { user } = useAuth0()
  const [paciente, setPaciente] = useState([])
  const [loading, setLoading] = useState(false)
  const [historias, setHistorias] = useState([])
  const [loadingHist, setLoadingHist] = useState(false)
  const [cardOpen, setCardOpen] = useState(false)
  const [cardSelected, setCardSelected] = useState('')

  const handleCloseCard = () => { setCardOpen(false) }

  const {
    getPacienteAUTH,
    getHM,
    getInfoHM
  } = useExternalApi()

  const {
    getDeltaToHTML
  } = ApiHTML()

  useEffect(() => {
    getPacienteAUTH(user.sub)
      .then(res => {
        setPaciente(res)
      })
  }, [])

  useEffect(() => {
    if (paciente.length === 0) {
      setLoading(false)
    } else {
      setLoading(true)
      actualizar()
    }
  }, [paciente])

  const actualizar = () => {
    getHM(paciente)
      .then(res => {
        setHistorias(res)
      })
  }

  const viewCard = (elem) => {
    setCardSelected(elem)
    setCardOpen(true)
  }

  useEffect(() => {
    if (historias === undefined) {
      setLoadingHist(false)
    } else {
      setLoadingHist(true)
    }
  }, [historias])

  if (loading && loadingHist) {
    return (
      <div>
        <Container maxWidth='lg' sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
          <Box sx={{ maxWidth: 'false', pb: 'false' }}>
            <Grid container>
              <Grid item><Typography variant='h4' sx={{ fontWeight: 'bold', color: '#851fa2', fontSize: '10 rem', padding: '3px 10px', mt: '2rem' }}> Gestion de pacientes </Typography></Grid>
            </Grid>
            <Grid component={Paper} sx={{ display: 'flex', maxWidth: 'lg', borderRadius: 7, mt: '1rem', bgcolor: '#1565c0' }}>
              <Grid item xs={2}><Avatar {...stringAvatar(paciente.nombre)} /></Grid>
              <Grid item xs={6}><Typography variant='h6' sx={{ fontSize: '10 rem', fontWeight: 'bold', color: '#ffffff', mt: '1.2rem', mb: '1rem', ml: '2rem' }} > {paciente.nombre} {paciente.apellido} </Typography></Grid>
              <Grid item xs={4} />
            </Grid>
          </Box>
          <Box sx={{ maxWidth: 'false', pb: 'false' }}>
            <Paper elevation={14} sx={{ borderRadius: 7, maxWidth: 'lg', mt: '1rem' }}>
              <Box display='flex' justifyContent='center' sx={{ mt: '3rem', ml: '2rem', mr: '2rem', mb: '2rem', borderBottom: 2, borderColor: '#851fa2' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ mt: '2rem' }}>
                  <Grid item xs={6} align='center'>
                    <Typography variant='h4' sx={{ fontSize: '10 rem', fontWeight: 'bold', color: '#851fa2', mt: '5rem', mb: '1rem' }} > Paciente: </Typography>
                  </Grid>
                  <Grid item xs={6} />
                  <Grid item xs={6} align='center'>
                    <Typography variant='h3' sx={{ fontSize: '10 rem', mt: '1rem', mb: '3rem', ml: '5rem' }} > {paciente.nombre} </Typography>
                  </Grid>
                  <Grid item xs={6} />
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6}><Typography variant='h6' sx={{ mt: '5rem', color: '#851fa2', ml: '5rem', fontWeight: 'bold' }} > Identificacion: </Typography></Grid>
                  <Grid item xs={6}><Typography variant='h6' sx={{ mt: '5rem' }} > {paciente.tipo_id} {paciente.identificacion} </Typography></Grid>
                  <Grid item xs={2}><Typography variant='h6' sx={{ ml: '5rem', color: '#851fa2', mr: '1rem', fontWeight: 'bold' }} > Edad: </Typography></Grid>
                  <Grid item xs={2}><Typography variant='h6' sx={{ ml: '4rem', mr: '2rem' }}> {paciente.edad} </Typography></Grid>
                  <Grid item xs={4}><Typography variant='h6' sx={{ ml: '5rem', color: '#851fa2', mr: '1rem', fontWeight: 'bold' }} > Ciudad: </Typography></Grid>
                  <Grid item xs={4}><Typography variant='h6' sx={{ ml: '1rem', mr: '2rem' }}> {paciente.ciudad} </Typography></Grid>
                  <Grid item xs={4}><Typography variant='h6' sx={{ ml: '5rem', color: '#851fa2', fontWeight: 'bold' }}> Correo: </Typography></Grid>
                  <Grid item xs={8}><Typography variant='h6' sx={{ ml: '1rem' }} > {paciente.correo} </Typography></Grid>
                  <Grid item xs={4}><Typography variant='h6' sx={{ ml: '5rem', color: '#851fa2', mb: '1rem', fontWeight: 'bold' }}> Telefono: </Typography></Grid>
                  <Grid item xs={8}><Typography variant='h6' sx={{ ml: '1rem', mb: '1rem' }} > {paciente.telefono} </Typography></Grid>
                </Grid>
              </Box>
              <Box textAlign='center' sx={{ maxWidth: 'lg' }}>
                <Typography variant='h4'> HISTORIA CLINICA </Typography>
              </Box>
              <Box sx={{ maxWidth: 'false', pb: 'false', mr: '1rem', ml: '1rem', mt: '1rem', border: 1, borderRadius: 5, borderColor: '#bdbdbd' }}>
                <Grid container spacing={2} direction='row' justify='flex-start' alignItems='flex-start' sx={{ mt: '1rem', ml: '2rem', mr: '2rem', mb: '2rem', pr: '2rem', maxHeight: 600, overflow: 'auto' }}>
                  {historias.map(elem => (
                    <Grid item xs={4} key={historias.indexOf(elem)}>
                      <Card elevation={7} sx={{ maxWidth: 300, mb: '1rem' }} >
                        <CardActionArea onClick={() => { viewCard(elem) }}>
                          <CardHeader avatar={<Avatar {...stringAvatar(elem.trabajador.nombre)} />} title='Entrada HM.' subheader={elem.id_entrada} />
                          <CardMedia component="img" height="130" image='https://i.imgur.com/dJsL7kH.jpg' alt="Historia clinica" />
                        </CardActionArea>
                      </Card>
                      <Dialog open={cardOpen} PaperProps={{ sx: { minWidth: 900, maxWidth: 900, minHeight: 700, maxHeight: 700, top: 10, left: 10, m: 0 } }}>
                        <div>
                          <MostrarHMPaciente aparezco={handleCloseCard} functionDescargar={getDeltaToHTML} historia={cardSelected} functionBuscar={getInfoHM} />
                        </div>
                      </Dialog>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Paper>
          </Box>
        </Container>
      </div>
    )
  }
}
