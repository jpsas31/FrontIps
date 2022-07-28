import * as React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
// import { faker } from '@faker-js/faker'
import Container from '@mui/material/Container'
import { Grid, Typography, Box, Button } from '@mui/material'
import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import { LocalizationProvider } from '@mui/x-date-pickers-pro'
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker'
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns'
import SendIcon from '@mui/icons-material/Send'
import { useExternalApi } from '../../hooks/InfoAdminResponse'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Numero de citas por intervalo de tiempo'
    }
  }
}

export default function CitaIntervalo () {
  const [value, setValue] = useState([null, null])
  const [fechaInicial, setFechaInicial] = useState(null)
  const [fechaFinal, setFechaFinal] = useState(null)
  const [apiRes, setApiRes] = useState([])
  const [labels, setLabels] = useState([])
  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: 'Numero de citas agendadas',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
    ]
  })

  const {
    getCitasIntervalo,
    getTipoCita
  } = useExternalApi()

  const obtenerCitas = () => {
    if (!(fechaInicial === null && fechaFinal === null)) {
      getCitasIntervalo([fechaInicial, fechaFinal])
        .then(res => {
          setApiRes(res)
        })
    }
  }

  useEffect(() => {
    if (!(apiRes === undefined)) {
      getTipoCita()
        .then(res => {
          const auxLabels = []
          if (!(res.length === 0)) {
            for (let i = 0; i < res.length; i++) {
              auxLabels.push(res[i].tipo)
            }
            setLabels(auxLabels)
          }
        })
    }
  }, [apiRes])

  useEffect(() => {
    const aux = []
    for (let i = 0; i < labels.length; i++) {
      aux.push(0)
    }
    for (let i = 0; i < apiRes.length; i++) {
      aux[apiRes[i].id_tipocita - 1] = apiRes[i]._count.id_tipocita
    }

    setData({
      labels,
      datasets: [
        {
          label: 'Citas agendadas',
          data: aux,
          backgroundColor: 'rgba(255, 99, 132, 0.5)'
        }
      ]
    })
  }, [labels])

  return (
    <div>
      <Container maxWidth = 'lg' sx = {{ display: 'flex', flexDirection: 'column', mb: 2 }}>
        <Box sx = {{ pb: 'false', maxWidth: 'lg', borderRadius: 7, mt: '1rem' }}>
          <Grid container alignItems = 'center' sx = {{ mb: '1rem' }}>
            <Grid item> <Typography variant = 'h4' sx = {{ fontWeight: 'bold', color: '#851fa2', fontSize: '10 rem', padding: '3px 10px', mt: '2rem' }}> Citas registradas </Typography> </Grid>
            <Grid item> <Typography variant = 'h5' sx = {{ padding: '3px 10px' }}> Ingrese la fecha inicial y final para ver las citas registradas en un intervalo de tiempo </Typography></Grid>
          </Grid>
          <Grid container justifyContent='center'>
            <LocalizationProvider dateAdapter = {AdapterDateFns} localeText = {{ start: 'Fecha inicial', end: 'Fecha final' }}>
              <DateRangePicker value = {value}
              onChange = {(e) => { setValue(e) }}
              renderInput = {(startProps, endProps) => (
                <React.Fragment>
                  <TextField {...startProps} />
                  <Box sx = {{ mx: 2 }}> a </Box>
                  <TextField {...endProps} />
                  {setFechaInicial(startProps.inputProps.value)}
                  {setFechaFinal(endProps.inputProps.value)}
                </React.Fragment>
              )}
              />
            </LocalizationProvider>
            <Button variant="contained" sx = {{ ml: '2rem' }} onClick = {obtenerCitas} endIcon={<SendIcon />}> Buscar </Button>
          </Grid>
        </Box>
        <Bar options = {options} data = {data}/>
      </Container>
    </div>
  )
}
